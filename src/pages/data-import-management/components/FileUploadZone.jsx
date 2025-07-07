import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';


const FileUploadZone = ({ onFileSelect, acceptedFiles, maxSize }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    handleFileSelection(files);
  }, []);

  const handleFileSelection = (files) => {
    const validFiles = files.filter(file => {
      const isValidType = acceptedFiles.includes(file.type) || 
                         acceptedFiles.some(type => file.name.toLowerCase().endsWith(type.replace('*', '')));
      const isValidSize = file.size <= maxSize;
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      setIsUploading(true);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(0);
          onFileSelect(validFiles[0]);
        }
      }, 200);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center gaming-transition ${
          isDragOver
            ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="Upload" size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-heading-semibold text-text-primary">
              {isUploading ? 'Uploading...' : 'Drop your files here'}
            </h3>
            <p className="text-text-secondary">
              or <span className="text-primary font-medium">browse</span> to choose files
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Supported formats: .xlsx, .csv</p>
            <p>Maximum file size: {formatFileSize(maxSize)}</p>
          </div>
        </div>
        
        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
            <div className="w-full max-w-xs space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full gaming-transition"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-text-secondary text-center">
                {uploadProgress}% uploaded
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="CheckCircle" size={16} />
          <span>Excel files (.xlsx)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="CheckCircle" size={16} />
          <span>CSV files (.csv)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-warning">
          <Icon name="AlertTriangle" size={16} />
          <span>Max 50MB per file</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;