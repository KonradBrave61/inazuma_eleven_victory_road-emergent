import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlayerHeader = ({ player, onClose, onPrevious, onNext, hasPrevious, hasNext }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case 'FW': return 'text-red-500';
      case 'MF': return 'text-orange-500';
      case 'DF': return 'text-blue-400';
      case 'GK': return 'text-white';
      default: return 'text-text-secondary';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'FW': return 'Target';
      case 'MF': return 'Zap';
      case 'DF': return 'Shield';
      case 'GK': return 'Hand';
      default: return 'User';
    }
  };

  const getRarityBadge = (rarity) => {
    const rarityColors = {
      'Common': 'bg-gray-600 text-gray-200',
      'Rare': 'bg-blue-600 text-blue-200',
      'Epic': 'bg-purple-600 text-purple-200',
      'Legendary': 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
    };
    return rarityColors[rarity] || 'bg-gray-600 text-gray-200';
  };

  return (
    <div className={`relative p-6 border-b border-border ${player.rarity === 'Legendary' ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20' : 'bg-surface'}`}>
      {/* Legendary Hex Pattern Background */}
      {player.rarity === 'Legendary' && (
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      )}

      {/* Close Button */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4 p-2 z-10"
        onClick={onClose}
      >
        <Icon name="X" size={20} />
      </Button>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 z-10"
        onClick={onPrevious}
        disabled={!hasPrevious}
      >
        <Icon name="ChevronLeft" size={24} />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 z-10"
        onClick={onNext}
        disabled={!hasNext}
      >
        <Icon name="ChevronRight" size={24} />
      </Button>

      {/* Header Content */}
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className={`p-2 rounded-lg bg-surface/50 ${getRoleColor(player.role)}`}>
            <Icon name={getRoleIcon(player.role)} size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-heading-bold text-text-primary">{player.name}</h1>
            {player.nickname && (
              <p className="text-sm text-text-secondary font-body-medium">"{player.nickname}"</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Jersey:</span>
            <span className="text-lg font-heading-bold text-text-primary">#{player.jerseyNumber}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Level:</span>
            <span className="text-lg font-heading-bold text-text-primary">Lv. {player.level}</span>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-body-bold ${getRarityBadge(player.rarity)}`}>
            {player.rarity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;