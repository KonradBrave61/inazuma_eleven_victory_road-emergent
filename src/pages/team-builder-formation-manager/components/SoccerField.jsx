import React from 'react';
import PlayerSlot from './PlayerSlot';

const SoccerField = ({ 
  formation, 
  players, 
  onPlayerSelect, 
  onPlayerRemove, 
  onPlayerSwap,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const getPositionStyle = (position) => {
    const positions = {
      // 4-4-2 Formation positions
      'GK': { left: '5%', top: '45%' },
      'LB': { left: '25%', top: '15%' },
      'CB1': { left: '25%', top: '35%' },
      'CB2': { left: '25%', top: '55%' },
      'RB': { left: '25%', top: '75%' },
      'LM': { left: '50%', top: '20%' },
      'CM1': { left: '50%', top: '40%' },
      'CM2': { left: '50%', top: '60%' },
      'RM': { left: '50%', top: '80%' },
      'ST1': { left: '75%', top: '35%' },
      'ST2': { left: '75%', top: '65%' },
      
      // 3-5-2 Formation positions (fixed center circle bug)
      'LCB': { left: '25%', top: '25%' },
      'CCB': { left: '25%', top: '50%' },
      'RCB': { left: '25%', top: '75%' },
      'LWM': { left: '50%', top: '10%' },
      'CDM': { left: '50%', top: '30%' },
      'CAM': { left: '50%', top: '70%' },
      'RWM': { left: '50%', top: '90%' },
    };
    
    return positions[position] || { left: '50%', top: '50%' };
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden gaming-shadow-lg">
      {/* Field markings */}
      <div className="absolute inset-0 opacity-30">
        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2"></div>
        {/* Goal areas */}
        <div className="absolute left-0 top-1/3 bottom-1/3 w-16 border-2 border-white border-l-0"></div>
        <div className="absolute right-0 top-1/3 bottom-1/3 w-16 border-2 border-white border-r-0"></div>
        {/* Penalty areas */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-24 border-2 border-white border-l-0"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-24 border-2 border-white border-r-0"></div>
      </div>

      {/* Player positions */}
      <div className="relative w-full h-96 md:h-[500px]">
        {formation.positions.map((position) => {
          const player = players.find(p => p.position === position.id);
          const style = getPositionStyle(position.id);
          
          return (
            <div
              key={position.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={style}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, position.id)}
            >
              <PlayerSlot
                position={position}
                player={player}
                onPlayerSelect={() => onPlayerSelect(position.id)}
                onPlayerRemove={() => onPlayerRemove(position.id)}
                onPlayerSwap={(targetPosition) => onPlayerSwap(position.id, targetPosition)}
                onDragStart={(e) => onDragStart(e, position.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SoccerField;