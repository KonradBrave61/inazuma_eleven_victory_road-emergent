import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EquipmentPanel = ({ player, onEquipmentChange }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const equipmentCategories = ['Boots', 'Bracelet', 'Pendant', 'Special'];

  const availableEquipment = [
    { id: 1, name: "Thunder Boots", type: "Boots", element: "Wind", stats: { Agility: 8, Technique: 4 }, icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" },
    { id: 2, name: "Speed Gloves", type: "Bracelet", element: "Wind", stats: { Control: 6, Agility: 5 }, icon: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=100&h=100&fit=crop" },
    { id: 3, name: "Power Jersey", type: "Special", element: "Fire", stats: { Kick: 10, Physical: 8 }, icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
    { id: 4, name: "Focus Headband", type: "Pendant", element: "Void", stats: { Intelligence: 7, Control: 3 }, icon: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop" },
    { id: 5, name: "Earth Boots", type: "Boots", element: "Earth", stats: { Physical: 9, Pressure: 6 }, icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" },
    { id: 6, name: "Wood Bracelet", type: "Bracelet", element: "Wood", stats: { Control: 8, Technique: 5 }, icon: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=100&h=100&fit=crop" }
  ];

  const getElementColor = (element) => {
    switch (element) {
      case 'Fire': return 'border-red-500 bg-red-500/10';
      case 'Wind': return 'border-blue-500 bg-blue-500/10';
      case 'Wood': return 'border-green-500 bg-green-500/10';
      case 'Earth': return 'border-orange-600 bg-orange-600/10';
      case 'Void': return 'border-purple-500 bg-purple-500/10';
      default: return 'border-border bg-surface/50';
    }
  };

  const handleSlotClick = (slotIndex) => {
    setSelectedSlot(slotIndex);
    setShowEquipmentList(true);
  };

  const handleEquipmentSelect = (equipment) => {
    if (selectedSlot !== null && onEquipmentChange) {
      onEquipmentChange(selectedSlot, equipment);
    }
    setShowEquipmentList(false);
    setSelectedSlot(null);
  };

  const filteredEquipment = selectedCategory === 'all' 
    ? availableEquipment 
    : availableEquipment.filter(eq => eq.type === selectedCategory);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading-bold text-text-primary">Equipment</h3>
      
      {/* Equipment Slots */}
      <div className="space-y-3">
        {player.equipment?.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border-2 cursor-pointer gaming-transition hover:gaming-shadow ${
              item ? getElementColor(item.element) : 'border-dashed border-border bg-surface/30 hover:bg-surface/50'
            }`}
            onClick={() => handleSlotClick(index)}
          >
            {item ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-body-bold text-text-primary">{item.name}</h4>
                  <p className="text-sm text-text-secondary capitalize">{item.type}</p>
                  <div className="text-xs text-text-secondary mt-1">
                    {Object.entries(item.stats || {}).map(([stat, value]) => (
                      <span key={stat} className="mr-2">+{value} {stat}</span>
                    ))}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-body-bold ${
                  item.element === 'Fire' ? 'bg-red-500 text-white' :
                  item.element === 'Wind' ? 'bg-blue-500 text-white' :
                  item.element === 'Wood' ? 'bg-green-500 text-white' :
                  item.element === 'Earth' ? 'bg-orange-600 text-white' :
                  item.element === 'Void' ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  {item.element}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-12 text-text-secondary">
                <Icon name="Plus" size={20} />
                <span className="ml-2 text-sm">Empty Slot</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Equipment Selection Modal */}
      {showEquipmentList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading-bold text-text-primary">Select Equipment</h3>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setShowEquipmentList(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </button>
                {equipmentCategories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredEquipment.map((equipment) => (
                <div
                  key={equipment.id}
                  className={`p-3 rounded-lg border cursor-pointer gaming-transition hover:gaming-shadow ${getElementColor(equipment.element)}`}
                  onClick={() => handleEquipmentSelect(equipment)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={equipment.icon}
                        alt={equipment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-body-medium text-text-primary">{equipment.name}</h4>
                      <p className="text-xs text-text-secondary capitalize">{equipment.type}</p>
                      <div className="text-xs text-text-secondary mt-1">
                        {Object.entries(equipment.stats || {}).map(([stat, value]) => (
                          <span key={stat} className="mr-2">+{value} {stat}</span>
                        ))}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-body-bold ${
                      equipment.element === 'Fire' ? 'bg-red-500 text-white' :
                      equipment.element === 'Wind' ? 'bg-blue-500 text-white' :
                      equipment.element === 'Wood' ? 'bg-green-500 text-white' :
                      equipment.element === 'Earth' ? 'bg-orange-600 text-white' :
                      equipment.element === 'Void' ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {equipment.element}
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

export default EquipmentPanel;