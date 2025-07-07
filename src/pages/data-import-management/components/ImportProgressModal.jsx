import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportProgressModal = ({ isOpen, onClose, progress, status, currentStep, totalSteps, errors }) => {
  if (!isOpen) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Icon name="Loader2" size={24} className="text-primary animate-spin" />;
      case 'completed':
        return <Icon name="CheckCircle" size={24} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={24} className="text-error" />;
      default:
        return <Icon name="Clock" size={24} className="text-muted-foreground" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return 'Processing your data import...';
      case 'completed':
        return 'Import completed successfully!';
      case 'failed':
        return 'Import failed. Please check the errors below.';
      default:
        return 'Preparing import...';
    }
  };

  const steps = [
    'Validating file format',
    'Processing data rows',
    'Validating character data',
    'Checking for duplicates',
    'Importing to database',
    'Finalizing import'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-md w-full gaming-shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading-semibold text-text-primary">
              Data Import Progress
            </h2>
            {status !== 'processing' && (
              <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
            )}
          </div>

          <div className="space-y-6">
            {/* Status Icon and Message */}
            <div className="text-center space-y-3">
              {getStatusIcon()}
              <p className="text-text-primary font-medium">
                {getStatusMessage()}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full gaming-transition"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            {status === 'processing' && (
              <div className="space-y-3">
                <p className="text-sm text-text-secondary">
                  Step {currentStep} of {totalSteps}
                </p>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        index < currentStep - 1 
                          ? 'bg-success' 
                          : index === currentStep - 1 
                            ? 'bg-primary' :'bg-muted'
                      }`} />
                      <span className={`text-sm ${
                        index < currentStep 
                          ? 'text-text-primary' :'text-text-secondary'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Messages */}
            {status === 'failed' && errors.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-error">Errors encountered:</h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {errors.map((error, index) => (
                    <div key={index} className="text-sm text-error bg-error/10 p-2 rounded border border-error/20">
                      Row {error.row}: {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {status !== 'processing' && (
              <div className="flex space-x-3">
                <Button variant="outline" fullWidth onClick={onClose}>
                  Close
                </Button>
                {status === 'failed' && (
                  <Button variant="primary" fullWidth iconName="Download">
                    Download Error Report
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportProgressModal;