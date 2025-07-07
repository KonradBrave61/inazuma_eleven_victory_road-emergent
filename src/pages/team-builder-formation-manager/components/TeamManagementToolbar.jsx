import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TeamManagementToolbar = ({ onSave, onLoad, onShare, onClear }) => {
  return (
    <div className="bg-surface border-b border-border p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={24} className="text-primary" />
          <h2 className="text-xl font-heading text-text-primary">Team Builder</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
            onClick={onSave}
            className="text-sm"
          >
            Save Team
          </Button>
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            onClick={onLoad}
            className="text-sm"
          >
            Load Team
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            onClick={onShare}
            className="text-sm"
          >
            Share
          </Button>
          <Button
            variant="danger"
            iconName="Trash2"
            iconPosition="left"
            onClick={onClear}
            className="text-sm"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamManagementToolbar;