import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('hydro360_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
  }
};

export const getReports = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/admin/reports?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reports');
  }
};

export const updateReport = async (reportId, updateData) => {
  try {
    const response = await api.put(`/admin/reports/${reportId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update report');
  }
};

export const getUsers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/admin/users?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

export const getEmergencyAlerts = async () => {
  try {
    const response = await api.get('/admin/emergency-alerts');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch emergency alerts');
  }
};

export const getAnalytics = async () => {
  try {
    const [reportsTrend, performance] = await Promise.all([
      api.get('/admin/analytics/reports-trend'),
      api.get('/admin/analytics/performance')
    ]);
    
    return {
      reportsTrend: reportsTrend.data,
      performance: performance.data
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch analytics');
  }
};
