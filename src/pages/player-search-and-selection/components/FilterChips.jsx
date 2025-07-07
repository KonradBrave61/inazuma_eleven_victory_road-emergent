import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const elementIcons = {
    Fire: 'Flame',
    Air: 'Wind',
    Earth: 'Mountain',
    Wood: 'TreePine',
    Void: 'Circle'
  };

  const roleColors = {
    FW: 'text-red-400 bg-red-900/20 border-red-700',
    MF: 'text-orange-400 bg-orange-900/20 border-orange-700',
    DF: 'text-blue-400 bg-blue-900/20 border-blue-700',
    GK: 'text-gray-300 bg-gray-800/20 border-gray-600'
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter !== null && filter !== ''
  );

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-surface border-b border-border">
      <span className="text-sm text-text-secondary font-medium">Active Filters:</span>
      
      {/* Role Filters */}
      {activeFilters.roles?.map(role => (
        <div
          key={role}
          className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${roleColors[role] || 'text-text-primary bg-muted border-border'}`}
        >
          <span>{role}</span>
          <button
            onClick={() => onRemoveFilter('roles', role)}
            className="hover:opacity-70 gaming-transition"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}

      {/* Element Filters */}
      {activeFilters.elements?.map(element => (
        <div
          key={element}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-muted text-text-primary text-sm font-medium"
        >
          <Icon name={elementIcons[element] || 'Circle'} size={14} />
          <span>{element}</span>
          <button
            onClick={() => onRemoveFilter('elements', element)}
            className="hover:opacity-70 gaming-transition"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}

      {/* Level Range Filter */}
      {activeFilters.levelRange && (
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-muted text-text-primary text-sm font-medium">
          <Icon name="TrendingUp" size={14} />
          <span>Lv. {activeFilters.levelRange.min}-{activeFilters.levelRange.max}</span>
          <button
            onClick={() => onRemoveFilter('levelRange')}
            className="hover:opacity-70 gaming-transition"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      )}

      {/* Clear All Button */}
      <button
        onClick={onClearAll}
        className="inline-flex items-center space-x-1 px-3 py-1 rounded-full border border-error bg-error/10 text-error text-sm font-medium hover:bg-error/20 gaming-transition ml-2"
      >
        <Icon name="Trash2" size={14} />
        <span>Clear All</span>
      </button>
    </div>
  );
};

export default FilterChips;