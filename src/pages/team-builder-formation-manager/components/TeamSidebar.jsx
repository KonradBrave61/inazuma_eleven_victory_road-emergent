import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamSidebar = ({ team, isOpen, onToggle, teamStats }) => {
  const getRarityColor = (rarity) => {
    const colors = {
      'Common': 'text-gray-400',
      'Rare': 'text-blue-400',
      'Epic': 'text-purple-400',
      'Legendary': 'text-orange-400'
    };
    return colors[rarity] || 'text-gray-400';
  };

  return (
    <>
      {/* Toggle button */}
      <Button
        variant="primary"
        onClick={onToggle}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 rounded-full p-0 md:hidden"
      >
        <Icon name={isOpen ? "ChevronRight" : "ChevronLeft"} size={20} />
      </Button>

      {/* Sidebar */}
      <div className={`fixed md:relative right-0 top-0 h-full w-80 bg-surface border-l border-border gaming-shadow-lg transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Team Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading text-text-primary">Team Overview</h3>
              <Button
                variant="ghost"
                onClick={onToggle}
                className="md:hidden p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Players:</span>
                <span className="text-text-primary font-medium">{team.players.length}/11</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Avg Level:</span>
                <span className="text-text-primary font-medium">
                  {team.players.length > 0 
                    ? Math.round(team.players.reduce((sum, p) => sum + p.level, 0) / team.players.length)
                    : 0
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Team Rating:</span>
                <span className="text-primary font-bold">{teamStats.overallRating}</span>
              </div>
            </div>
          </div>

          {/* Team Statistics */}
          <div className="mb-6">
            <h3 className="text-lg font-heading text-text-primary mb-4">Team Stats</h3>
            <div className="space-y-3">
              {Object.entries(teamStats.stats).map(([stat, value]) => (
                <div key={stat} className="flex justify-between items-center">
                  <span className="text-text-secondary capitalize">{stat}:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full gaming-transition"
                        style={{ width: `${(value / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-text-primary font-medium w-8 text-right">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formation Analysis */}
          <div className="mb-6">
            <h3 className="text-lg font-heading text-text-primary mb-4">Formation Analysis</h3>
            <div className="bg-card rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Attack:</span>
                <span className="text-red-400 font-medium">{teamStats.formationStats.attack}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Midfield:</span>
                <span className="text-orange-400 font-medium">{teamStats.formationStats.midfield}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Defense:</span>
                <span className="text-blue-400 font-medium">{teamStats.formationStats.defense}%</span>
              </div>
            </div>
          </div>

          {/* Player List */}
          <div>
            <h3 className="text-lg font-heading text-text-primary mb-4">Squad List</h3>
            <div className="space-y-2">
              {team.players.map((player) => (
                <div key={player.id} className="bg-card rounded-lg p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                    {player.role}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {player.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Lv. {player.level} • <span className={getRarityColor(player.rarity)}>{player.rarity}</span>
                    </div>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {player.position}
                  </div>
                </div>
              ))}
              
              {team.players.length === 0 && (
                <div className="text-center py-8 text-text-secondary">
                  <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No players added yet</p>
                  <p className="text-xs">Start building your team!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
};

export default TeamSidebar;