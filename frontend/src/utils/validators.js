export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  // Basic Nigerian phone number validation
  const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates a water issue report
 * @param {Object} report - The report to validate
 * @param {string} report.title - Title of the issue
 * @param {string} report.description - Detailed description of the issue
 * @param {string} report.type - Type of water issue
 * @param {Object} report.location - Geographic coordinates
 * @param {number} report.location.lat - Latitude
 * @param {number} report.location.lng - Longitude
 * @param {File[]} [report.images] - Optional array of image files
 * @returns {Object} Validation result with isValid flag and any errors
 */
export const validateIssueReport = (report) => {
  const errors = {};

  // Validate title
  if (!report.title || report.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (report.title.length < 5) {
    errors.title = 'Title must be at least 5 characters';
  } else if (report.title.length > 100) {
    errors.title = 'Title must not exceed 100 characters';
  }

  // Validate description
  if (!report.description || report.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (report.description.length < 20) {
    errors.description = 'Description must be at least 20 characters';
  } else if (report.description.length > 1000) {
    errors.description = 'Description must not exceed 1000 characters';
  }

  // Validate type
  if (!report.type) {
    errors.type = 'Issue type is required';
  }

  // Validate location
  if (!report.location) {
    errors.location = 'Location is required';
  } else {
    if (typeof report.location.lat !== 'number' || 
        typeof report.location.lng !== 'number') {
      errors.location = 'Invalid location coordinates';
    } else {
      // Validate latitude range (-90 to 90)
      if (report.location.lat < -90 || report.location.lat > 90) {
        errors.location = 'Invalid latitude value';
      }
      // Validate longitude range (-180 to 180)
      if (report.location.lng < -180 || report.location.lng > 180) {
        errors.location = 'Invalid longitude value';
      }
    }
  }

  // Validate images
  if (report.images) {
    if (!Array.isArray(report.images)) {
      errors.images = 'Images must be an array';
    } else if (report.images.length > 5) {
      errors.images = 'Maximum 5 images allowed';
    } else {
      // Validate each image
      for (let i = 0; i < report.images.length; i++) {
        const image = report.images[i];
        if (!(image instanceof File)) {
          errors.images = 'Invalid image format';
          break;
        }
        if (!image.type.startsWith('image/')) {
          errors.images = 'Files must be images';
          break;
        }
        // Check file size (max 10MB)
        if (image.size > 10 * 1024 * 1024) {
          errors.images = 'Images must not exceed 10MB';
          break;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
