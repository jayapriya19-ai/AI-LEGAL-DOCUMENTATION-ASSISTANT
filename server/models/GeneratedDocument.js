const mongoose = require('mongoose');

const generatedDocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documentType: {
    type: String,
    required: true,
    enum: [
      'service_agreement',
      'employment_contract',
      'lease_agreement',
      'partnership_deed',
      'nda',
      'loan_agreement',
      'sale_deed',
      'mou',
      'power_of_attorney',
      'affidavit'
    ]
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  userInsights: {
    type: String,
    required: true
  },
  templateVersion: {
    type: String,
    default: 'v1.0'
  },
  generationData: {
    aiModel: {
      type: String,
      default: 'lexify-document-generator-v1'
    },
    processingTime: Number, // in milliseconds
    wordCount: Number,
    characterCount: Number,
    sectionsGenerated: [{
      sectionName: String,
      sectionType: String,
      wordCount: Number
    }],
    legalCompliance: {
      indianLaws: [{
        act: String,
        section: String,
        compliance: Boolean
      }],
      complianceScore: {
        type: Number,
        min: 0,
        max: 100
      },
      missingClauses: [String],
      recommendations: [String]
    }
  },
  customizations: {
    parties: [{
      role: String, // 'party1', 'party2', 'witness', etc.
      name: String,
      address: String,
      designation: String,
      organization: String
    }],
    financialTerms: {
      currency: { type: String, default: 'INR' },
      amounts: [{
        description: String,
        amount: Number,
        frequency: String // 'one-time', 'monthly', 'yearly'
      }],
      paymentTerms: String,
      taxClauses: [String]
    },
    dates: {
      effectiveDate: Date,
      expiryDate: Date,
      noticePeriod: String,
      renewalTerms: String
    },
    jurisdiction: {
      state: String,
      city: String,
      court: String,
      arbitrationClause: Boolean
    }
  },
  status: {
    type: String,
    enum: ['draft', 'generated', 'reviewed', 'finalized'],
    default: 'generated'
  },
  versions: [{
    versionNumber: Number,
    content: String,
    changes: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  reviews: [{
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewType: {
      type: String,
      enum: ['legal', 'technical', 'business'],
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    suggestions: [String],
    approved: Boolean,
    reviewedAt: {
      type: Date,
      default: Date.now
    }
  }],
  downloads: [{
    format: {
      type: String,
      enum: ['pdf', 'docx', 'txt'],
      required: true
    },
    downloadedAt: {
      type: Date,
      default: Date.now
    },
    downloadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ipAddress: String
  }],
  sharing: {
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
    publicLink: String,
    linkExpiry: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['corporate', 'employment', 'property', 'finance', 'ip', 'general'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateUsageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
generatedDocumentSchema.index({ user: 1, createdAt: -1 });
generatedDocumentSchema.index({ documentType: 1 });
generatedDocumentSchema.index({ category: 1 });
generatedDocumentSchema.index({ status: 1 });
generatedDocumentSchema.index({ tags: 1 });
generatedDocumentSchema.index({ 'generationData.legalCompliance.complianceScore': -1 });

// Virtual for document summary
generatedDocumentSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    title: this.title,
    documentType: this.documentType,
    category: this.category,
    status: this.status,
    complianceScore: this.generationData.legalCompliance?.complianceScore || 0,
    wordCount: this.generationData.wordCount || 0,
    createdAt: this.createdAt,
    lastModified: this.updatedAt
  };
});

// Method to add download record
generatedDocumentSchema.methods.addDownload = function(format, userId, ipAddress) {
  this.downloads.push({
    format,
    downloadedBy: userId,
    ipAddress
  });
  return this.save();
};

// Method to create new version
generatedDocumentSchema.methods.createVersion = function(newContent, changes, userId) {
  const versionNumber = this.versions.length + 1;
  this.versions.push({
    versionNumber,
    content: newContent,
    changes,
    createdBy: userId
  });
  this.content = newContent; // Update main content
  return this.save();
};

// Method to add review
generatedDocumentSchema.methods.addReview = function(reviewData) {
  this.reviews.push(reviewData);
  return this.save();
};

// Static method to get popular templates
generatedDocumentSchema.statics.getPopularTemplates = function(limit = 10) {
  return this.find({ isTemplate: true })
    .sort({ templateUsageCount: -1 })
    .limit(limit)
    .select('title documentType category templateUsageCount generationData.legalCompliance.complianceScore');
};

// Static method to get user's document stats
generatedDocumentSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalDocuments: { $sum: 1 },
        documentTypes: { $addToSet: '$documentType' },
        avgComplianceScore: { $avg: '$generationData.legalCompliance.complianceScore' },
        totalDownloads: { $sum: { $size: '$downloads' } },
        statusBreakdown: {
          $push: '$status'
        }
      }
    }
  ]);
};

// Pre-save middleware to calculate word count
generatedDocumentSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.generationData.wordCount = this.content.split(/\s+/).length;
    this.generationData.characterCount = this.content.length;
  }
  next();
});

module.exports = mongoose.model('GeneratedDocument', generatedDocumentSchema);