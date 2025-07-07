import React, { useState, useEffect, useRef } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, searchTerm, suggestions = [] }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          onSearch(suggestions[activeSuggestion]);
          setShowSuggestions(false);
          setActiveSuggestion(-1);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search characters by name, role, or element..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-4 py-3 bg-input border-border text-input-foreground placeholder-muted-foreground text-lg"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        {searchTerm && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-text-primary gaming-transition"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg gaming-shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-muted gaming-transition ${
                index === activeSuggestion ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-card-foreground">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;