// Document-Specific Analysis Engine
// Provides specialized analysis based on document type

interface DocumentSpecificAnalyzer {
  analyzeContent(content: string): DocumentAnalysisResult;
}

interface DocumentAnalysisResult {
  specificRisks: Risk[];
  specificRecommendations: string[];
  complianceChecks: ComplianceCheck[];
  missingClauses: string[];
  criticalElements: CriticalElement[];
}

interface Risk {
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  category: string;
  remedy: string;
  section?: string;
}

interface ComplianceCheck {
  requirement: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL';
  details: string;
  action: string;
}

interface CriticalElement {
  element: string;
  found: boolean;
  importance: 'MANDATORY' | 'RECOMMENDED' | 'OPTIONAL';
  description: string;
}

// Service Agreement Analyzer
export class ServiceAgreementAnalyzer implements DocumentSpecificAnalyzer {
  analyzeContent(content: string): DocumentAnalysisResult {
    const lowerContent = content.toLowerCase();
    
    return {
      specificRisks: this.identifyServiceAgreementRisks(lowerContent),
      specificRecommendations: this.getServiceAgreementRecommendations(lowerContent),
      complianceChecks: this.checkServiceAgreementCompliance(lowerContent),
      missingClauses: this.findMissingServiceClauses(lowerContent),
      criticalElements: this.checkCriticalServiceElements(lowerContent)
    };
  }

  private identifyServiceAgreementRisks(content: string): Risk[] {
    const risks: Risk[] = [];

    // IP ownership risk
    if (!content.includes('intellectual property') && !content.includes('copyright')) {
      risks.push({
        level: 'HIGH',
        description: 'Intellectual property ownership not clearly defined',
        category: 'IP_RISK',
        remedy: 'Add clear IP ownership and licensing clauses as per Copyright Act 1957',
        section: 'Copyright Act 1957'
      });
    }

    // GST compliance risk
    if (!content.includes('gst') && !content.includes('goods and services tax')) {
      risks.push({
        level: 'CRITICAL',
        description: 'GST compliance not addressed - potential tax liability',
        category: 'TAX_RISK',
        remedy: 'Include GST registration numbers and tax calculation as per GST Act 2017',
        section: 'GST Act 2017, Section 9'
      });
    }

    // Scope creep risk
    if (!content.includes('scope of work') && !content.includes('deliverables')) {
      risks.push({
        level: 'HIGH',
        description: 'Scope of work not clearly defined - risk of scope creep',
        category: 'CONTRACTUAL_RISK',
        remedy: 'Define detailed scope of work and deliverables',
        section: 'Indian Contract Act 1872, Section 10'
      });
    }

    // Payment terms risk
    if (!content.includes('payment terms') && !content.includes('milestone')) {
      risks.push({
        level: 'MEDIUM',
        description: 'Payment schedule not clearly defined',
        category: 'FINANCIAL_RISK',
        remedy: 'Include detailed payment schedule with milestones'
      });
    }

    // Confidentiality risk
    if (!content.includes('confidential') && !content.includes('non-disclosure')) {
      risks.push({
        level: 'MEDIUM',
        description: 'Confidentiality obligations not specified',
        category: 'DATA_RISK',
        remedy: 'Add confidentiality and non-disclosure clauses'
      });
    }

    return risks;
  }

  private getServiceAgreementRecommendations(content: string): string[] {
    const recommendations: string[] = [];

    recommendations.push('Include detailed scope of work with specific deliverables');
    recommendations.push('Add milestone-based payment schedule');
    recommendations.push('Specify GST registration numbers and place of supply');
    recommendations.push('Include IP ownership transfer clause');
    recommendations.push('Add confidentiality and non-disclosure provisions');
    recommendations.push('Include termination clause with notice period');
    recommendations.push('Add dispute resolution through arbitration');
    recommendations.push('Specify governing law as Indian Contract Act 1872');

    if (!content.includes('force majeure')) {
      recommendations.push('Add force majeure clause for unforeseeable circumstances');
    }

    if (!content.includes('indemnity')) {
      recommendations.push('Include mutual indemnification clauses');
    }

    return recommendations;
  }

  private checkServiceAgreementCompliance(content: string): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // GST compliance
    checks.push({
      requirement: 'GST Registration and Tax Compliance',
      status: content.includes('gst') ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: content.includes('gst') ? 'GST provisions found' : 'GST compliance not addressed',
      action: 'Include GST registration numbers and applicable tax rates'
    });

