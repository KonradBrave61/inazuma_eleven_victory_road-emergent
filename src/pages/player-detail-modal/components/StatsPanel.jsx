import React from 'react';
import Icon from '../../../components/AppIcon';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const StatsPanel = ({ player }) => {
  const statIcons = {
    'Kick': 'Zap',
    'Control': 'Target',
    'Technique': 'Sparkles',
    'Intelligence': 'Brain',
    'Pressure': 'Shield',
    'Agility': 'Wind',
    'Physical': 'Dumbbell'
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'FW': return '#EF4444'; // red-500
      case 'MF': return '#F97316'; // orange-500
      case 'DF': return '#60A5FA'; // blue-400
      case 'GK': return '#FFFFFF'; // white
      default: return '#9CA3AF'; // gray-400
    }
  };

  const radarData = Object.entries(player.stats || {}).map(([key, value]) => ({
    stat: key,
    value: typeof value === 'object' ? value.main || value : value,
    fullMark: 100
  })).filter(item => item.stat !== 'secondary');

  return (
    <div className="space-y-6">
      {/* Stats List */}
      <div className="space-y-3">
        <h3 className="text-lg font-heading-bold text-text-primary mb-4">Player Statistics</h3>
        {Object.entries(player.stats || {}).map(([statName, statValue]) => {
          if (statName === 'secondary') return null;
          
          const mainValue = typeof statValue === 'object' ? statValue.main || statValue : statValue;
          const secondaryValue = typeof statValue === 'object' && statValue.secondary 
            ? statValue.secondary 
            : (player.stats?.secondary?.[statName] || mainValue);
          
          return (
            <div key={statName} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icon name={statIcons[statName]} size={18} className="text-primary" />
                </div>
                <span className="font-body-medium text-text-primary">{statName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-heading-bold text-text-primary">{mainValue}</span>
                <span className="text-sm text-text-secondary">({secondaryValue})</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Radar Chart */}
      <div className="bg-surface/30 rounded-lg p-4 border border-border">
        <h4 className="text-sm font-body-bold text-text-primary mb-4 text-center">Stats Visualization</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis 
                dataKey="stat" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                tickCount={5}
              />
              <Radar
                name="Stats"
                dataKey="value"
                stroke={getRoleColor(player.role)}
                fill={getRoleColor(player.role)}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;