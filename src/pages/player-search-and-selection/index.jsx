import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import PlayerCard from './components/PlayerCard';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import SkeletonCard from './components/SkeletonCard';
import EmptyState from './components/EmptyState';

const PlayerSearchAndSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  
  const [filters, setFilters] = useState({
    roles: [],
    elements: [],
    levelRange: null
  });

  // Mock player data
  const mockPlayers = [
    {
      id: 1,
      name: "Endou Mamoru",
      nickname: "The Legendary Goalkeeper",
      role: "GK",
      level: 99,
      rarity: "Legendary",
      element: "Earth",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Gouenji Shuuya",
      nickname: "Flame Striker",
      role: "FW",
      level: 95,
      rarity: "Legendary",
      element: "Fire",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Kidou Yuuto",
      nickname: "Field Commander",
      role: "MF",
      level: 92,
      rarity: "Epic",
      element: "Air",
      portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Kazemaru Ichirouta",
      nickname: "Wind Runner",
      role: "DF",
      level: 88,
      rarity: "Epic",
      element: "Air",
      portrait: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Fubuki Shirou",
      nickname: "Blizzard",
      role: "FW",
      level: 90,
      rarity: "Epic",
      element: "Air",
      portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Sakuma Jirou",
      nickname: "Emperor Penguin",
      role: "MF",
      level: 85,
      rarity: "Rare",
      element: "Air",
      portrait: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Someoka Ryuugo",
      nickname: "Dragon Drive",
      role: "FW",
      level: 82,
      rarity: "Rare",
      element: "Fire",
      portrait: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Kabeyama Heigorou",
      nickname: "The Wall",
      role: "DF",
      level: 80,
      rarity: "Rare",
      element: "Earth",
      portrait: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 9,
      name: "Tsunami Jousuke",
      nickname: "Wave Master",
      role: "DF",
      level: 87,
      rarity: "Epic",
      element: "Water",
      portrait: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 10,
      name: "Hiroto Kiyama",
      nickname: "Gran",
      role: "FW",
      level: 93,
      rarity: "Legendary",
      element: "Fire",
      portrait: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 11,
      name: "Midorikawa Ryuuji",
      nickname: "Reize",
      role: "MF",
      level: 89,
      rarity: "Epic",
      element: "Wood",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 12,
      name: "Nagumo Haruya",
      nickname: "Burn",
      role: "FW",
      level: 91,
      rarity: "Epic",
      element: "Fire",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 13,
      name: "Suzuno Fuusuke",
      nickname: "Gazel",
      role: "DF",
      level: 86,
      rarity: "Rare",
      element: "Air",
      portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 14,
      name: "Natsumi Raimon",
      nickname: "Manager",
      role: "MF",
      level: 75,
      rarity: "Common",
      element: "Void",
      portrait: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 15,
      name: "Tachimukai Yuuki",
      nickname: "Mukatsu",
      role: "GK",
      level: 84,
      rarity: "Rare",
      element: "Earth",
      portrait: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Generate search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const suggestions = new Set();
    mockPlayers.forEach(player => {
      if (player.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(player.name);
      }
      if (player.role.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(player.role);
      }
      if (player.element && player.element.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(player.element);
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm, mockPlayers]);

  // Filter and sort players
  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = mockPlayers;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (player.element && player.element.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply role filter
    if (filters.roles.length > 0) {
      filtered = filtered.filter(player => filters.roles.includes(player.role));
    }

    // Apply element filter
    if (filters.elements.length > 0) {
      filtered = filtered.filter(player => 
        player.element && filters.elements.includes(player.element)
      );
    }

    // Apply level range filter
    if (filters.levelRange) {
      filtered = filtered.filter(player => 
        player.level >= filters.levelRange.min && player.level <= filters.levelRange.max
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'level-desc':
          return b.level - a.level;
        case 'level-asc':
          return a.level - b.level;
        case 'role-asc':
          return a.role.localeCompare(b.role);
        case 'rarity-desc':
          const rarityOrder = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
          return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockPlayers, searchTerm, filters, sortBy]);

  // Handle search with loading simulation
  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Handle filter removal
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'levelRange') {
      setFilters(prev => ({ ...prev, levelRange: null }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].filter(item => item !== value)
      }));
    }
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      roles: [],
      elements: [],
      levelRange: null
    });
  };

  // Handle add to team
  const handleAddToTeam = (player, position) => {
    setSelectedPlayers(prev => [...prev, { ...player, position }]);
    // You could also navigate to team builder or show a success message
    console.log(`Added ${player.name} to team at position ${position}`);
  };

  // Handle close
  const handleClose = () => {
    navigate(-1);
  };

  // Check if we have active filters
  const hasActiveFilters = filters.roles.length > 0 || 
                          filters.elements.length > 0 || 
                          filters.levelRange !== null;

  // Check if it's mobile view
  const isMobile = window.innerWidth < 768;

  return (
    <div className={`${isMobile ? 'fixed inset-0 z-50' : 'fixed inset-0 z-50'} bg-background`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-lg gaming-transition"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-primary" />
            </button>
            <div>
              <h1 className="text-xl font-heading text-text-primary">
                Player Search & Selection
              </h1>
              <p className="text-sm text-text-secondary">
                Find and add players to your team
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              iconName="Filter"
              iconSize={18}
              className="hidden md:flex"
            >
              Filters
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="md:hidden p-2"
            >
              <Icon name="Filter" size={20} />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            suggestions={searchSuggestions}
          />
        </div>
      </div>

      <div className="flex h-full">
        {/* Main Content */}
        <div className={`flex-1 overflow-hidden ${showFilterPanel ? 'mr-80' : ''}`}>
          {/* Filter Chips */}
          <FilterChips
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Sort and Results Count */}
          <div className="p-4 border-b border-border">
            <SortDropdown
              currentSort={sortBy}
              onSortChange={setSortBy}
              resultsCount={filteredAndSortedPlayers.length}
            />
          </div>

          {/* Results Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredAndSortedPlayers.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredAndSortedPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onAddToTeam={handleAddToTeam}
                    isSelected={selectedPlayers.some(p => p.id === player.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                searchTerm={searchTerm}
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearAllFilters}
                onClearSearch={() => handleSearch('')}
              />
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-surface border-l border-border z-20">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilterPanel(false)}
            />
          </div>
        )}
      </div>

      {/* Mobile Filter Overlay */}
      {showFilterPanel && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setShowFilterPanel(false)}
        />
      )}
    </div>
  );
};

export default PlayerSearchAndSelection;