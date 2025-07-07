import React from 'react';
import Icon from '../../../components/AppIcon';

const FormationSelector = ({ currentFormation, onFormationChange, formations }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <Icon name="Target" size={20} className="text-primary" />
        <span className="font-heading text-text-primary">Formation:</span>
      </div>
      <select
        value={currentFormation}
        onChange={(e) => onFormationChange(e.target.value)}
        className="bg-surface border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary gaming-transition"
      >
        {formations.map((formation) => (
          <option key={formation.id} value={formation.id}>
            {formation.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormationSelector;