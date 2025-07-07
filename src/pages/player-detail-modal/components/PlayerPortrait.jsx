import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PlayerPortrait = ({ player, onLevelChange }) => {
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [tempLevel, setTempLevel] = useState(player.level);

  const getElementColor = (element) => {
    switch (element) {
      case 'Fire': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Wind': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'Wood': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'Earth': return 'text-orange-600 bg-orange-600/10 border-orange-600/30';
      case 'Void': return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const handleLevelSubmit = (e) => {
    e.preventDefault();
    const newLevel = Math.max(1, Math.min(100, parseInt(tempLevel) || 1));
    setTempLevel(newLevel);
    onLevelChange?.(newLevel);
    setIsEditingLevel(false);
  };

  const handleLevelCancel = () => {
    setTempLevel(player.level);
    setIsEditingLevel(false);
  };

  return (
    <div className="space-y-6">
      {/* Portrait */}
      <div className="relative">
        <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-border gaming-shadow">
          <Image
            src={player.portrait}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Element Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-body-bold border ${getElementColor(player.element)}`}>
          {player.element}
        </div>
      </div>

      {/* Player Info */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-heading-bold text-text-primary">{player.name}</h2>
          <p className="text-text-secondary font-body-medium">{player.nickname}</p>
        </div>

        {/* Level Control */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-body-medium text-text-secondary">Level:</span>
            {isEditingLevel ? (
              <form onSubmit={handleLevelSubmit} className="flex items-center space-x-2">
                <input
                  type="number"
                  value={tempLevel}
                  onChange={(e) => setTempLevel(e.target.value)}
                  min="1"
                  max="100"
                  className="w-16 px-2 py-1 text-sm bg-input border border-border rounded text-center focus:ring-2 focus:ring-ring"
                  autoFocus
                />
                <Button variant="ghost" size="sm" type="submit">
                  <Icon name="Check" size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLevelCancel}>
                  <Icon name="X" size={16} />
                </Button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingLevel(true)}
                className="text-lg font-heading-bold text-primary hover:text-primary/80 transition-colors"
              >
                {player.level}
              </button>
            )}
          </div>
        </div>

        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-surface/50 rounded-lg border border-border">
            <p className="text-sm text-text-secondary">Role</p>
            <p className="text-lg font-heading-bold text-text-primary">{player.role}</p>
          </div>
          <div className="p-3 bg-surface/50 rounded-lg border border-border">
            <p className="text-sm text-text-secondary">Jersey</p>
            <p className="text-lg font-heading-bold text-text-primary">#{player.jerseyNumber}</p>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-surface/30 rounded-lg border border-border">
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {player.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerPortrait;