import express from 'express';
import { auth } from '../middleware/auth.js';
import { requireRole, requirePermission } from '../middleware/roleAuth.js';
import User from '../models/User.js';
import Report from '../models/Report.js';

const router = express.Router();

// Get admin dashboard stats
router.get('/dashboard/stats', auth, requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalReports,
      pendingReports,
      inProgressReports,
      resolvedReports,
      criticalReports,
      reportsThisWeek,
      reportsThisMonth,
      totalUsers,
      activeUsers
    ] = await Promise.all([
      Report.countDocuments(),
      Report.countDocuments({ status: 'PENDING' }),
      Report.countDocuments({ status: 'IN_PROGRESS' }),
      Report.countDocuments({ status: 'RESOLVED' }),
      Report.countDocuments({ priority: 'CRITICAL', status: { $nin: ['RESOLVED', 'CLOSED'] } }),
      Report.countDocuments({ createdAt: { $gte: lastWeek } }),
      Report.countDocuments({ createdAt: { $gte: lastMonth } }),
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'user', lastLogin: { $gte: lastMonth } })
    ]);

    // Get reports by type
    const reportsByType = await Report.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    // Get recent critical reports
    const criticalReportsDetails = await Report.find({ 
      priority: 'CRITICAL', 
      status: { $nin: ['RESOLVED', 'CLOSED'] } 
    })
    .populate('reportedBy', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(5);

    // Average resolution time
    const avgResolutionTime = await Report.aggregate([
      { $match: { status: 'RESOLVED', actualResolutionTime: { $exists: true } } },
      { 
        $addFields: { 
          resolutionDays: { 
            $divide: [{ $subtract: ['$actualResolutionTime', '$createdAt'] }, 1000 * 60 * 60 * 24] 
          } 
        } 
      },
      { $group: { _id: null, avgDays: { $avg: '$resolutionDays' } } }
    ]);

    res.json({
      overview: {
        totalReports,
        pendingReports,
        inProgressReports,
        resolvedReports,
        criticalReports,
        reportsThisWeek,
        reportsThisMonth,
        totalUsers,
        activeUsers,
        avgResolutionDays: avgResolutionTime[0]?.avgDays || 0
      },
      reportsByType,
      criticalReportsDetails
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

// Get all reports with filtering and pagination
router.get('/reports', auth, requirePermission('view_reports'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority, 
      type, 
      assignedTo, 
      dateFrom, 
      dateTo,
      search 
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (type) filter.type = type;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [reports, total] = await Promise.all([
      Report.find(filter)
        .populate('reportedBy', 'firstName lastName email')
        .populate('assignedTo', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Report.countDocuments(filter)
    ]);

    res.json({
      reports,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// Update report status and assignment
router.put('/reports/:id', auth, requirePermission('manage_reports'), async (req, res) => {
  try {
    const { status, assignedTo, priority, adminNote, estimatedResolutionTime, costEstimate } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (priority) updateData.priority = priority;
    if (estimatedResolutionTime) updateData.estimatedResolutionTime = estimatedResolutionTime;
    if (costEstimate) updateData.costEstimate = costEstimate;
    
    updateData.updatedAt = new Date();
    
    if (status === 'RESOLVED') {
      updateData.actualResolutionTime = new Date();
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('reportedBy assignedTo', 'firstName lastName email');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Add admin note if provided
    if (adminNote) {
      report.adminNotes.push({
        note: adminNote,
        addedBy: req.user._id,
        addedAt: new Date()
      });
      await report.save();
    }

    res.json(report);

  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Failed to update report' });
  }
});

// Get all users
router.get('/users', auth, requirePermission('view_users'), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search, isActive } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter)
    ]);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Update user role and permissions
router.put('/users/:id', auth, requirePermission('manage_users'), async (req, res) => {
  try {
    const { role, isActive, permissions, department } = req.body;
    
    const updateData = {};
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (permissions) updateData.permissions = permissions;
    if (department) updateData.department = department;
    updateData.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Get emergency alerts
router.get('/emergency-alerts', auth, requirePermission('emergency_response'), async (req, res) => {
  try {
    const criticalReports = await Report.find({
      priority: 'CRITICAL',
      status: { $nin: ['RESOLVED', 'CLOSED'] }
    })
    .populate('reportedBy', 'firstName lastName email phone')
    .sort({ createdAt: -1 });

    res.json(criticalReports);

  } catch (error) {
    console.error('Emergency alerts error:', error);
    res.status(500).json({ message: 'Failed to fetch emergency alerts' });
  }
});

// Analytics endpoints
router.get('/analytics/reports-trend', auth, requirePermission('view_analytics'), async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const reportsTrend = await Report.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 },
          resolved: {
            $sum: { $cond: [{ $eq: ["$status", "RESOLVED"] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(reportsTrend);
  } catch (error) {
    console.error('Reports trend error:', error);
    res.status(500).json({ message: 'Failed to fetch reports trend' });
  }
});

router.get('/analytics/performance', auth, requirePermission('view_analytics'), async (req, res) => {
  try {
    // Average resolution time by type
    const resolutionByType = await Report.aggregate([
      { $match: { status: 'RESOLVED', actualResolutionTime: { $exists: true } } },
      {
        $addFields: {
          resolutionHours: {
            $divide: [{ $subtract: ['$actualResolutionTime', '$createdAt'] }, 1000 * 60 * 60]
          }
        }
      },
      {
        $group: {
          _id: '$type',
          avgResolutionHours: { $avg: '$resolutionHours' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Staff performance
    const staffPerformance = await Report.aggregate([
      { $match: { assignedTo: { $exists: true }, status: 'RESOLVED' } },
      {
        $group: {
          _id: '$assignedTo',
          resolvedCount: { $sum: 1 },
          avgResolutionTime: {
            $avg: {
              $divide: [{ $subtract: ['$actualResolutionTime', '$createdAt'] }, 1000 * 60 * 60]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          resolvedCount: 1,
          avgResolutionTime: 1
        }
      }
    ]);

    res.json({
      resolutionByType,
      staffPerformance
    });
  } catch (error) {
    console.error('Performance analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch performance analytics' });
  }
});

export default router;
