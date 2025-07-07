import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsDisplay = ({ totalCharacters, filteredCount, currentPage, charactersPerPage }) => {
  const startIndex = (currentPage - 1) * charactersPerPage + 1;
  const endIndex = Math.min(currentPage * charactersPerPage, filteredCount);

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6 gaming-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {/* Total Stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Total Characters:</span>
            <span className="text-sm font-semibold text-text-primary">{totalCharacters.toLocaleString()}</span>
          </div>
          
          {filteredCount !== totalCharacters && (
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-secondary" />
              <span className="text-sm text-text-secondary">Filtered:</span>
              <span className="text-sm font-semibold text-text-primary">{filteredCount.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Current View Stats */}
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            Showing {startIndex.toLocaleString()}-{endIndex.toLocaleString()} of {filteredCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;