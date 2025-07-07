import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder, 
  roleFilter, 
  setRoleFilter, 
  rarityFilter, 
  setRarityFilter,
  onClearFilters 
}) => {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'level', label: 'Level' },
    { value: 'rarity', label: 'Rarity' },
    { value: 'role', label: 'Role' }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'FW', label: 'Forward' },
    { value: 'MF', label: 'Midfielder' },
    { value: 'DF', label: 'Defender' },
    { value: 'GK', label: 'Goalkeeper' }
  ];

  const rarityOptions = [
    { value: '', label: 'All Rarities' },
    { value: 'Common', label: 'Common' },
    { value: 'Rare', label: 'Rare' },
    { value: 'Epic', label: 'Epic' },
    { value: 'Legendary', label: 'Legendary' }
  ];

  const hasActiveFilters = roleFilter || rarityFilter || sortBy !== 'name' || sortOrder !== 'asc';

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6 gaming-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Sort by:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-input-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2"
            >
              <Icon 
                name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
              />
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-input-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-input-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {rarityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {(roleFilter || rarityFilter) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {roleFilter && (
            <div className="flex items-center space-x-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
              <span>Role: {roleOptions.find(r => r.value === roleFilter)?.label}</span>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setRoleFilter('')}
                className="p-0 h-4 w-4 hover:bg-primary/30"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          
          {rarityFilter && (
            <div className="flex items-center space-x-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">
              <span>Rarity: {rarityOptions.find(r => r.value === rarityFilter)?.label}</span>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setRarityFilter('')}
                className="p-0 h-4 w-4 hover:bg-secondary/30"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;