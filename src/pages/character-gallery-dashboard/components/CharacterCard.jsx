import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CharacterCard = ({ character, onViewDetails, onAddToTeam }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-500/20';
      case 'Epic': return 'border-purple-400 bg-gradient-to-br from-purple-400/20 to-pink-500/20';
      case 'Rare': return 'border-blue-400 bg-gradient-to-br from-blue-400/20 to-cyan-500/20';
      default: return 'border-gray-400 bg-gradient-to-br from-gray-400/20 to-gray-500/20';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'FW': return 'text-red-400 bg-red-400/20';
      case 'MF': return 'text-orange-400 bg-orange-400/20';
      case 'DF': return 'text-blue-400 bg-blue-400/20';
      case 'GK': return 'text-white bg-white/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div 
      className={`relative bg-card border-2 rounded-xl p-4 gaming-transition gaming-hover cursor-pointer ${getRarityColor(character.rarity)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(character)}
    >
      {/* Legendary Hex Pattern Background */}
      {character.rarity === 'Legendary' && (
        <div className="absolute inset-0 opacity-10 rounded-xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-500" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}>
          </div>
        </div>
      )}

      {/* Character Portrait */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-border gaming-shadow">
          <Image 
            src={character.portrait} 
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Role Badge */}
        <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getRoleColor(character.role)}`}>
          {character.role}
        </div>

        {/* Level Badge */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-surface border border-border rounded-full px-2 py-1 text-xs font-medium">
          Lv. {character.level}
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center mb-3">
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-1 truncate">
          {character.name}
        </h3>
        <p className="text-xs text-text-secondary truncate">
          #{character.jerseyNumber} • {character.nickname}
        </p>
        <div className="flex items-center justify-center mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(character.rarity)} border-0`}>
            {character.rarity}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="xs" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onAddToTeam(character);
          }}
        >
          <Icon name="Plus" size={14} />
        </Button>
        <Button 
          variant="primary" 
          size="xs" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(character);
          }}
        >
          <Icon name="Eye" size={14} />
        </Button>
      </div>

      {/* Desktop Hover Tooltip */}
      {isHovered && (
        <div className="hidden md:block absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-popover border border-border rounded-lg p-4 gaming-shadow-lg z-50 w-64">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
              <Image 
                src={character.portrait} 
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-text-primary">
                {character.name}
              </h4>
              <p className="text-xs text-text-secondary">
                {character.role} • Lv. {character.level}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(character.rarity)} border-0`}>
                {character.rarity}
              </span>
            </div>
          </div>
          
          {/* Key Stats */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Kick:</span>
              <span className="text-text-primary font-medium">{character.stats.kick}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Control:</span>
              <span className="text-text-primary font-medium">{character.stats.control}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Technique:</span>
              <span className="text-text-primary font-medium">{character.stats.technique}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;