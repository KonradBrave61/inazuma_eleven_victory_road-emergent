import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ searchTerm, hasFilters, onClearFilters, onClearSearch }) => {
  const hasSearchTerm = searchTerm && searchTerm.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-heading text-text-primary mb-2">
        No characters found
      </h3>
      
      <p className="text-text-secondary text-center mb-6 max-w-md">
        {hasSearchTerm && hasFilters
          ? `No characters match "${searchTerm}" with the current filters applied.`
          : hasSearchTerm
          ? `No characters found for "${searchTerm}". Try a different search term.`
          : hasFilters
          ? "No characters match the current filters. Try adjusting your criteria." :"Start searching for characters by name, role, or element."
        }
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {hasSearchTerm && (
          <Button
            variant="outline"
            onClick={onClearSearch}
            iconName="X"
            iconSize={16}
          >
            Clear Search
          </Button>
        )}
        
        {hasFilters && (
          <Button
            variant="primary"
            onClick={onClearFilters}
            iconName="Filter"
            iconSize={16}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {!hasSearchTerm && !hasFilters && (
        <div className="mt-8 text-center">
          <h4 className="text-sm font-medium text-text-primary mb-3">Search Tips:</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Search by character name (e.g., "Endou")</li>
            <li>• Filter by role (FW, MF, DF, GK)</li>
            <li>• Filter by element (Fire, Air, Earth, Wood, Void)</li>
            <li>• Filter by level range</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmptyState;