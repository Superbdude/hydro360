import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, Lock, Save } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { validateEmail, validatePhone } from '../utils/validators';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateProfileData = () => {
    if (!formData.firstName || !formData.lastName) {
      addToast('Name fields cannot be empty', 'error');
      return false;
    }

    if (!validateEmail(formData.email)) {
      addToast('Please enter a valid email address', 'error');
      return false;
    }

    if (!validatePhone(formData.phone)) {
      addToast('Please enter a valid phone number', 'error');
      return false;
    }

    return true;
  };

  const validatePasswordData = () => {
    if (!passwordData.currentPassword) {
      addToast('Current password is required', 'error');
      return false;
    }

    if (passwordData.newPassword.length < 6) {
      addToast('New password must be at least 6 characters', 'error');
      return false;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      addToast('New passwords do not match', 'error');
      return false;
    }

    return true;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateProfileData()) return;

    try {
      setLoading(true);
      await updateProfile(formData);
      addToast('Profile updated successfully!', 'success');
    } catch (error) {
      addToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordData()) return;

    try {
      setLoading(true);
      await updateProfile({ password: passwordData.newPassword, currentPassword: passwordData.currentPassword });
      addToast('Password updated successfully!', 'success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      addToast(error.message || 'Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Profile Settings
          </h1>

          {/* Profile Information */}
          <Card className="mb-8">
            <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  icon={User}
                  required
                />

                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  icon={User}
                  required
                />
              </div>

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={Phone}
                required
              />

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                icon={MapPin}
                required
              />

              <Button
                type="submit"
                isLoading={loading}
                disabled={loading}
                className="w-full md:w-auto"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Password Update */}
          <Card>
            <form onSubmit={handlePasswordUpdate} className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Change Password
              </h2>

              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                icon={Lock}
                required
              />

              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                icon={Lock}
                required
              />

              <Input
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                icon={Lock}
                required
              />

              <Button
                type="submit"
                variant="outline"
                isLoading={loading}
                disabled={loading}
                className="w-full md:w-auto"
              >
                <Lock className="w-5 h-5 mr-2" />
                Update Password
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
