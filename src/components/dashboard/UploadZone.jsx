import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileType, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const UploadZone = ({ onUploadComplete, isAnalyzing }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size too large. Max 10MB.");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        }
      );
      
      setUploading(false);
      onUploadComplete(response.data.secure_url);
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      alert('Failed to upload image. Please try again.');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="p-8 border-dashed border-2 border-brand-cyan/20 hover:border-brand-cyan/50 transition-all group">
      <div 
        className="flex flex-col items-center justify-center min-h-[300px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!preview ? (
          <>
            <div className="w-20 h-20 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Upload className="w-10 h-10 text-brand-cyan" />
            </div>
            <h3 className="text-2xl font-syne font-bold text-white mb-2">Drop your prescription here</h3>
            <p className="text-white/50 mb-8">Supports JPG, PNG, PDF up to 10MB</p>
            <Button onClick={() => fileInputRef.current.click()}>
              Browse Files
            </Button>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*,.pdf"
            />
          </>
        ) : (
          <div className="w-full space-y-6">
            <div className="relative w-full aspect-video bg-brand-navy rounded-2xl overflow-hidden border border-white/10 group/preview">
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              <button 
                onClick={clearFile}
                className="absolute top-4 right-4 p-2 bg-brand-navy/80 text-white rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover/preview:opacity-100"
              >
                <X size={20} />
              </button>
              {isAnalyzing && (
                <div className="scan-line" />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-brand-cyan" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white truncate max-w-[200px]">{file.name}</div>
                  <div className="text-xs text-white/40">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
              </div>
              
              {!uploading && progress !== 100 && (
                <Button onClick={handleUpload}>
                  Upload Image
                </Button>
              )}
              
              {progress === 100 && (
                <div className="flex items-center text-brand-emerald font-bold">
                  <CheckCircle2 className="mr-2" size={20} />
                  Uploaded
                </div>
              )}
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-white/50">
                  <span>Uploading to Cloudinary...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-brand-cyan"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UploadZone;
