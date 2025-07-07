import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlayerSlot = ({ 
  position, 
  player, 
  onPlayerSelect, 
  onPlayerRemove, 
  onPlayerSwap,
  onDragStart 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getRoleColor = (role) => {
    const colors = {
      'GK': 'bg-white text-gray-800',
      'DF': 'bg-blue-400 text-white',
      'MF': 'bg-orange-500 text-white',
      'FW': 'bg-red-500 text-white'
    };
    return colors[role] || 'bg-gray-500 text-white';
  };

  if (!player) {
    return (
      <div className="relative group">
        <Button
          variant="ghost"
          onClick={onPlayerSelect}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-white/50 hover:border-white hover:bg-white/10 gaming-transition flex items-center justify-center"
        >
          <Icon name="Plus" size={24} className="text-white" />
        </Button>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
          {position.name}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative group cursor-move"
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Player card */}
      <div className="bg-surface border-2 border-border rounded-lg p-2 gaming-shadow gaming-transition hover:gaming-shadow-lg">
        <div className="flex flex-col items-center space-y-1">
          <div className="relative">
            <Image
              src={player.avatar}
              alt={player.name}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white"
            />
            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRoleColor(player.role)}`}>
              {player.role}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-text-primary truncate max-w-16">
              {player.name}
            </div>
            <div className="text-xs text-text-secondary">
              Lv. {player.level}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {showActions && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <Button
            variant="primary"
            size="xs"
            onClick={onPlayerSelect}
            className="w-6 h-6 p-0 rounded-full"
          >
            <Icon name="Edit" size={12} />
          </Button>
          <Button
            variant="danger"
            size="xs"
            onClick={onPlayerRemove}
            className="w-6 h-6 p-0 rounded-full"
          >
            <Icon name="X" size={12} />
          </Button>
        </div>
      )}

      {/* Position label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-text-secondary font-medium">
        {position.name}
      </div>
    </div>
  );
};

export default PlayerSlot;