    // TDS compliance
    checks.push({
      requirement: 'TDS Deduction Provisions',
      status: content.includes('tds') || content.includes('tax deducted') ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: content.includes('tds') ? 'TDS provisions found' : 'TDS deduction not mentioned',
      action: 'Include TDS deduction clause as per Income Tax Act 1961'
    });

    // Contract Act compliance
    checks.push({
      requirement: 'Indian Contract Act Compliance',
      status: content.includes('indian contract act') ? 'COMPLIANT' : 'PARTIAL',
      details: 'Basic contract elements present but specific act reference needed',
      action: 'Reference Indian Contract Act 1872 for legal validity'
    });

    return checks;
  }

  private findMissingServiceClauses(content: string): string[] {
    const requiredClauses = [
      'Scope of Work',
      'Payment Terms',
      'Intellectual Property Rights',
      'Confidentiality',
      'Termination',
      'Dispute Resolution',
      'Force Majeure',
      'Governing Law',
      'GST Compliance',
      'Indemnification'
    ];

    const missingClauses: string[] = [];
    const lowerContent = content.toLowerCase();

    if (!lowerContent.includes('scope') && !lowerContent.includes('deliverable')) {
      missingClauses.push('Scope of Work');
    }
    if (!lowerContent.includes('payment')) {
      missingClauses.push('Payment Terms');
    }
    if (!lowerContent.includes('intellectual property') && !lowerContent.includes('copyright')) {
      missingClauses.push('Intellectual Property Rights');
    }
    if (!lowerContent.includes('confidential')) {
      missingClauses.push('Confidentiality');
    }
    if (!lowerContent.includes('termination')) {
      missingClauses.push('Termination');
    }
    if (!lowerContent.includes('dispute') && !lowerContent.includes('arbitration')) {
      missingClauses.push('Dispute Resolution');
    }
    if (!lowerContent.includes('force majeure')) {
      missingClauses.push('Force Majeure');
    }
    if (!lowerContent.includes('governing law')) {
      missingClauses.push('Governing Law');
    }
    if (!lowerContent.includes('gst')) {
      missingClauses.push('GST Compliance');
    }
    if (!lowerContent.includes('indemnity')) {
      missingClauses.push('Indemnification');
    }

    return missingClauses;
  }

  private checkCriticalServiceElements(content: string): CriticalElement[] {
    const elements: CriticalElement[] = [
      {
        element: 'Service Provider Details',
        found: content.includes('service provider') || content.includes('contractor'),
        importance: 'MANDATORY',
        description: 'Complete details of service provider including registration'
      },
      {
        element: 'Client Details',
        found: content.includes('client') || content.includes('customer'),
        importance: 'MANDATORY',
        description: 'Complete details of client including business registration'
      },
      {
        element: 'Service Description',
        found: content.includes('services') || content.includes('scope'),
        importance: 'MANDATORY',
        description: 'Detailed description of services to be provided'
      },
      {
        element: 'Payment Amount',
        found: content.includes('₹') || content.includes('rupees') || content.includes('amount'),
        importance: 'MANDATORY',
        description: 'Total contract value and payment schedule'
      },
      {
        element: 'Timeline',
        found: content.includes('timeline') || content.includes('duration') || content.includes('months'),
        importance: 'MANDATORY',
        description: 'Project timeline and delivery schedule'
      },
      {
        element: 'GST Registration Numbers',
        found: content.includes('gstin') || content.includes('gst registration'),
        importance: 'MANDATORY',
        description: 'GST registration numbers of both parties'
      }
    ];

    return elements;
  }
}

// Employment Contract Analyzer
export class EmploymentContractAnalyzer implements DocumentSpecificAnalyzer {
  analyzeContent(content: string): DocumentAnalysisResult {
    const lowerContent = content.toLowerCase();
    
    return {
      specificRisks: this.identifyEmploymentRisks(lowerContent),
      specificRecommendations: this.getEmploymentRecommendations(lowerContent),
      complianceChecks: this.checkEmploymentCompliance(lowerContent),
      missingClauses: this.findMissingEmploymentClauses(lowerContent),
      criticalElements: this.checkCriticalEmploymentElements(lowerContent)
    };
  }

  private identifyEmploymentRisks(content: string): Risk[] {
    const risks: Risk[] = [];

    // PF compliance risk
    if (!content.includes('provident fund') && !content.includes('pf')) {
      risks.push({
        level: 'CRITICAL',
        description: 'PF compliance missing - violation of EPF Act 1952',
        category: 'STATUTORY_COMPLIANCE',
        remedy: 'Include PF registration and contribution details',
        section: 'EPF Act 1952, Section 6'
      });
    }

    // Gratuity risk
    if (!content.includes('gratuity')) {
      risks.push({
        level: 'HIGH',
        description: 'Gratuity provisions missing',
        category: 'STATUTORY_COMPLIANCE',
        remedy: 'Include gratuity calculation as per Payment of Gratuity Act 1972',
        section: 'Payment of Gratuity Act 1972, Section 4'
      });
    }

    // Notice period risk
    if (!content.includes('notice period')) {
      risks.push({
        level: 'MEDIUM',
        description: 'Notice period not specified',
        category: 'TERMINATION_RISK',
        remedy: 'Specify notice period as per Industrial Disputes Act 1947'
      });
    }

    // Working hours risk
    if (!content.includes('working hours') && !content.includes('work time')) {
      risks.push({
        level: 'MEDIUM',
        description: 'Working hours not defined',
        category: 'LABOR_LAW_RISK',
        remedy: 'Define working hours as per Factories Act 1948'
      });
    }

    return risks;
  }

  private getEmploymentRecommendations(content: string): string[] {
    const recommendations: string[] = [
      'Include PF registration number and contribution details',
      'Add gratuity calculation formula',
      'Specify notice period for termination',
      'Define working hours and overtime policy',
      'Include ESI registration if applicable',
      'Add professional tax deduction clause',
      'Include confidentiality and non-compete clauses',
      'Specify probation period terms',
      'Add performance evaluation criteria',
      'Include leave policy details'
    ];

    return recommendations;
  }

  private checkEmploymentCompliance(content: string): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // PF compliance
    checks.push({
      requirement: 'Provident Fund Compliance',
      status: content.includes('provident fund') || content.includes('pf') ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: content.includes('pf') ? 'PF provisions found' : 'PF compliance missing',
      action: 'Include PF registration and contribution as per EPF Act 1952'
    });

    // ESI compliance
    checks.push({
      requirement: 'Employee State Insurance',
      status: content.includes('esi') || content.includes('employee state insurance') ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: content.includes('esi') ? 'ESI provisions found' : 'ESI compliance missing',
      action: 'Include ESI registration and contribution if applicable'
    });

    // Minimum wages
    checks.push({
      requirement: 'Minimum Wages Compliance',
      status: content.includes('minimum wage') ? 'COMPLIANT' : 'PARTIAL',
      details: 'Salary mentioned but minimum wage compliance unclear',
      action: 'Ensure salary meets minimum wage requirements'
    });

    return checks;
  }

  private findMissingEmploymentClauses(content: string): string[] {
    const missingClauses: string[] = [];

    if (!content.includes('provident fund') && !content.includes('pf')) {
      missingClauses.push('Provident Fund Provisions');
    }
    if (!content.includes('gratuity')) {
      missingClauses.push('Gratuity Calculation');
    }
    if (!content.includes('notice period')) {
      missingClauses.push('Notice Period');
    }
    if (!content.includes('working hours')) {
      missingClauses.push('Working Hours');
    }
    if (!content.includes('leave')) {
      missingClauses.push('Leave Policy');
    }
    if (!content.includes('confidential')) {
      missingClauses.push('Confidentiality Agreement');
    }

    return missingClauses;
  }

  private checkCriticalEmploymentElements(content: string): CriticalElement[] {
    return [
      {
        element: 'Employee Details',
        found: content.includes('employee') || content.includes('name'),
        importance: 'MANDATORY',
        description: 'Complete employee personal and contact details'
      },
      {
        element: 'Designation',
        found: content.includes('designation') || content.includes('position'),
        importance: 'MANDATORY',
        description: 'Job title and role description'
      },
      {
        element: 'Salary Structure',
        found: content.includes('salary') || content.includes('₹'),
        importance: 'MANDATORY',
        description: 'Detailed salary breakdown including allowances'
      },
      {
        element: 'PF Registration',
        found: content.includes('pf') || content.includes('provident fund'),
        importance: 'MANDATORY',
        description: 'PF registration number and contribution details'
      },
      {
        element: 'Reporting Structure',
        found: content.includes('report') || content.includes('manager'),
        importance: 'RECOMMENDED',
        description: 'Clear reporting hierarchy and responsibilities'
      }
    ];
  }
}

// Lease Agreement Analyzer
export class LeaseAgreementAnalyzer implements DocumentSpecificAnalyzer {
  analyzeContent(content: string): DocumentAnalysisResult {
    const lowerContent = content.toLowerCase();
    
    return {
      specificRisks: this.identifyLeaseRisks(lowerContent),
      specificRecommendations: this.getLeaseRecommendations(lowerContent),
      complianceChecks: this.checkLeaseCompliance(lowerContent),
      missingClauses: this.findMissingLeaseClauses(lowerContent),
      criticalElements: this.checkCriticalLeaseElements(lowerContent)
    };
  }

  private identifyLeaseRisks(content: string): Risk[] {
    const risks: Risk[] = [];

    // Stamp duty risk
    if (!content.includes('stamp duty') && !content.includes('stamp')) {
      risks.push({
        level: 'CRITICAL',
        description: 'Stamp duty requirements not addressed - document may be inadmissible',
        category: 'LEGAL_VALIDITY',
        remedy: 'Pay stamp duty as per Indian Stamp Act 1899',
        section: 'Indian Stamp Act 1899, Section 3'
      });
    }

    // Registration risk
    if (!content.includes('registration') && !content.includes('register')) {
      risks.push({
        level: 'HIGH',
        description: 'Registration requirements not mentioned',
        category: 'LEGAL_VALIDITY',
        remedy: 'Register document if lease value exceeds state limits',
        section: 'Registration Act 1908, Section 17'
      });
    }

    // Security deposit risk
    if (!content.includes('security deposit') && !content.includes('advance')) {
      risks.push({
        level: 'MEDIUM',
        description: 'Security deposit terms not clearly defined',
        category: 'FINANCIAL_RISK',
        remedy: 'Specify security deposit amount and refund conditions'
      });
    }

    return risks;
  }

  private getLeaseRecommendations(content: string): string[] {
    return [
      'Pay stamp duty as per state stamp act',
      'Register document if required by law',
      'Include detailed property description',
      'Specify maintenance responsibilities',
      'Add rent escalation clause',
      'Include termination conditions',
      'Specify security deposit refund terms',
      'Add force majeure clause',
      'Include dispute resolution mechanism'
    ];
  }

  private checkLeaseCompliance(content: string): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // Stamp duty compliance
    checks.push({
      requirement: 'Stamp Duty Payment',
      status: content.includes('stamp') ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: content.includes('stamp') ? 'Stamp duty mentioned' : 'Stamp duty not addressed',
      action: 'Pay appropriate stamp duty as per state schedule'
    });

    // Registration compliance
    checks.push({
      requirement: 'Document Registration',
      status: content.includes('registration') ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: content.includes('registration') ? 'Registration mentioned' : 'Registration not addressed',
      action: 'Register document if lease value exceeds ₹100'
    });

    return checks;
  }

  private findMissingLeaseClauses(content: string): string[] {
    const missingClauses: string[] = [];

    if (!content.includes('stamp')) {
      missingClauses.push('Stamp Duty Clause');
    }
    if (!content.includes('registration')) {
      missingClauses.push('Registration Clause');
    }
    if (!content.includes('maintenance')) {
      missingClauses.push('Maintenance Responsibilities');
    }
    if (!content.includes('termination')) {
      missingClauses.push('Termination Conditions');
    }

    return missingClauses;
  }

  private checkCriticalLeaseElements(content: string): CriticalElement[] {
    return [
      {
        element: 'Property Description',
        found: content.includes('property') || content.includes('premises'),
        importance: 'MANDATORY',
        description: 'Detailed description of leased property'
      },
      {
        element: 'Rent Amount',
        found: content.includes('rent') || content.includes('₹'),
        importance: 'MANDATORY',
        description: 'Monthly rent amount and payment terms'
      },
      {
        element: 'Lease Period',
        found: content.includes('period') || content.includes('duration'),
        importance: 'MANDATORY',
        description: 'Lease duration and renewal terms'
      },
      {
        element: 'Security Deposit',
        found: content.includes('security') || content.includes('deposit'),
        importance: 'MANDATORY',
        description: 'Security deposit amount and refund conditions'
      }
    ];
  }
}

// Factory function to get appropriate analyzer
export function getDocumentAnalyzer(documentType: string): DocumentSpecificAnalyzer {
  switch (documentType) {
    case 'service_agreement':
      return new ServiceAgreementAnalyzer();
    case 'employment_contract':
      return new EmploymentContractAnalyzer();
    case 'lease_agreement':
      return new LeaseAgreementAnalyzer();
    default:
      return new ServiceAgreementAnalyzer(); // Default fallback
  }
}