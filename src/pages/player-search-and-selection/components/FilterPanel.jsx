import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const roles = ['FW', 'MF', 'DF', 'GK'];
  const elements = ['Fire', 'Air', 'Earth', 'Wood', 'Void'];
  const levelRanges = [
    { label: '1-20', min: 1, max: 20 },
    { label: '21-40', min: 21, max: 40 },
    { label: '41-60', min: 41, max: 60 },
    { label: '61-80', min: 61, max: 80 },
    { label: '81-100', min: 81, max: 100 }
  ];

  const roleColors = {
    FW: 'text-red-400 bg-red-900/20 border-red-700',
    MF: 'text-orange-400 bg-orange-900/20 border-orange-700',
    DF: 'text-blue-400 bg-blue-900/20 border-blue-700',
    GK: 'text-gray-300 bg-gray-800/20 border-gray-600'
  };

  const elementIcons = {
    Fire: 'Flame',
    Air: 'Wind',
    Earth: 'Mountain',
    Wood: 'TreePine',
    Void: 'Circle'
  };

  const handleRoleToggle = (role) => {
    const newRoles = localFilters.roles.includes(role)
      ? localFilters.roles.filter(r => r !== role)
      : [...localFilters.roles, role];
    
    setLocalFilters(prev => ({ ...prev, roles: newRoles }));
  };

  const handleElementToggle = (element) => {
    const newElements = localFilters.elements.includes(element)
      ? localFilters.elements.filter(e => e !== element)
      : [...localFilters.elements, element];
    
    setLocalFilters(prev => ({ ...prev, elements: newElements }));
  };

  const handleLevelRangeSelect = (range) => {
    setLocalFilters(prev => ({ 
      ...prev, 
      levelRange: prev.levelRange?.min === range.min && prev.levelRange?.max === range.max 
        ? null 
        : range 
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      roles: [],
      elements: [],
      levelRange: null
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-surface border-l border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading text-text-primary">Filters</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded gaming-transition"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Role Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Role</h4>
          <div className="grid grid-cols-2 gap-2">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => handleRoleToggle(role)}
                className={`p-3 rounded-lg border text-sm font-medium gaming-transition ${
                  localFilters.roles.includes(role)
                    ? roleColors[role]
                    : 'border-border bg-card text-text-secondary hover:bg-muted'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Element Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Element</h4>
          <div className="space-y-2">
            {elements.map(element => (
              <button
                key={element}
                onClick={() => handleElementToggle(element)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border text-sm font-medium gaming-transition ${
                  localFilters.elements.includes(element)
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-text-secondary hover:bg-muted'
                }`}
              >
                <Icon name={elementIcons[element]} size={16} />
                <span>{element}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Level Range</h4>
          <div className="space-y-2">
            {levelRanges.map(range => (
              <button
                key={range.label}
                onClick={() => handleLevelRangeSelect(range)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border text-sm font-medium gaming-transition ${
                  localFilters.levelRange?.min === range.min && localFilters.levelRange?.max === range.max
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-text-secondary hover:bg-muted'
                }`}
              >
                <Icon name="TrendingUp" size={16} />
                <span>Lv. {range.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="primary"
          onClick={handleApplyFilters}
          className="w-full"
        >
          Apply Filters
        </Button>
        <Button
          variant="ghost"
          onClick={handleClearFilters}
          className="w-full"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;