import express from 'express';
import Report from '../models/Report.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate('reportedBy', 'firstName lastName');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// Get reports by user
router.get('/user', async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user.id })
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// Get single report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reportedBy', 'firstName lastName');
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch report' });
  }
});

// Create new report
router.post('/', upload.array('images', 5), handleUploadError, async (req, res) => {
  try {
    const { title, description, type, location } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    const report = new Report({
      title,
      description,
      type,
      location: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      },
      images,
      reportedBy: req.user.id
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report' });
  }
});

// Update report
router.patch('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Only allow updates by the report creator or admin
    if (report.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(report, req.body);
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update report' });
  }
});

// Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Only allow deletion by the report creator or admin
    if (report.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await report.remove();
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete report' });
  }
});

export default router;
