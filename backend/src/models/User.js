import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'superadmin'], 
    default: 'user' 
  },
  isActive: { type: Boolean, default: true },
  avatar: { type: String, default: '' },
  department: { type: String, default: '' },
  permissions: [{
    type: String,
    enum: [
      'view_reports', 
      'manage_reports', 
      'view_users', 
      'manage_users', 
      'view_analytics', 
      'system_settings',
      'emergency_response'
    ]
  }],
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    console.log('Hashing password for user:', this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getPermissions = function() {
  const rolePermissions = {
    user: ['view_reports'],
    admin: ['view_reports', 'manage_reports', 'view_users', 'view_analytics', 'emergency_response'],
    superadmin: ['view_reports', 'manage_reports', 'view_users', 'manage_users', 'view_analytics', 'system_settings', 'emergency_response']
  };
  
  return [...new Set([...rolePermissions[this.role], ...this.permissions])];
};

const User = mongoose.model('User', userSchema);

export default User;
