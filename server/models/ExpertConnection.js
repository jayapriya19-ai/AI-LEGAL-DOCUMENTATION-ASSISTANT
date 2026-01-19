const mongoose = require('mongoose');

const expertConnectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert',
    required: true
  },
  connectionType: {
    type: String,
    enum: ['consultation', 'document_review', 'legal_advice', 'representation'],
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  budget: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'INR' },
    paymentType: {
      type: String,
      enum: ['hourly', 'fixed', 'retainer'],
      default: 'hourly'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  expertResponse: {
    message: String,
    responseTime: Date,
    proposedRate: Number,
    availability: {
      startDate: Date,
      endDate: Date,
      timeSlots: [String]
    }
  },
  consultation: {
    scheduledDate: Date,
    duration: Number, // in minutes
    meetingLink: String,
    meetingType: {
      type: String,
      enum: ['video', 'phone', 'in_person', 'email'],
      default: 'video'
    },
    notes: String,
    followUpRequired: Boolean,
    followUpDate: Date
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    documentType: String,
    isConfidential: { type: Boolean, default: true }
  }],
  communication: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    senderType: {
      type: String,
      enum: ['user', 'expert'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      enum: ['text', 'document', 'voice', 'video'],
      default: 'text'
    },
    attachments: [{
      name: String,
      url: String,
      type: String
    }],
    isRead: {
      type: Boolean,
      default: false
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  }],
  rating: {
    userRating: {
      score: { type: Number, min: 1, max: 5 },
      review: String,
      ratedAt: Date
    },
    expertRating: {
      score: { type: Number, min: 1, max: 5 },
      review: String,
      ratedAt: Date
    }
  },
  payment: {
    amount: Number,
    currency: { type: String, default: 'INR' },
    paymentMethod: String,
    transactionId: String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    paidAt: Date,
    invoice: {
      invoiceNumber: String,
      invoiceUrl: String,
      generatedAt: Date
    }
  },
  confidentialityAgreement: {
    signed: { type: Boolean, default: false },
    signedAt: Date,
    agreementUrl: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  archivedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
expertConnectionSchema.index({ user: 1, createdAt: -1 });
expertConnectionSchema.index({ expert: 1, status: 1 });
expertConnectionSchema.index({ status: 1, urgency: 1 });
expertConnectionSchema.index({ connectionType: 1 });
expertConnectionSchema.index({ 'consultation.scheduledDate': 1 });

// Virtual for connection summary
expertConnectionSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    connectionType: this.connectionType,
    status: this.status,
    urgency: this.urgency,
    createdAt: this.createdAt,
    lastActivity: this.communication.length > 0 ? 
      this.communication[this.communication.length - 1].sentAt : this.createdAt
  };
});

// Method to add communication
expertConnectionSchema.methods.addMessage = function(senderId, senderType, message, messageType = 'text', attachments = []) {
  this.communication.push({
    sender: senderId,
    senderType,
    message,
    messageType,
    attachments
  });
  return this.save();
};

// Method to update status
expertConnectionSchema.methods.updateStatus = function(newStatus, expertResponse = null) {
  this.status = newStatus;
  if (expertResponse) {
    this.expertResponse = { ...this.expertResponse, ...expertResponse };
  }
  return this.save();
};

// Method to schedule consultation
expertConnectionSchema.methods.scheduleConsultation = function(consultationData) {
  this.consultation = { ...this.consultation, ...consultationData };
  this.status = 'in_progress';
  return this.save();
};

// Method to add rating
expertConnectionSchema.methods.addRating = function(ratingType, score, review) {
  if (ratingType === 'user') {
    this.rating.userRating = { score, review, ratedAt: new Date() };
  } else if (ratingType === 'expert') {
    this.rating.expertRating = { score, review, ratedAt: new Date() };
  }
  return this.save();
};

// Method to process payment
expertConnectionSchema.methods.processPayment = function(paymentData) {
  this.payment = { ...this.payment, ...paymentData };
  return this.save();
};

// Static method to get connection stats
expertConnectionSchema.statics.getConnectionStats = function(userId, userType = 'user') {
  const matchField = userType === 'user' ? 'user' : 'expert';
  
  return this.aggregate([
    { $match: { [matchField]: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalConnections: { $sum: 1 },
        statusBreakdown: {
          $push: '$status'
        },
        avgRating: userType === 'user' ? 
          { $avg: '$rating.expertRating.score' } : 
          { $avg: '$rating.userRating.score' },
        totalEarnings: userType === 'expert' ? 
          { $sum: { $cond: [{ $eq: ['$payment.paymentStatus', 'paid'] }, '$payment.amount', 0] } } : 
          { $sum: 0 },
        connectionTypes: { $addToSet: '$connectionType' }
      }
    }
  ]);
};

// Method to mark messages as read
expertConnectionSchema.methods.markMessagesAsRead = function(userId) {
  this.communication.forEach(msg => {
    if (msg.sender.toString() !== userId.toString()) {
      msg.isRead = true;
    }
  });
  return this.save();
};

module.exports = mongoose.model('ExpertConnection', expertConnectionSchema);