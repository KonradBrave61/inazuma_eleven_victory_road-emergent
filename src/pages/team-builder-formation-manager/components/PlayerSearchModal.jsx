import React, { useState, useMemo } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PlayerSearchModal = ({ isOpen, onClose, onPlayerSelect, availablePlayers, selectedPosition }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredPlayers = useMemo(() => {
    let filtered = availablePlayers.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === '' || player.role === selectedRole;
      return matchesSearch && matchesRole;
    });

    // Sort players
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level - a.level;
        case 'rarity':
          const rarityOrder = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [availablePlayers, searchTerm, selectedRole, sortBy]);

  const getRoleColor = (role) => {
    const colors = {
      'GK': 'bg-white text-gray-800',
      'DF': 'bg-blue-400 text-white',
      'MF': 'bg-orange-500 text-white',
      'FW': 'bg-red-500 text-white'
    };
    return colors[role] || 'bg-gray-500 text-white';
  };

  const getRarityColor = (rarity) => {
    const colors = {
      'Common': 'border-gray-400',
      'Rare': 'border-blue-400',
      'Epic': 'border-purple-400',
      'Legendary': 'border-orange-400'
    };
    return colors[rarity] || 'border-gray-400';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col gaming-shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading text-text-primary">Select Player</h2>
            <p className="text-sm text-text-secondary">
              Choose a player for {selectedPosition?.name} position
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-input border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Roles</option>
                <option value="GK">Goalkeeper</option>
                <option value="DF">Defender</option>
                <option value="MF">Midfielder</option>
                <option value="FW">Forward</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-input border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="level">Sort by Level</option>
                <option value="rarity">Sort by Rarity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Player Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className={`bg-card rounded-lg p-4 cursor-pointer gaming-transition hover:gaming-shadow-lg border-2 ${getRarityColor(player.rarity)}`}
                onClick={() => onPlayerSelect(player)}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <Image
                      src={player.avatar}
                      alt={player.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRoleColor(player.role)}`}>
                      {player.role}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {player.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Lv. {player.level}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {player.rarity}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Zap" size={12} />
                    <span>{player.stats.kick}</span>
                    <Icon name="Target" size={12} />
                    <span>{player.stats.control}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-text-secondary">No players found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSearchModal;