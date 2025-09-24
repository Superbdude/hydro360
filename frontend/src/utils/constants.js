export const ISSUE_TYPES = {
  LEAK: 'Water Leak',
  QUALITY: 'Water Quality',
  PRESSURE: 'Low Pressure',
  CONTAMINATION: 'Contamination',
  FLOOD: 'Flooding',
  OTHER: 'Other'
};

export const ISSUE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CANCELLED: 'cancelled'
};

export const MAP_CONFIG = {
  defaultCenter: [6.5244, 3.3792], // Lagos coordinates
  defaultZoom: 13,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

export const THEME_COLORS = {
  primary: '#0077b6',
  accent: '#00b4d8',
  highlight: '#90e0ef',
  background: '#caf0f8',
  darkText: '#1e293b',
  darkBg: '#0f172a'
};
