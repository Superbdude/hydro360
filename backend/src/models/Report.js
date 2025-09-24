import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['LEAK', 'CONTAMINATION', 'OUTAGE', 'FLOOD', 'PRESSURE', 'MAINTENANCE', 'EMERGENCY', 'OTHER']
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM'
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['PENDING', 'INVESTIGATING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REJECTED'],
    default: 'PENDING'
  },
  urgencyLevel: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  estimatedResolutionTime: {
    type: Date
  },
  actualResolutionTime: {
    type: Date
  },
  costEstimate: {
    type: Number,
    default: 0
  },
  actualCost: {
    type: Number,
    default: 0
  },
  affectedArea: {
    radius: { type: Number, default: 0 },
    estimatedPeople: { type: Number, default: 0 }
  },
  images: [{
    type: String
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
