import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)', icon: 'ArrowUp' },
    { value: 'name-desc', label: 'Name (Z-A)', icon: 'ArrowDown' },
    { value: 'level-desc', label: 'Level (High to Low)', icon: 'TrendingUp' },
    { value: 'level-asc', label: 'Level (Low to High)', icon: 'TrendingDown' },
    { value: 'role-asc', label: 'Role (A-Z)', icon: 'Users' },
    { value: 'rarity-desc', label: 'Rarity (Legendary First)', icon: 'Star' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortOption = sortOptions.find(option => option.value === currentSort);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Results Count */}
      <div className="text-sm text-text-secondary">
        <span className="font-medium text-text-primary">{resultsCount}</span> characters found
      </div>

      {/* Sort Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted gaming-transition"
        >
          <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">
            {currentSortOption?.label || 'Sort by'}
          </span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-secondary" 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-card border border-border rounded-lg gaming-shadow-lg z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted gaming-transition ${
                  currentSort === option.value ? 'bg-primary/10 text-primary' : 'text-card-foreground'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;