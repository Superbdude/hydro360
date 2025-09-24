import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getAllReports } from '../services/reportService';
import { useToast } from '../components/ui/Toast';
import { ISSUE_TYPES, ISSUE_STATUS } from '../utils/constants';
import Map from '../components/maps/Map';

const statusColors = {
  pending: 'yellow',
  'in-progress': 'blue',
  resolved: 'green',
  closed: 'gray'
};

const TrackIssue = () => {
  const { addToast } = useToast();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    search: ''
  });
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getAllReports({
        status: filters.status,
        type: filters.type,
        search: filters.search
      });
      setReports(response.data || []);
    } catch (error) {
      addToast(error.message || 'Failed to fetch reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Track Water Issues
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor and track the status of reported water issues in your community.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            icon={Search}
            placeholder="Search reports..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <select
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {Object.entries(ISSUE_STATUS).map(([key, value]) => (
              <option key={key} value={key.toLowerCase()}>{value}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            {Object.entries(ISSUE_TYPES).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Reports Grid and Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reports List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <Card>
                <div className="p-6 text-center">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No reports found
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              </Card>
            ) : (
              reports.map((report) => (
                <motion.div
                  key={report.id}
                  layoutId={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="cursor-pointer"
                >
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {report.title}
                        </h3>
                        <Badge color={statusColors[report.status]}>
                          {ISSUE_STATUS[report.status.toUpperCase()]}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>
                            {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(report.createdAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{ISSUE_TYPES[report.type]}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Map View */}
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Map
              markers={reports.map(report => ({
                lat: report.location.lat,
                lng: report.location.lng
              }))}
              center={reports[0]?.location || [6.5244, 3.3792]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackIssue;