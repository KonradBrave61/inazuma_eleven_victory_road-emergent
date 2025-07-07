import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CharacterGrid from './components/CharacterGrid';
import FilterBar from './components/FilterBar';
import StatsDisplay from './components/StatsDisplay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CharacterGalleryDashboard = () => {
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  
  // State Management
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [roleFilter, setRoleFilter] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');
  
  const charactersPerPage = 24;

  // Mock Data - 5200+ Characters
  const mockCharacters = Array.from({ length: 5200 }, (_, index) => {
    const roles = ['FW', 'MF', 'DF', 'GK'];
    const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
    const elements = ['Fire', 'Air', 'Earth', 'Wood', 'Void'];
    
    const names = [
      "Endou Mamoru", "Kidou Yuuto", "Gouenji Shuuya", "Kazemaru Ichirouta", "Someoka Ryuugo",
      "Kabeyama Heigorou", "Kurimatsu Teppei", "Shourinji Ayumu", "Shishido Sakichi", "Handa Shinichi",
      "Matsuno Kuusuke", "Megane Kakeru", "Tsunami Jousuke", "Fubuki Shirou", "Hiroto Kiyama",
      "Midorikawa Ryuuji", "Nagumo Haruya", "Suzuno Fuusuke", "Burn Griffey", "Gazelle Suzuki",
      "Aphrodi", "Terumi Afuro", "Sakuma Jirou", "Genda Koujirou", "Ichinose Kazuya",
      "Domon Asuka", "Aki Kitsune", "Touko Zaizen", "Natsumi Raimon", "Haruna Otonashi",
      "Fuyuka Kudou", "Rika Ullr", "Tobitaka Seiya", "Toramaru Utsunomiya", "Rococo Urupa",
      "Edgar Valtinas", "Desarm Bale", "Garshield Bayhan", "Demonio Strada", "Nero Stola",
      "Beluga Bale", "Gianluca Zanardi", "Paolo Bianchi", "Davide Bale", "Sor Bale",
      "Fideo Aldena", "Zagomel Bagu", "Baddap Sleed", "Reize Bale", "Chaos Break"
    ];
    
    const nicknames = [
      "The Legendary Keeper", "Field Commander", "Flame Striker", "Wind Warrior", "Dragon Force",
      "The Wall", "Steady Defender", "Silent Guardian", "Beast Tackler", "Iron Defense",
      "Speed Demon", "Tactical Genius", "Wave Master", "Blizzard Lord", "Sun God",
      "Forest Guardian", "Explosive Power", "Ice Emperor", "Fire Dragon", "Lightning Beast",
      "Divine Striker", "Heaven\'s Arrow", "Shadow Master", "Steel Keeper", "Ocean Prince",
      "Thunder Goddess", "Swift Fox", "Crystal Princess", "Melody Maker", "Gentle Breeze",
      "Ice Queen", "Northern Star", "Sky Soarer", "Tiger Striker", "Miracle Keeper",
      "Dark Knight", "Storm Bringer", "Shield Bearer", "Demon Lord", "Black Panther",
      "White Whale", "Golden Eagle", "Silver Wolf", "Crimson Lion", "Azure Dragon"
    ];

    const role = roles[index % roles.length];
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const element = elements[Math.floor(Math.random() * elements.length)];
    const name = names[index % names.length] + (index > names.length ? ` ${Math.floor(index / names.length) + 1}` : '');
    const nickname = nicknames[index % nicknames.length];
    
    // Level based on rarity
    const levelRanges = {
      'Common': [1, 40],
      'Rare': [20, 60],
      'Epic': [40, 80],
      'Legendary': [60, 100]
    };
    const [minLevel, maxLevel] = levelRanges[rarity];
    const level = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
    
    // Stats based on rarity and level
    const baseStats = {
      'Common': 50,
      'Rare': 70,
      'Epic': 85,
      'Legendary': 95
    };
    const baseStat = baseStats[rarity];
    const levelMultiplier = level / 100;
    
    return {
      id: index + 1,
      name,
      nickname,
      role,
      rarity,
      element,
      level,
      jerseyNumber: (index % 99) + 1,
      portrait: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${(index % 99) + 1}.jpg`,
      stats: {
        kick: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30)),
        control: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30)),
        technique: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30)),
        intelligence: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30)),
        pressure: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30)),
        agility: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30)),
        physical: Math.floor(baseStat + (Math.random() * 20 - 10) + (levelMultiplier * 30))
      },
      equipment: [
        { id: 1, name: "Lightning Boots", type: "boots", rarity: "Epic" },
        { id: 2, name: "Power Gloves", type: "gloves", rarity: "Rare" },
        { id: 3, name: "Speed Jersey", type: "jersey", rarity: "Common" },
        { id: 4, name: "Focus Headband", type: "accessory", rarity: "Legendary" }
      ],
      teamPassives: role === 'GK' ? [] : [
        { name: "Team Spirit", description: "Boost team morale", percentage: 15, color: "text-green-400" },
        { name: "Formation Sync", description: "Enhanced positioning", percentage: 12, color: "text-blue-400" },
        { name: "Combo Attack", description: "Chain skill bonus", percentage: 18, color: "text-red-400" }
      ],
      tactics: [
        { name: "Offensive Play", color: "bg-red-500" },
        { name: "Defensive Wall", color: "bg-blue-500" },
        { name: "Counter Attack", color: "bg-green-500" }
      ]
    };
  });

  // Initialize characters
  useEffect(() => {
    const timer = setTimeout(() => {
      setCharacters(mockCharacters);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort characters
  useEffect(() => {
    let filtered = [...characters];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.nickname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter) {
      filtered = filtered.filter(character => character.role === roleFilter);
    }

    // Apply rarity filter
    if (rarityFilter) {
      filtered = filtered.filter(character => character.rarity === rarityFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'level':
          aValue = a.level;
          bValue = b.level;
          break;
        case 'rarity':
          const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
          aValue = rarityOrder[a.rarity];
          bValue = rarityOrder[b.rarity];
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCharacters(filtered);
    setCurrentPage(1);
  }, [characters, searchQuery, roleFilter, rarityFilter, sortBy, sortOrder]);

  // Update displayed characters based on pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * charactersPerPage;
    const newDisplayed = filteredCharacters.slice(startIndex, endIndex);
    
    setDisplayedCharacters(newDisplayed);
    setHasMore(endIndex < filteredCharacters.length);
  }, [filteredCharacters, currentPage]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Handle search from global header
  useEffect(() => {
    const handleSearch = (event) => {
      if (event.detail && event.detail.query !== undefined) {
        setSearchQuery(event.detail.query);
      }
    };

    window.addEventListener('globalSearch', handleSearch);
    return () => window.removeEventListener('globalSearch', handleSearch);
  }, []);

  // Event Handlers
  const handleViewDetails = useCallback((character) => {
    navigate('/player-detail-modal', { state: { character } });
  }, [navigate]);

  const handleAddToTeam = useCallback((character) => {
    // Add to team logic - for now just show notification
    console.log('Adding to team:', character.name);
    // You could dispatch to Redux store or show a toast notification here
  }, []);

  const handleClearFilters = useCallback(() => {
    setSortBy('name');
    setSortOrder('asc');
    setRoleFilter('');
    setRarityFilter('');
    setSearchQuery('');
  }, []);

  const handlePullToRefresh = useCallback(() => {
    setLoading(true);
    setCurrentPage(1);
    
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Character Gallery
              </h1>
              <p className="text-text-secondary">
                Discover and recruit from over 5,200 Inazuma Eleven characters
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={handlePullToRefresh}
                iconName="RotateCcw"
                iconSize={16}
                disabled={loading}
              >
                Refresh
              </Button>
              
              <Button
                variant="primary"
                onClick={() => navigate('/team-builder-formation-manager')}
                iconName="Users"
                iconSize={16}
              >
                Team Builder
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Display */}
        <StatsDisplay
          totalCharacters={characters.length}
          filteredCount={filteredCharacters.length}
          currentPage={currentPage}
          charactersPerPage={charactersPerPage}
        />

        {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          rarityFilter={rarityFilter}
          setRarityFilter={setRarityFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Character Grid */}
        <CharacterGrid
          characters={displayedCharacters}
          loading={loading}
          onViewDetails={handleViewDetails}
          onAddToTeam={handleAddToTeam}
          hasMore={hasMore}
          loadMoreRef={loadMoreRef}
        />

        {/* Quick Actions FAB */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
          <Button
            variant="primary"
            shape="circle"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="gaming-shadow-lg"
          >
            <Icon name="ArrowUp" size={24} />
          </Button>
          
          <Button
            variant="secondary"
            shape="circle"
            size="lg"
            onClick={() => navigate('/data-import-management')}
            className="gaming-shadow-lg"
          >
            <Icon name="Upload" size={24} />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CharacterGalleryDashboard;