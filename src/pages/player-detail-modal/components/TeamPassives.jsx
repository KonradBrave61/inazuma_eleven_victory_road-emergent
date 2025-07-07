import React from 'react';
import Icon from '../../../components/AppIcon';

const TeamPassives = ({ player }) => {
  const passiveIcons = {
    'Attack Boost': 'Sword',
    'Defense Wall': 'Shield',
    'Speed Rush': 'Zap',
    'Team Spirit': 'Heart',
    'Focus Mind': 'Brain'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading-bold text-text-primary">Team Passives</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {player.teamPassives?.map((passive, index) => (
          <div
            key={index}
            className="p-4 bg-surface/50 rounded-lg border border-border gaming-transition hover:gaming-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-primary/20 flex-shrink-0">
                <Icon 
                  name={passiveIcons[passive.name] || 'Star'} 
                  size={18} 
                  className="text-primary" 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-body-bold text-text-primary mb-2">
                  {passive.name}
                </h4>
                
                <p className="text-sm text-text-secondary leading-relaxed">
                  {passive.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPassives;