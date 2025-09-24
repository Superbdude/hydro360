import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hydro360_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const submitReport = async (reportData) => {
  try {
    const formData = new FormData();
    Object.keys(reportData).forEach(key => {
      if (key === 'images') {
        reportData.images.forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, reportData[key]);
      }
    });

    const response = await api.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit report');
  }
};

export const getReportById = async (id) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch report');
  }
};

export const updateReport = async (id, updateData) => {
  try {
    const response = await api.patch(`/reports/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update report');
  }
};

export const getReportsByUser = async () => {
  try {
    const response = await api.get('/reports/user');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reports');
  }
};

export const getAllReports = async (filters = {}) => {
  try {
    const response = await api.get('/reports', { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reports');
  }
};
