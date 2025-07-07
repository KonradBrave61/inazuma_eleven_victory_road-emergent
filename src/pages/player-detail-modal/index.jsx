import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlayerHeader from './components/PlayerHeader';
import PlayerPortrait from './components/PlayerPortrait';
import StatsPanel from './components/StatsPanel';
import EquipmentPanel from './components/EquipmentPanel';
import TeamPassives from './components/TeamPassives';
import TechniquesPanel from './components/TechniquesPanel';

const PlayerDetailModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]);

  // Mock player data
  const mockPlayers = [
    {
      id: 1,
      name: "Endou Mamoru",
      nickname: "The Legendary Keeper",
      role: "GK",
      jerseyNumber: 1,
      level: 85,
      element: "Fire",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: `"I'll protect this goal with everything I've got! No ball will get past me!"\n\nEndou is known for his incredible determination and unique goalkeeping techniques. His passion for soccer and unwavering spirit inspire his entire team to push beyond their limits.`,
      baseStats: {
        Kick: 58,
        Control: 65,
        Technique: 72,
        Intelligence: 68,
        Pressure: 75,
        Agility: 62,
        Physical: 69
      },
      equipment: [
        { id: 1, name: "God Hand Gloves", type: "Bracelet", element: "Fire", stats: { Kick: 5, Control: 8, Technique: 10 }, icon: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=100&h=100&fit=crop" },
        { id: 2, name: "Keeper Jersey", type: "Special", element: "Earth", stats: { Physical: 12, Pressure: 8 }, icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
        null,
        { id: 3, name: "Focus Headband", type: "Pendant", element: "Wind", stats: { Intelligence: 6, Agility: 4 }, icon: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop" }
      ],
      teamPassives: [
        { name: "Defense Wall", description: "Increases team's defensive capabilities when Endou is in goal" },
        { name: "Team Spirit", description: "Boosts morale and performance of all team members" },
        { name: "Focus Mind", description: "Enhances concentration during critical moments" },
        { name: "Attack Boost", description: "Provides offensive support through precise throws" },
        { name: "Speed Rush", description: "Quick reflexes inspire faster team movements" }
      ],
      techniques: [
        { name: "God Hand", color: "bg-yellow-500", description: "Ultimate defensive technique with divine power" },
        { name: "Majin The Hand", color: "bg-purple-500", description: "Dark energy-based defensive move" },
        { name: "Fist of Justice", color: "bg-blue-500", description: "Righteous power that protects the goal" }
      ]
    },
    {
      id: 2,
      name: "Gouenji Shuuya",
      nickname: "Flame Striker",
      role: "FW",
      jerseyNumber: 10,
      level: 92,
      element: "Fire",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: `"My flames will burn through any defense!"\n\nGouenji is the ace striker known for his powerful fire-based shooting techniques. His cool demeanor hides a burning passion for victory and protecting his teammates.`,
      baseStats: {
        Kick: 78,
        Control: 65,
        Technique: 75,
        Intelligence: 70,
        Pressure: 58,
        Agility: 68,
        Physical: 72
      },
      equipment: [
        { id: 1, name: "Fire Boots", type: "Boots", element: "Fire", stats: { Kick: 15, Technique: 8 }, icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" },
        { id: 2, name: "Striker Jersey", type: "Special", element: "Fire", stats: { Kick: 10, Physical: 8 }, icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
        { id: 3, name: "Power Gloves", type: "Bracelet", element: "Earth", stats: { Physical: 6, Pressure: 4 }, icon: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=100&h=100&fit=crop" },
        null
      ],
      teamPassives: [
        { name: "Attack Boost", description: "Significantly increases team's offensive power" },
        { name: "Fire Spirit", description: "Ignites passion in teammates during matches" },
        { name: "Focus Mind", description: "Maintains composure under pressure" },
        { name: "Speed Rush", description: "Quick movements create scoring opportunities" },
        { name: "Team Spirit", description: "Leadership qualities inspire the team" }
      ],
      techniques: [
        { name: "Fire Tornado", color: "bg-red-500", description: "Devastating spinning fire shot" },
        { name: "Bakunetsu Screw", color: "bg-orange-500", description: "Explosive drilling fire technique" },
        { name: "Maximum Fire", color: "bg-yellow-500", description: "Ultimate fire-based finishing move" }
      ]
    },
    {
      id: 3,
      name: "Kidou Yuuto",
      nickname: "Field Commander",
      role: "MF",
      jerseyNumber: 14,
      level: 88,
      element: "Wind",
      portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      description: `"Strategy and tactics are the keys to victory."\n\nKidou is the tactical genius of the team, known for his incredible game reading abilities and strategic mind. His leadership on the field guides the team to victory.`,
      baseStats: {
        Kick: 62,
        Control: 74,
        Technique: 71,
        Intelligence: 78,
        Pressure: 65,
        Agility: 66,
        Physical: 59
      },
      equipment: [
        { id: 1, name: "Tactical Boots", type: "Boots", element: "Wind", stats: { Intelligence: 12, Control: 8 }, icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" },
        { id: 2, name: "Commander Jersey", type: "Special", element: "Wind", stats: { Intelligence: 10, Technique: 6 }, icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
        null,
        { id: 3, name: "Strategy Glasses", type: "Pendant", element: "Void", stats: { Intelligence: 8, Control: 4 }, icon: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop" }
      ],
      teamPassives: [
        { name: "Team Spirit", description: "Excellent leadership boosts team coordination" },
        { name: "Focus Mind", description: "Strategic thinking enhances team decision-making" },
        { name: "Attack Boost", description: "Creates scoring opportunities through precise passes" },
        { name: "Defense Wall", description: "Organizes defensive formations effectively" },
        { name: "Speed Rush", description: "Quick tactical adjustments surprise opponents" }
      ],
      techniques: [
        { name: "Twin Boost", color: "bg-blue-500", description: "Coordinated attack with perfect timing" },
        { name: "Illusion Ball", color: "bg-purple-500", description: "Deceptive technique that confuses opponents" },
        { name: "Emperor Penguin", color: "bg-cyan-500", description: "Ice-based tactical maneuver" }
      ]
    }
  ];

  // Calculate stats based on level and equipment
  const calculateStats = (player) => {
    const levelMultiplier = 1 + (player.level - 1) * 0.02; // 2% increase per level
    const calculatedStats = { ...player.baseStats };
    
    // Apply level scaling
    Object.keys(calculatedStats).forEach(stat => {
      calculatedStats[stat] = Math.round(calculatedStats[stat] * levelMultiplier);
    });
    
    // Apply equipment bonuses
    player.equipment?.forEach(equipment => {
      if (equipment?.stats) {
        Object.entries(equipment.stats).forEach(([stat, bonus]) => {
          if (calculatedStats[stat]) {
            calculatedStats[stat] += bonus;
          }
        });
      }
    });
    
    return {
      ...calculatedStats,
      // Add secondary stats (main + 3-5 bonus)
      secondary: Object.fromEntries(
        Object.entries(calculatedStats).map(([stat, value]) => [stat, value + Math.floor(Math.random() * 3) + 3])
      )
    };
  };

  useEffect(() => {
    const playersWithStats = mockPlayers.map(player => ({
      ...player,
      stats: calculateStats(player)
    }));
    setPlayers(playersWithStats);
    
    // Get player ID from URL params or location state
    const urlParams = new URLSearchParams(location.search);
    const playerId = urlParams.get('playerId') || location.state?.playerId;
    
    if (playerId) {
      const playerIndex = playersWithStats.findIndex(p => p.id === parseInt(playerId));
      if (playerIndex !== -1) {
        setCurrentPlayerIndex(playerIndex);
      }
    }
  }, [location]);

  const currentPlayer = players[currentPlayerIndex];

  const handleClose = () => {
    navigate('/character-gallery-dashboard');
  };

  const handlePrevious = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(currentPlayerIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const handleLevelChange = (newLevel) => {
    const updatedPlayers = [...players];
    const updatedPlayer = { ...updatedPlayers[currentPlayerIndex], level: newLevel };
    updatedPlayer.stats = calculateStats(updatedPlayer);
    updatedPlayers[currentPlayerIndex] = updatedPlayer;
    setPlayers(updatedPlayers);
  };

  const handleEquipmentChange = (slotIndex, equipment) => {
    const updatedPlayers = [...players];
    const updatedPlayer = { ...updatedPlayers[currentPlayerIndex] };
    updatedPlayer.equipment[slotIndex] = equipment;
    updatedPlayer.stats = calculateStats(updatedPlayer);
    updatedPlayers[currentPlayerIndex] = updatedPlayer;
    setPlayers(updatedPlayers);
  };

  const handleTechniqueChange = (techniqueIndex, technique) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].techniques[techniqueIndex] = technique;
    setPlayers(updatedPlayers);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!currentPlayer) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden gaming-shadow-lg">
        {/* Header */}
        <PlayerHeader
          player={currentPlayer}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentPlayerIndex > 0}
          hasNext={currentPlayerIndex < players.length - 1}
        />

        {/* Main Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Portrait & Description */}
            <div className="lg:col-span-1">
              <PlayerPortrait player={currentPlayer} onLevelChange={handleLevelChange} />
            </div>

            {/* Center Panel - Stats */}
            <div className="lg:col-span-1">
              <StatsPanel player={currentPlayer} />
            </div>

            {/* Right Panel - Equipment */}
            <div className="lg:col-span-1">
              <EquipmentPanel
                player={currentPlayer}
                onEquipmentChange={handleEquipmentChange}
              />
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Team Passives */}
            <div>
              <TeamPassives player={currentPlayer} />
            </div>

            {/* Techniques */}
            <div>
              <TechniquesPanel
                player={currentPlayer}
                onTechniqueChange={handleTechniqueChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailModal;