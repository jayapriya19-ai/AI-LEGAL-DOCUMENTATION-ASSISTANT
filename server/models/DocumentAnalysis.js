const mongoose = require('mongoose');

const documentAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'doc', 'docx', 'txt']
  },
  originalContent: {
    type: String,
    required: true
  },
  analysisData: {
    summary: {
      type: String,
      required: true
    },
    keyPoints: [{
      type: String
    }],
    risks: [{
      level: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      }
    }],
    recommendations: [{
      type: String
    }],
    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    documentType: {
      type: String,
      required: true
    },
    legalTermsFound: {
      type: Number,
      default: 0
    },
    complianceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    indianLegalRefs: [{
      statute: String,
      section: String,
      description: String
    }],
    precedents: [{
      caseTitle: String,
      citation: String,
      principle: String,
      relevance: String
    }]
  },
  metadata: {
    wordCount: Number,
    characterCount: Number,
    sentenceCount: Number,
    documentComplexity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Very High']
    },
    processingTime: Number, // in milliseconds
    aiModel: {
      type: String,
      default: 'lexify-legal-analyzer-v1'
    }
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['read', 'comment', 'edit'],
      default: 'read'
    },
    sharedAt: {
      type: Date,
      default: Date.now
    }
  }],
  downloadCount: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
documentAnalysisSchema.index({ user: 1, createdAt: -1 });
documentAnalysisSchema.index({ 'analysisData.documentType': 1 });
documentAnalysisSchema.index({ 'analysisData.confidenceScore': -1 });
documentAnalysisSchema.index({ status: 1 });
documentAnalysisSchema.index({ tags: 1 });

// Virtual for analysis summary
documentAnalysisSchema.virtual('analysisSummary').get(function() {
  return {
    fileName: this.fileName,
    documentType: this.analysisData.documentType,
    confidenceScore: this.analysisData.confidenceScore,
    riskLevel: this.analysisData.risks.length > 0 ? 
      Math.max(...this.analysisData.risks.map(r => 
        r.level === 'critical' ? 4 : r.level === 'high' ? 3 : r.level === 'medium' ? 2 : 1
      )) : 1,
    createdAt: this.createdAt
  };
});

// Method to increment download count
documentAnalysisSchema.methods.incrementDownload = function() {
  this.downloadCount += 1;
  this.lastAccessed = new Date();
  return this.save();
};

// Method to add tag
documentAnalysisSchema.methods.addTag = function(tag) {
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
    return this.save();
  }
  return this;
};

// Static method to get user's analysis stats
documentAnalysisSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalAnalyses: { $sum: 1 },
        avgConfidenceScore: { $avg: '$analysisData.confidenceScore' },
        documentTypes: { $addToSet: '$analysisData.documentType' },
        totalDownloads: { $sum: '$downloadCount' },
        highRiskDocuments: {
          $sum: {
            $cond: [
              { $gt: [{ $size: { $filter: { input: '$analysisData.risks', cond: { $in: ['$$this.level', ['high', 'critical']] } } } }, 0] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);
};

module.exports = mongoose.model('DocumentAnalysis', documentAnalysisSchema);