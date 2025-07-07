import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TeamManagementToolbar from './components/TeamManagementToolbar';
import FormationSelector from './components/FormationSelector';
import SoccerField from './components/SoccerField';
import TeamSidebar from './components/TeamSidebar';
import PlayerSearchModal from './components/PlayerSearchModal';

const TeamBuilderFormationManager = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlayerSearchOpen, setIsPlayerSearchOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentFormation, setCurrentFormation] = useState('4-4-2');
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [selectedTactics, setSelectedTactics] = useState([null, null, null]);

  // Mock formations data
  const formations = [
    {
      id: '4-4-2',
      name: '4-4-2 Classic',
      positions: [
        { id: 'GK', name: 'Goalkeeper', role: 'GK' },
        { id: 'LB', name: 'Left Back', role: 'DF' },
        { id: 'CB1', name: 'Center Back', role: 'DF' },
        { id: 'CB2', name: 'Center Back', role: 'DF' },
        { id: 'RB', name: 'Right Back', role: 'DF' },
        { id: 'LM', name: 'Left Mid', role: 'MF' },
        { id: 'CM1', name: 'Center Mid', role: 'MF' },
        { id: 'CM2', name: 'Center Mid', role: 'MF' },
        { id: 'RM', name: 'Right Mid', role: 'MF' },
        { id: 'ST1', name: 'Striker', role: 'FW' },
        { id: 'ST2', name: 'Striker', role: 'FW' }
      ]
    },
    {
      id: '3-5-2',
      name: '3-5-2 Attack',
      positions: [
        { id: 'GK', name: 'Goalkeeper', role: 'GK' },
        { id: 'LCB', name: 'Left CB', role: 'DF' },
        { id: 'CCB', name: 'Center CB', role: 'DF' },
        { id: 'RCB', name: 'Right CB', role: 'DF' },
        { id: 'LWM', name: 'Left Wing', role: 'MF' },
        { id: 'CDM', name: 'Def Mid', role: 'MF' },
        { id: 'CAM', name: 'Att Mid', role: 'MF' },
        { id: 'RWM', name: 'Right Wing', role: 'MF' },
        { id: 'ST1', name: 'Striker', role: 'FW' },
        { id: 'ST2', name: 'Striker', role: 'FW' }
      ]
    }
  ];

  // Mock available players data
  const availablePlayers = [
    {
      id: 1,
      name: "Endou Mamoru",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "GK",
      level: 85,
      element: "Fire",
      stats: { kick: 92, control: 88, technique: 85, intelligence: 90, pressure: 95, agility: 87, physical: 89 }
    },
    {
      id: 2,
      name: "Kidou Yuuto",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "MF",
      level: 82,
      element: "Wind",
      stats: { kick: 88, control: 94, technique: 96, intelligence: 98, pressure: 85, agility: 89, physical: 78 }
    },
    {
      id: 3,
      name: "Gouenji Shuuya",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "FW",
      level: 88,
      element: "Fire",
      stats: { kick: 98, control: 85, technique: 90, intelligence: 87, pressure: 89, agility: 92, physical: 94 }
    },
    {
      id: 4,
      name: "Kazemaru Ichirouta",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      role: "DF",
      level: 80,
      element: "Wood",
      stats: { kick: 78, control: 89, technique: 85, intelligence: 88, pressure: 92, agility: 96, physical: 82 }
    },
    {
      id: 5,
      name: "Someoka Ryuugo",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      role: "FW",
      level: 75,
      element: "Earth",
      stats: { kick: 89, control: 78, technique: 82, intelligence: 80, pressure: 85, agility: 83, physical: 91 }
    },
    {
      id: 6,
      name: "Kabeyama Heigorou",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      role: "DF",
      level: 72,
      element: "Earth",
      stats: { kick: 65, control: 70, technique: 68, intelligence: 75, pressure: 88, agility: 60, physical: 95 }
    },
    {
      id: 7,
      name: "Tsunami Jousuke",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      role: "DF",
      level: 78,
      element: "Wind",
      stats: { kick: 82, control: 86, technique: 88, intelligence: 85, pressure: 90, agility: 89, physical: 84 }
    },
    {
      id: 8,
      name: "Fubuki Shirou",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
      role: "FW",
      level: 86,
      element: "Void",
      stats: { kick: 95, control: 90, technique: 94, intelligence: 89, pressure: 87, agility: 93, physical: 85 }
    }
  ];

  // Mock tactics data
  const availableTactics = [
    { id: 1, name: "Counter Attack", description: "Quick counter-attacking strategy", color: "bg-red-500" },
    { id: 2, name: "Possession Play", description: "Control the ball and tempo", color: "bg-blue-500" },
    { id: 3, name: "High Press", description: "Aggressive pressing in opponent\'s half", color: "bg-orange-500" },
    { id: 4, name: "Wing Play", description: "Utilize the flanks for attacks", color: "bg-green-500" },
    { id: 5, name: "Defensive Wall", description: "Solid defensive formation", color: "bg-gray-500" },
    { id: 6, name: "Tiki-Taka", description: "Short passing and movement", color: "bg-yellow-500" }
  ];

  // Team state
  const [team, setTeam] = useState({
    name: "My Team",
    formation: '4-4-2',
    players: [],
    tactics: [null, null, null]
  });

  // Get current formation data
  const currentFormationData = formations.find(f => f.id === currentFormation);

  // Calculate team statistics
  const teamStats = {
    overallRating: team.players.length > 0 
      ? Math.round(team.players.reduce((sum, player) => {
          const avgStat = Object.values(player.stats).reduce((a, b) => a + b, 0) / 7;
          return sum + avgStat;
        }, 0) / team.players.length)
      : 0,
    stats: {
      kick: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.kick, 0) / team.players.length) : 0,
      control: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.control, 0) / team.players.length) : 0,
      technique: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.technique, 0) / team.players.length) : 0,
      intelligence: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.intelligence, 0) / team.players.length) : 0,
      pressure: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.pressure, 0) / team.players.length) : 0,
      agility: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.agility, 0) / team.players.length) : 0,
      physical: team.players.length > 0 ? Math.round(team.players.reduce((sum, p) => sum + p.stats.physical, 0) / team.players.length) : 0
    },
    formationStats: {
      attack: 75,
      midfield: 80,
      defense: 70
    }
  };

  // Handle formation change
  const handleFormationChange = (formationId) => {
    setCurrentFormation(formationId);
    setTeam(prev => ({
      ...prev,
      formation: formationId,
      players: prev.players.map(player => {
        const newFormation = formations.find(f => f.id === formationId);
        const positionExists = newFormation.positions.find(p => p.id === player.position);
        return positionExists ? player : { ...player, position: null };
      })
    }));
  };

  // Handle player selection
  const handlePlayerSelect = (positionId) => {
    const position = currentFormationData.positions.find(p => p.id === positionId);
    setSelectedPosition(position);
    setIsPlayerSearchOpen(true);
  };

  // Handle player selection from modal
  const handlePlayerSelectFromModal = (player) => {
    const newPlayer = {
      ...player,
      position: selectedPosition.id
    };
    
    setTeam(prev => ({
      ...prev,
      players: [
        ...prev.players.filter(p => p.position !== selectedPosition.id),
        newPlayer
      ]
    }));
    
    setIsPlayerSearchOpen(false);
    setSelectedPosition(null);
  };

  // Handle player removal
  const handlePlayerRemove = (positionId) => {
    setTeam(prev => ({
      ...prev,
      players: prev.players.filter(p => p.position !== positionId)
    }));
  };

  // Handle tactics selection
  const handleTacticSelect = (tacticIndex, tactic) => {
    setTeam(prev => ({
      ...prev,
      tactics: prev.tactics.map((t, index) => index === tacticIndex ? tactic : t)
    }));
  };

  // Handle drag and drop
  const handleDragStart = (e, positionId) => {
    const player = team.players.find(p => p.position === positionId);
    setDraggedPlayer(player);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPositionId) => {
    e.preventDefault();
    if (!draggedPlayer) return;

    const targetPlayer = team.players.find(p => p.position === targetPositionId);
    
    setTeam(prev => ({
      ...prev,
      players: prev.players.map(player => {
        if (player.id === draggedPlayer.id) {
          return { ...player, position: targetPositionId };
        }
        if (targetPlayer && player.id === targetPlayer.id) {
          return { ...player, position: draggedPlayer.position };
        }
        return player;
      })
    }));

    setDraggedPlayer(null);
  };

  // Toolbar handlers
  const handleSaveTeam = () => {
    localStorage.setItem('savedTeam', JSON.stringify(team));
    alert('Team saved successfully!');
  };

  const handleLoadTeam = () => {
    const savedTeam = localStorage.getItem('savedTeam');
    if (savedTeam) {
      const loadedTeam = JSON.parse(savedTeam);
      setTeam(loadedTeam);
      setCurrentFormation(loadedTeam.formation);
      setSelectedTactics(loadedTeam.tactics || [null, null, null]);
      alert('Team loaded successfully!');
    } else {
      alert('No saved team found!');
    }
  };

  const handleShareTeam = () => {
    const shareData = {
      formation: team.formation,
      players: team.players.map(p => ({ name: p.name, position: p.position, level: p.level })),
      tactics: team.tactics?.map(t => t?.name).filter(Boolean) || []
    };
    navigator.clipboard.writeText(JSON.stringify(shareData));
    alert('Team data copied to clipboard!');
  };

  const handleClearTeam = () => {
    if (confirm('Are you sure you want to clear all players?')) {
      setTeam(prev => ({ ...prev, players: [], tactics: [null, null, null] }));
      setSelectedTactics([null, null, null]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <TeamManagementToolbar
            onSave={handleSaveTeam}
            onLoad={handleLoadTeam}
            onShare={handleShareTeam}
            onClear={handleClearTeam}
          />

          <FormationSelector
            currentFormation={currentFormation}
            onFormationChange={handleFormationChange}
            formations={formations}
          />

          {/* Tactics Selection */}
          <div className="bg-card rounded-lg p-6 gaming-shadow mb-6">
            <h3 className="text-lg font-heading-bold text-text-primary mb-4">Tactics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map(tacticIndex => (
                <div key={tacticIndex} className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Tactic {tacticIndex + 1}
                  </label>
                  <select
                    value={team.tactics?.[tacticIndex]?.id || ''}
                    onChange={(e) => {
                      const selectedTactic = availableTactics.find(t => t.id === parseInt(e.target.value));
                      handleTacticSelect(tacticIndex, selectedTactic || null);
                    }}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-input-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="">Select tactic...</option>
                    {availableTactics.map(tactic => (
                      <option key={tactic.id} value={tactic.id}>
                        {tactic.name}
                      </option>
                    ))}
                  </select>
                  {team.tactics?.[tacticIndex] && (
                    <p className="text-xs text-text-secondary">
                      {team.tactics[tacticIndex].description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <SoccerField
            formation={currentFormationData}
            players={team.players}
            onPlayerSelect={handlePlayerSelect}
            onPlayerRemove={handlePlayerRemove}
            onPlayerSwap={() => {}}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </div>

        {/* Sidebar */}
        <TeamSidebar
          team={team}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          teamStats={teamStats}
        />
      </div>

      {/* Player Search Modal */}
      <PlayerSearchModal
        isOpen={isPlayerSearchOpen}
        onClose={() => {
          setIsPlayerSearchOpen(false);
          setSelectedPosition(null);
        }}
        onPlayerSelect={handlePlayerSelectFromModal}
        availablePlayers={availablePlayers}
        selectedPosition={selectedPosition}
      />
    </div>
  );
};

export default TeamBuilderFormationManager;