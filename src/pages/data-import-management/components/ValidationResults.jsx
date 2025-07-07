import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationResults = ({ validationResults, onStartImport, onDownloadErrors }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { valid, invalid, warnings, summary } = validationResults;

  const getValidationIcon = (type) => {
    switch (type) {
      case 'valid':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'invalid':
        return <Icon name="XCircle" size={16} className="text-error" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} className="text-warning" />;
      default:
        return null;
    }
  };

  const canProceedWithImport = invalid.length === 0;

  return (
    <div className="bg-card rounded-lg p-6 gaming-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading-semibold text-text-primary">
          Validation Results
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          iconName={showDetails ? "ChevronUp" : "ChevronDown"}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
            <div>
              <p className="text-2xl font-heading-bold text-success">
                {valid.length}
              </p>
              <p className="text-sm text-text-secondary">Valid Records</p>
            </div>
          </div>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
            <div>
              <p className="text-2xl font-heading-bold text-warning">
                {warnings.length}
              </p>
              <p className="text-sm text-text-secondary">Warnings</p>
            </div>
          </div>
        </div>

        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="XCircle" size={24} className="text-error" />
            <div>
              <p className="text-2xl font-heading-bold text-error">
                {invalid.length}
              </p>
              <p className="text-sm text-text-secondary">Invalid Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      {showDetails && (
        <div className="space-y-4 mb-6">
          {/* Invalid Records */}
          {invalid.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-error flex items-center space-x-2">
                <Icon name="XCircle" size={16} />
                <span>Invalid Records ({invalid.length})</span>
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {invalid.slice(0, 10).map((item, index) => (
                  <div key={index} className="bg-error/5 border border-error/20 rounded p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          Row {item.row}: {item.characterName || 'Unknown Character'}
                        </p>
                        <p className="text-sm text-error mt-1">{item.error}</p>
                      </div>
                      <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                    </div>
                  </div>
                ))}
                {invalid.length > 10 && (
                  <p className="text-sm text-text-secondary text-center py-2">
                    ... and {invalid.length - 10} more invalid records
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-warning flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} />
                <span>Warnings ({warnings.length})</span>
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {warnings.slice(0, 10).map((item, index) => (
                  <div key={index} className="bg-warning/5 border border-warning/20 rounded p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          Row {item.row}: {item.characterName || 'Unknown Character'}
                        </p>
                        <p className="text-sm text-warning mt-1">{item.warning}</p>
                      </div>
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                    </div>
                  </div>
                ))}
                {warnings.length > 10 && (
                  <p className="text-sm text-text-secondary text-center py-2">
                    ... and {warnings.length - 10} more warnings
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {canProceedWithImport ? (
          <Button
            variant="primary"
            fullWidth
            iconName="Upload"
            onClick={onStartImport}
          >
            Start Import ({valid.length} records)
          </Button>
        ) : (
          <Button
            variant="outline"
            fullWidth
            disabled
            iconName="AlertCircle"
          >
            Fix Errors Before Import
          </Button>
        )}
        
        {(invalid.length > 0 || warnings.length > 0) && (
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            onClick={onDownloadErrors}
          >
            Download Error Report
          </Button>
        )}
      </div>

      {/* Import Summary */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">Import Summary</h4>
        <div className="text-sm text-text-secondary space-y-1">
          <p>• {summary.totalRows} total rows processed</p>
          <p>• {summary.validCharacters} valid characters ready for import</p>
          <p>• {summary.duplicateNames} duplicate character names detected</p>
          <p>• {summary.missingRequiredFields} rows with missing required fields</p>
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;