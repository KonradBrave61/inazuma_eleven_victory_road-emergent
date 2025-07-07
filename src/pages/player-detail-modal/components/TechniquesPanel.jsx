import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TechniquesPanel = ({ player, onTechniqueChange }) => {
  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState(null);
  const [showTechniquesList, setShowTechniquesList] = useState(false);

  const availableTechniques = [
    { id: 1, name: "Lightning Strike", color: "bg-yellow-500", description: "Quick offensive play with high speed" },
    { id: 2, name: "Iron Defense", color: "bg-blue-500", description: "Solid defensive formation" },
    { id: 3, name: "Fire Storm", color: "bg-red-500", description: "Aggressive attacking strategy" },
    { id: 4, name: "Wind Barrier", color: "bg-green-500", description: "Balanced midfield control" },
    { id: 5, name: "Earth Shake", color: "bg-orange-500", description: "Powerful ground-based techniques" },
    { id: 6, name: "Ice Wall", color: "bg-cyan-500", description: "Defensive counter-attack style" }
  ];

  const handleTechniqueClick = (index) => {
    setSelectedTechniqueIndex(index);
    setShowTechniquesList(true);
  };

  const handleTechniqueSelect = (technique) => {
    if (selectedTechniqueIndex !== null && onTechniqueChange) {
      onTechniqueChange(selectedTechniqueIndex, technique);
    }
    setShowTechniquesList(false);
    setSelectedTechniqueIndex(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading-bold text-text-primary">Techniques</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {player.techniques?.map((technique, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border cursor-pointer gaming-transition hover:gaming-shadow"
            style={{ backgroundColor: `${technique.color}20` }}
            onClick={() => handleTechniqueClick(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-4 h-4 rounded-full ${technique.color}`}
                  style={{ backgroundColor: technique.color.replace('bg-', '').replace('-500', '') }}
                />
                <div>
                  <h4 className="font-body-bold text-text-primary">{technique.name}</h4>
                  <p className="text-sm text-text-secondary">{technique.description}</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </div>
          </div>
        ))}
      </div>

      {/* Techniques Selection Modal */}
      {showTechniquesList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading-bold text-text-primary">Select Technique</h3>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setShowTechniquesList(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-2">
              {availableTechniques.map((technique) => (
                <div
                  key={technique.id}
                  className="p-3 rounded-lg border border-border cursor-pointer gaming-transition hover:gaming-shadow"
                  style={{ backgroundColor: `${technique.color}20` }}
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${technique.color}`} />
                    <div className="flex-1">
                      <h4 className="font-body-medium text-text-primary">{technique.name}</h4>
                      <p className="text-xs text-text-secondary">{technique.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechniquesPanel;