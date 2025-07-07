import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPreviewTable = ({ data, columns, onColumnMapping, columnMapping }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const requiredFields = [
    { key: 'name', label: 'Character Name', required: true },
    { key: 'role', label: 'Role (FW/MF/DF/GK)', required: true },
    { key: 'element', label: 'Element', required: true },
    { key: 'level', label: 'Level', required: false },
    { key: 'kick', label: 'Kick Stat', required: false },
    { key: 'control', label: 'Control Stat', required: false },
    { key: 'technique', label: 'Technique Stat', required: false },
    { key: 'intelligence', label: 'Intelligence Stat', required: false },
    { key: 'pressure', label: 'Pressure Stat', required: false },
    { key: 'agility', label: 'Agility Stat', required: false },
    { key: 'physical', label: 'Physical Stat', required: false },
    { key: 'teamPassive1', label: 'Team Passive 1', required: false },
    { key: 'teamPassive2', label: 'Team Passive 2', required: false },
    { key: 'teamPassive3', label: 'Team Passive 3', required: false },
    { key: 'teamPassive4', label: 'Team Passive 4', required: false },
    { key: 'teamPassive5', label: 'Team Passive 5', required: false },
    { key: 'hissatsu', label: 'Techniques "Hissatsu"', required: false }
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleColumnMappingChange = (fieldKey, columnIndex) => {
    onColumnMapping(fieldKey, columnIndex);
  };

  const getValidationStatus = (fieldKey) => {
    const mappedColumn = columnMapping[fieldKey];
    if (mappedColumn === undefined || mappedColumn === null) {
      return requiredFields.find(f => f.key === fieldKey)?.required ? 'error' : 'warning';
    }
    return 'success';
  };

  const getValidationIcon = (status) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} className="text-warning" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Column Mapping Section */}
      <div className="bg-card rounded-lg p-6 gaming-shadow">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
          Column Mapping
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requiredFields.map((field) => {
            const status = getValidationStatus(field.key);
            return (
              <div key={field.key} className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-text-primary">
                  {getValidationIcon(status)}
                  <span>{field.label}</span>
                  {field.required && <span className="text-error">*</span>}
                </label>
                <select
                  value={columnMapping[field.key] || ''}
                  onChange={(e) => handleColumnMappingChange(field.key, e.target.value === '' ? null : parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-input-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="">Select column...</option>
                  {columns.map((column, index) => (
                    <option key={index} value={index}>
                      Column {index + 1}: {column}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Preview Table */}
      <div className="bg-card rounded-lg gaming-shadow overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading-semibold text-text-primary">
              Data Preview ({data.length} rows)
            </h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>Showing first 10 rows</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Row
                </th>
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Column {index + 1}
                    <div className="text-text-primary font-normal normal-case mt-1 truncate max-w-32">
                      {column}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentData.map((row, rowIndex) => (
                <tr key={startIndex + rowIndex} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm text-text-secondary font-mono">
                    {startIndex + rowIndex + 1}
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-sm text-text-primary max-w-48">
                      <div className="truncate" title={cell}>
                        {cell || <span className="text-muted-foreground italic">empty</span>}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} rows
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              <span className="text-sm text-text-primary">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPreviewTable;