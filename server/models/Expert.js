const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  professionalInfo: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    specializations: [{
      type: String,
      required: true,
      enum: [
        'Corporate Law',
        'Criminal Law',
        'Constitutional Law',
        'Intellectual Property',
        'Banking Law',
        'Technology Law',
        'Contract Law',
        'Employment Law',
        'Property Law',
        'Tax Law',
        'Family Law',
        'Environmental Law',
        'International Law',
        'Arbitration',
        'Litigation'
      ]
    }],
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    barCouncilNumber: {
      type: String,
      required: true,
      unique: true
    },
    currentPosition: String,
    organization: String,
    practiceAreas: [String],
    languages: [{
      type: String,
      default: ['English', 'Hindi']
    }]
  },
  credentials: {
    education: [{
      degree: String,
      institution: String,
      year: Number,
      specialization: String
    }],
    certifications: [{
      name: String,
      issuingBody: String,
      issueDate: Date,
      expiryDate: Date,
      certificateUrl: String
    }],
    publications: [{
      title: String,
      journal: String,
      publishedDate: Date,
      url: String,
      coAuthors: [String]
    }],
    awards: [{
      title: String,
      awardingBody: String,
      year: Number,
      description: String
    }]
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verificationDate: Date,
    verificationDocuments: [{
      documentType: String,
      documentUrl: String,
      uploadedAt: { type: Date, default: Date.now }
    }],
    backgroundCheck: {
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'failed'],
        default: 'pending'
      },
      completedAt: Date,
      notes: String
    }
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    workingHours: {
      monday: { start: String, end: String, available: Boolean },
      tuesday: { start: String, end: String, available: Boolean },
      wednesday: { start: String, end: String, available: Boolean },
      thursday: { start: String, end: String, available: Boolean },
      friday: { start: String, end: String, available: Boolean },
      saturday: { start: String, end: String, available: Boolean },
      sunday: { start: String, end: String, available: Boolean }
    },
    timeZone: {
      type: String,
      default: 'Asia/Kolkata'
    },
    consultationTypes: [{
      type: String,
      enum: ['video', 'phone', 'in_person', 'email'],
      default: ['video', 'phone']
    }],
    responseTime: {
      type: String,
      enum: ['within_1_hour', 'within_4_hours', 'within_24_hours', 'within_48_hours'],
      default: 'within_24_hours'
    }
  },
  pricing: {
    hourlyRate: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    consultationFee: Number,
    documentReviewRate: Number,
    retainerFee: Number,
    paymentTerms: String,
    acceptedPaymentMethods: [{
      type: String,
      enum: ['bank_transfer', 'upi', 'credit_card', 'debit_card', 'wallet'],
      default: ['bank_transfer', 'upi']
    }]
  },
  ratings: {
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    ratingBreakdown: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  statistics: {
    totalConsultations: {
      type: Number,
      default: 0
    },
    completedCases: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    responseRate: {
      type: Number,
      default: 100,
      min: 0,
      max: 100
    },
    clientRetentionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    totalEarnings: {
      type: Number,
      default: 0
    }
  },
  profile: {
    bio: {
      type: String,
      maxlength: 1000
    },
    profileImage: String,
    coverImage: String,
    website: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String
    },
    officeAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' }
    },
    contactInfo: {
      phone: String,
      email: String,
      alternateEmail: String
    }
  },
  preferences: {
    caseTypes: [String],
    clientTypes: [{
      type: String,
      enum: ['individual', 'startup', 'sme', 'enterprise', 'government'],
      default: ['individual', 'startup', 'sme']
    }],
    minimumCaseValue: Number,
    travelWillingness: {
      type: String,
      enum: ['local', 'state', 'national', 'international'],
      default: 'state'
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending_verification'],
    default: 'pending_verification'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
expertSchema.index({ 'professionalInfo.specializations': 1 });
expertSchema.index({ 'ratings.averageRating': -1 });
expertSchema.index({ 'pricing.hourlyRate': 1 });
expertSchema.index({ 'verification.isVerified': 1 });
expertSchema.index({ status: 1 });
expertSchema.index({ 'profile.officeAddress.city': 1 });
expertSchema.index({ 'availability.isAvailable': 1 });

// Virtual for expert summary
expertSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    name: this.user?.name,
    title: this.professionalInfo.title,
    specializations: this.professionalInfo.specializations,
    experience: this.professionalInfo.experience,
    rating: this.ratings.averageRating,
    totalReviews: this.ratings.totalReviews,
    hourlyRate: this.pricing.hourlyRate,
    isVerified: this.verification.isVerified,
    isAvailable: this.availability.isAvailable,
    location: this.profile.officeAddress?.city,
    responseTime: this.availability.responseTime
  };
});

// Method to update rating
expertSchema.methods.updateRating = function(newRating) {
  const currentTotal = this.ratings.totalReviews * this.ratings.averageRating;
  this.ratings.totalReviews += 1;
  this.ratings.averageRating = (currentTotal + newRating) / this.ratings.totalReviews;
  
  // Update rating breakdown
  if (newRating >= 4.5) this.ratings.ratingBreakdown.five += 1;
  else if (newRating >= 3.5) this.ratings.ratingBreakdown.four += 1;
  else if (newRating >= 2.5) this.ratings.ratingBreakdown.three += 1;
  else if (newRating >= 1.5) this.ratings.ratingBreakdown.two += 1;
  else this.ratings.ratingBreakdown.one += 1;
  
  return this.save();
};

// Method to increment consultation count
expertSchema.methods.incrementConsultation = function() {
  this.statistics.totalConsultations += 1;
  this.lastActive = new Date();
  return this.save();
};

// Static method to find experts by criteria
expertSchema.statics.findBySpecialization = function(specialization, options = {}) {
  const query = {
    'professionalInfo.specializations': specialization,
    'verification.isVerified': true,
    'availability.isAvailable': true,
    status: 'active'
  };
  
  if (options.minRating) {
    query['ratings.averageRating'] = { $gte: options.minRating };
  }
  
  if (options.maxRate) {
    query['pricing.hourlyRate'] = { $lte: options.maxRate };
  }
  
  if (options.location) {
    query['profile.officeAddress.city'] = new RegExp(options.location, 'i');
  }
  
  return this.find(query)
    .populate('user', 'name email profileImage')
    .sort(options.sortBy || { 'ratings.averageRating': -1 });
};

// Static method to get top experts
expertSchema.statics.getTopExperts = function(limit = 10) {
  return this.find({
    'verification.isVerified': true,
    status: 'active',
    'ratings.totalReviews': { $gte: 5 }
  })
  .populate('user', 'name email profileImage')
  .sort({ 'ratings.averageRating': -1, 'ratings.totalReviews': -1 })
  .limit(limit);
};

module.exports = mongoose.model('Expert', expertSchema);