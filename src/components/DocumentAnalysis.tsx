import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Download, Loader, Eye, Trash2, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { localDB } from '../lib/auth';
import { LegalDocumentAnalyzer } from '../lib/legalAnalysis';
import jsPDF from 'jspdf';

interface AnalysisResult {
  id: string;
  fileName: string;
  summary: string;
  keyPoints: string[];
  risks: string[];
  recommendations: string[];
  confidenceScore: number;
  metadata: any;
  createdAt: string;
}

export const DocumentAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      loadSavedAnalyses();
    }
  }, [user]);

  const loadSavedAnalyses = async () => {
    if (!user) return;
    
    const { data, error } = await localDB.getDocumentAnalyses(user.id);
    if (error) {
      console.error('Error loading analyses:', error);
    } else {
      setSavedAnalyses(data || []);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.txt')) {
      setError('Please upload a text file (.txt), PDF, or Word document');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
    setAnalysisResult(null);
  };

  const analyzeDocument = async () => {
    if (!file || !user) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const content = await readFileContent(file);
      const analyzer = new LegalDocumentAnalyzer(content);

      const result: AnalysisResult = {
        id: Date.now().toString(),
        fileName: file.name,
        summary: analyzer.generateEnhancedSummary('detailed'),
        keyPoints: analyzer.extractEnhancedKeyPoints(),
        risks: analyzer.identifyEnhancedRisks(),
        recommendations: analyzer.generateEnhancedRecommendations(),
        confidenceScore: analyzer.getEnhancedConfidenceScore(),
        metadata: analyzer.getEnhancedAnalysisMetadata(),
        createdAt: new Date().toISOString()
      };

      setAnalysisResult(result);

      // Save to database
      const { error: saveError } = await localDB.saveDocumentAnalysis(
        user.id,
        file.name,
        result
      );

      if (saveError) {
        console.error('Error saving analysis:', saveError);
      } else {
        loadSavedAnalyses(); // Refresh the list
      }
    } catch (err) {
      setError('Failed to analyze document. Please ensure it contains readable text.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content && content.length > 50) {
          resolve(content);
        } else {
          reject(new Error('File appears to be empty or unreadable'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const downloadReport = () => {
    if (!analysisResult) return;

    const textReport = `LEGAL DOCUMENT ANALYSIS REPORT
Generated on: ${new Date().toLocaleString()}
Document: ${analysisResult.fileName}
Confidence Score: ${analysisResult.confidenceScore}%

SUMMARY
${analysisResult.summary}

KEY POINTS
${analysisResult.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

IDENTIFIED RISKS
${analysisResult.risks.map((risk, i) => `${i + 1}. ${risk}`).join('\n')}

RECOMMENDATIONS
${analysisResult.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

DOCUMENT METADATA
- Document Type: ${analysisResult.metadata.documentType}
- Word Count: ${analysisResult.metadata.wordCount}
- Legal Terms Found: ${analysisResult.metadata.legalTermsFound}
- Document Complexity: ${analysisResult.metadata.documentComplexity}
- Compliance Score: ${analysisResult.metadata.complianceScore}%

This analysis was generated by Lexify AI Legal Assistant.
Please consult with qualified legal counsel before making any legal decisions.`;

    const blob = new Blob([textReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-analysis-${analysisResult.fileName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDFReport = () => {
    if (!analysisResult) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 30;

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) {
        pdf.setFont(undefined, 'bold');
      } else {
        pdf.setFont(undefined, 'normal');
      }
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      // Check if we need a new page
      if (yPosition + (lines.length * fontSize * 0.5) > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * fontSize * 0.5 + 5;
    };

    // Header
    pdf.setFillColor(14, 123, 127);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('LEGAL DOCUMENT ANALYSIS REPORT', margin, 18);
    
    pdf.setTextColor(0, 0, 0);
    yPosition = 40;

    // Document Info
    addText(`Document: ${analysisResult.fileName}`, 14, true);
    addText(`Generated on: ${new Date().toLocaleString('en-IN')}`, 10);
    addText(`Confidence Score: ${analysisResult.confidenceScore}%`, 12, true);
    yPosition += 10;

    // Summary
    addText('EXECUTIVE SUMMARY', 14, true);
    addText(analysisResult.summary, 11);
    yPosition += 10;

    // Key Points
    addText('KEY POINTS IDENTIFIED', 14, true);
    analysisResult.keyPoints.forEach((point, index) => {
      addText(`${index + 1}. ${point}`, 10);
    });
    yPosition += 10;

    // Risks
    addText('RISK ASSESSMENT', 14, true);
    analysisResult.risks.forEach((risk, index) => {
      const riskLevel = risk.includes('CRITICAL') ? 'CRITICAL' : 
                       risk.includes('HIGH') ? 'HIGH' : 
                       risk.includes('MEDIUM') ? 'MEDIUM' : 'LOW';
      addText(`${index + 1}. [${riskLevel}] ${risk}`, 10);
    });
    yPosition += 10;

    // Recommendations
    addText('RECOMMENDATIONS', 14, true);
    analysisResult.recommendations.forEach((rec, index) => {
      addText(`${index + 1}. ${rec}`, 10);
    });
    yPosition += 10;

    // Metadata
    addText('DOCUMENT METADATA', 14, true);
    addText(`Document Type: ${analysisResult.metadata.documentType.replace('_', ' ').toUpperCase()}`, 10);
    addText(`Word Count: ${analysisResult.metadata.wordCount.toLocaleString()}`, 10);
    addText(`Legal Terms Found: ${analysisResult.metadata.legalTermsFound}`, 10);
    addText(`Document Complexity: ${analysisResult.metadata.documentComplexity}`, 10);
    addText(`Indian Legal Compliance: ${analysisResult.metadata.indianComplianceScore}%`, 10);

    // Footer
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Generated by Lexify AI Legal Assistant - Page ${i} of ${pageCount}`, margin, pdf.internal.pageSize.getHeight() - 10);
      pdf.text('This analysis is for informational purposes only. Consult qualified legal counsel.', margin, pdf.internal.pageSize.getHeight() - 5);
    }

    // Save the PDF
    pdf.save(`legal-analysis-${analysisResult.fileName}-${new Date().toISOString().split('T')[0]}.pdf`);
  };
  const getRiskLevelColor = (risk: string) => {
    if (risk.includes('CRITICAL RISK') || risk.includes('HIGH RISK')) {
      return 'text-red-600 bg-red-50 border-red-200';
    } else if (risk.includes('MEDIUM RISK')) {
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Legal Document Analysis</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-[#0e7b7f] bg-[#0e7b7f] bg-opacity-5'
                : 'border-gray-300 hover:border-[#0e7b7f]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Upload Legal Document for Analysis
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Supports: PDF, Word documents, and text files (max 10MB)
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0e7b7f] text-white px-6 py-2 rounded-md hover:bg-[#0a6266] transition-colors"
            >
              Choose File
            </button>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={analyzeDocument}
                  disabled={isAnalyzing}
                  className="bg-[#0e7b7f] text-white px-4 py-2 rounded-md hover:bg-[#0a6266] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Analyze Document
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Confidence Score:</span>
                  <span className={`text-lg font-bold ${getConfidenceColor(analysisResult.confidenceScore)}`}>
                    {analysisResult.confidenceScore}%
                  </span>
                </div>
                <button
                  onClick={downloadReport}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download TXT
                </button>
                <button
                  onClick={downloadPDFReport}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#0e7b7f]" />
                  Document Summary
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{analysisResult.summary}</p>
              </div>

              {/* Metadata */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Document Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium capitalize">
                      {analysisResult.metadata.documentType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Word Count:</span>
                    <span className="font-medium">{analysisResult.metadata.wordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Legal Terms:</span>
                    <span className="font-medium">{analysisResult.metadata.legalTermsFound}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Complexity:</span>
                    <span className="font-medium">{analysisResult.metadata.documentComplexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Compliance Score:</span>
                    <span className="font-medium">{analysisResult.metadata.complianceScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                Key Points Identified
              </h4>
              <ul className="space-y-2">
                {analysisResult.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="bg-red-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Risk Assessment
              </h4>
              <div className="space-y-3">
                {analysisResult.risks.map((risk, index) => (
                  <div key={index} className={`p-3 rounded-md border ${getRiskLevelColor(risk)}`}>
                    <p className="text-sm font-medium">{risk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and does not constitute legal advice. 
                Please consult with qualified legal counsel for professional legal guidance.
              </p>
            </div>
          </div>
        )}

        {/* Saved Analyses */}
        {savedAnalyses.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analyses</h3>
            <div className="space-y-3">
              {savedAnalyses.slice(0, 5).map((analysis) => (
                <div key={analysis.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{analysis.file_name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(analysis.created_at).toLocaleDateString()} - 
                        Confidence: {analysis.analysis_data.confidenceScore}%
                      </p>
                    </div>
                    <button
                      onClick={() => setAnalysisResult(analysis.analysis_data)}
                      className="text-[#0e7b7f] hover:text-[#0a6266] text-sm font-medium"
                    >
                      View Analysis
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};