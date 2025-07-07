import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportSummaryPanel = ({ importStats, importHistory, onRollback }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={16} className="text-error" />;
      case 'processing':
        return <Icon name="Clock" size={16} className="text-warning" />;
      default:
        return <Icon name="AlertCircle" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'failed':
        return 'text-error';
      case 'processing':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Import Statistics */}
      <div className="bg-card rounded-lg p-6 gaming-shadow">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
          Import Summary
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-3">
              <Icon name="UserCheck" size={20} className="text-success" />
              <span className="font-medium text-text-primary">Successful</span>
            </div>
            <span className="text-xl font-heading-bold text-success">
              {importStats.successful.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-3">
              <Icon name="UserX" size={20} className="text-warning" />
              <span className="font-medium text-text-primary">Duplicates</span>
            </div>
            <span className="text-xl font-heading-bold text-warning">
              {importStats.duplicates.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-error/10 rounded-lg border border-error/20">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error" />
              <span className="font-medium text-text-primary">Errors</span>
            </div>
            <span className="text-xl font-heading-bold text-error">
              {importStats.errors.toLocaleString()}
            </span>
          </div>
          
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="font-medium text-text-primary">Total Processed</span>
              <span className="text-xl font-heading-bold text-text-primary">
                {(importStats.successful + importStats.duplicates + importStats.errors).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg p-6 gaming-shadow">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            onClick={() => {/* Download error report */}}
          >
            Download Error Report
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="FileText"
            onClick={() => {/* Download template */}}
          >
            Download Template
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="RefreshCw"
            onClick={() => {/* Clear all data */}}
          >
            Clear Preview
          </Button>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-card rounded-lg p-6 gaming-shadow">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
          Recent Imports
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {importHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getStatusIcon(item.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.recordsProcessed} records
                </span>
                {item.status === 'completed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => onRollback(item.id)}
                    className="text-error hover:text-error"
                  >
                    Rollback
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {importHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="History" size={48} className="mx-auto mb-3 opacity-50" />
              <p>No import history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportSummaryPanel;