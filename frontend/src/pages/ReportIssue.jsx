import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { MapPin, Camera, Send, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    issueType: '',
    severity: '',
    location: '',
    description: '',
    contactInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [currentColors, setCurrentColors] = useState(['#ff6b6b', '#4ecdc4', '#45b7d1']);

  // Dynamic color cycling
  useEffect(() => {
    const colors = [
      ['#ff6b6b', '#4ecdc4', '#45b7d1'],
      ['#4ecdc4', '#45b7d1', '#96ceb4'],
      ['#45b7d1', '#96ceb4', '#feca57'],
      ['#96ceb4', '#feca57', '#ff6b6b'],
      ['#feca57', '#ff6b6b', '#4ecdc4']
    ];
    
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setCurrentColors(colors[colorIndex]);
    }, 3000);
    
    return () => clearInterval(colorInterval);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      navigate('/track-issue');
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]}, ${currentColors[2]})`,
            `linear-gradient(90deg, ${currentColors[1]}, ${currentColors[2]}, ${currentColors[0]})`,
            `linear-gradient(135deg, ${currentColors[2]}, ${currentColors[0]}, ${currentColors[1]})`,
            `linear-gradient(180deg, ${currentColors[0]}, ${currentColors[2]}, ${currentColors[1]})`
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            animate={{
              boxShadow: [
                '0 20px 60px rgba(255, 255, 255, 0.1)',
                '0 20px 60px rgba(255, 255, 255, 0.2)',
                '0 20px 60px rgba(255, 255, 255, 0.1)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Card className="bg-black/20 backdrop-blur-lg border-white/20">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.h1 
                    className="text-3xl font-bold text-white mb-2"
                    animate={{ 
                      color: [currentColors[0], currentColors[1], currentColors[2], currentColors[0]]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Report Water Issue
                  </motion.h1>
                  <p className="text-white/80">Help us improve water services in your area</p>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-white/80 mb-2">Issue Type</label>
                    <select 
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                      value={formData.issueType}
                      onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                    >
                      <option value="">Select issue type</option>
                      <option value="quality">Water Quality Issues</option>
                      <option value="shortage">Water Supply Shortage</option>
                      <option value="pressure">Low Water Pressure</option>
                      <option value="contamination">Water Contamination</option>
                      <option value="infrastructure">Infrastructure Problems</option>
                    </select>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-white/80 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-white/60" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60"
                        placeholder="Enter location or address"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-white/80 mb-2">Description</label>
                    <textarea
                      rows="5"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 resize-none"
                      placeholder="Describe the water issue in detail..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-white/80 mb-2">Contact Information</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60"
                      placeholder="Email or phone number for updates"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <Button 
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-white text-black hover:bg-white/90 font-bold py-4"
                    >
                      <motion.div
                        animate={loading ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="flex items-center justify-center"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        {loading ? 'Submitting Report...' : 'Submit Report'}
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
