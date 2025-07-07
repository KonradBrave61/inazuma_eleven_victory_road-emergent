import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlayerCard = ({ player, onAddToTeam, isSelected = false }) => {
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);

  const roleColors = {
    FW: 'text-red-400 bg-red-900/20 border-red-700',
    MF: 'text-orange-400 bg-orange-900/20 border-orange-700',
    DF: 'text-blue-400 bg-blue-900/20 border-blue-700',
    GK: 'text-gray-300 bg-gray-800/20 border-gray-600'
  };

  const rarityColors = {
    Common: 'border-gray-500',
    Rare: 'border-blue-500',
    Epic: 'border-purple-500',
    Legendary: 'border-yellow-500'
  };

  const positions = [
    { value: 'GK', label: 'Goalkeeper' },
    { value: 'DF1', label: 'Left Back' },
    { value: 'DF2', label: 'Center Back' },
    { value: 'DF3', label: 'Right Back' },
    { value: 'MF1', label: 'Left Midfielder' },
    { value: 'MF2', label: 'Center Midfielder' },
    { value: 'MF3', label: 'Right Midfielder' },
    { value: 'FW1', label: 'Left Forward' },
    { value: 'FW2', label: 'Center Forward' },
    { value: 'FW3', label: 'Right Forward' },
    { value: 'SUB', label: 'Substitute' }
  ];

  const handleAddToTeam = (position) => {
    onAddToTeam(player, position);
    setShowPositionDropdown(false);
  };

  const isLegendary = player.rarity === 'Legendary';

  return (
    <div className={`relative bg-card border rounded-lg p-4 gaming-shadow gaming-hover ${
      isLegendary ? 'bg-gradient-to-br from-orange-900/20 to-orange-800/10' : ''
    } ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {/* Legendary Hex Pattern Background */}
      {isLegendary && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      )}

      <div className="relative z-10">
        {/* Character Portrait */}
        <div className="flex justify-center mb-3">
          <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${rarityColors[player.rarity] || 'border-gray-500'}`}>
            <Image
              src={player.portrait}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Character Info */}
        <div className="text-center mb-3">
          <h3 className="font-heading text-card-foreground text-sm font-semibold mb-1 truncate">
            {player.name}
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium border ${roleColors[player.role] || 'text-text-primary bg-muted border-border'}`}>
              {player.role}
            </span>
            <span className="text-xs text-text-secondary">
              Lv. {player.level}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Icon name="Star" size={12} className={`${player.rarity === 'Legendary' ? 'text-yellow-400' : 
              player.rarity === 'Epic' ? 'text-purple-400' : 
              player.rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className="text-xs text-text-secondary">{player.rarity}</span>
          </div>
        </div>

        {/* Element */}
        {player.element && (
          <div className="flex justify-center mb-3">
            <div className="flex items-center space-x-1 px-2 py-1 rounded bg-muted">
              <Icon 
                name={player.element === 'Fire' ? 'Flame' : 
                      player.element === 'Air' ? 'Wind' : 
                      player.element === 'Earth' ? 'Mountain' : 
                      player.element === 'Wood' ? 'TreePine' : 'Circle'} 
                size={12} 
                className="text-text-secondary" 
              />
              <span className="text-xs text-text-secondary">{player.element}</span>
            </div>
          </div>
        )}

        {/* Add to Team Button */}
        <div className="relative">
          <Button
            variant="primary"
            onClick={() => setShowPositionDropdown(!showPositionDropdown)}
            className="w-full text-xs py-2"
            iconName="Plus"
            iconSize={14}
          >
            Add to Team
          </Button>

          {/* Position Dropdown */}
          {showPositionDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg gaming-shadow-lg z-50 max-h-48 overflow-y-auto">
              {positions.map((position) => (
                <button
                  key={position.value}
                  onClick={() => handleAddToTeam(position.value)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-muted gaming-transition text-card-foreground"
                >
                  {position.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;