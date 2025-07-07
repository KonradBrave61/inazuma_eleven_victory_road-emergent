import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import FileUploadZone from './components/FileUploadZone';
import DataPreviewTable from './components/DataPreviewTable';
import ImportSummaryPanel from './components/ImportSummaryPanel';
import ImportProgressModal from './components/ImportProgressModal';
import ValidationResults from './components/ValidationResults';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataImportManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [columnMapping, setColumnMapping] = useState({});
  const [validationResults, setValidationResults] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('idle');
  const [currentStep, setCurrentStep] = useState(1);

  // Mock data for demonstration
  const mockImportStats = {
    successful: 4850,
    duplicates: 125,
    errors: 25
  };

  const mockImportHistory = [
    {
      id: 1,
      filename: "inazuma_characters_batch_1.xlsx",
      date: new Date(Date.now() - 86400000),
      status: "completed",
      recordsProcessed: 1250
    },
    {
      id: 2,
      filename: "character_updates_v2.csv",
      date: new Date(Date.now() - 172800000),
      status: "completed",
      recordsProcessed: 850
    },
    {
      id: 3,
      filename: "new_characters_season_3.xlsx",
      date: new Date(Date.now() - 259200000),
      status: "failed",
      recordsProcessed: 0
    },
    {
      id: 4,
      filename: "character_stats_update.csv",
      date: new Date(Date.now() - 345600000),
      status: "completed",
      recordsProcessed: 2100
    }
  ];

  const mockValidationResults = {
    valid: Array.from({ length: 485 }, (_, i) => ({ row: i + 1, characterName: `Character ${i + 1}` })),
    invalid: [
      { row: 15, characterName: "Endou Mamoru", error: "Invalid role value 'GKP'. Must be one of: FW, MF, DF, GK" },
      { row: 23, characterName: "", error: "Character name is required" },
      { row: 47, characterName: "Gouenji Shuuya", error: "Kick stat value '999' exceeds maximum allowed (100)" }
    ],
    warnings: [
      { row: 8, characterName: "Kidou Yuuto", warning: "Level not specified, defaulting to 1" },
      { row: 12, characterName: "Kazemaru Ichirouta", warning: "Some stat values are missing, will use default values" }
    ],
    summary: {
      totalRows: 500,
      validCharacters: 485,
      duplicateNames: 12,
      missingRequiredFields: 3
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    
    // Mock file parsing - in real implementation, use libraries like xlsx or papaparse
    const mockData = Array.from({ length: 500 }, (_, i) => [
      `Character ${i + 1}`,
      ['FW', 'MF', 'DF', 'GK'][Math.floor(Math.random() * 4)],
      ['Fire', 'Wind', 'Wood', 'Earth', 'Void'][Math.floor(Math.random() * 5)],
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      `Team Passive ${Math.floor(Math.random() * 5) + 1}`,
      `Team Passive ${Math.floor(Math.random() * 5) + 1}`,
      `Team Passive ${Math.floor(Math.random() * 5) + 1}`,
      `Team Passive ${Math.floor(Math.random() * 5) + 1}`,
      `Team Passive ${Math.floor(Math.random() * 5) + 1}`,
      `Hissatsu Technique ${Math.floor(Math.random() * 10) + 1}`
    ]);

    const mockColumns = [
      'Character Name', 'Role', 'Element', 'Level', 
      'Kick', 'Control', 'Technique', 'Intelligence', 
      'Pressure', 'Agility', 'Physical', 'Team Passive 1',
      'Team Passive 2', 'Team Passive 3', 'Team Passive 4',
      'Team Passive 5', 'Hissatsu'
    ];

    setFileData({
      data: mockData,
      columns: mockColumns
    });

    // Auto-detect column mapping
    const autoMapping = {
      name: 0,
      role: 1,
      element: 2,
      level: 3,
      kick: 4,
      control: 5,
      technique: 6,
      intelligence: 7,
      pressure: 8,
      agility: 9,
      physical: 10,
      teamPassive1: 11,
      teamPassive2: 12,
      teamPassive3: 13,
      teamPassive4: 14,
      teamPassive5: 15,
      hissatsu: 16
    };
    setColumnMapping(autoMapping);
  };

  const handleColumnMapping = (fieldKey, columnIndex) => {
    setColumnMapping(prev => ({
      ...prev,
      [fieldKey]: columnIndex
    }));
  };

  const handleValidateData = () => {
    // Mock validation process
    setValidationResults(mockValidationResults);
  };

  const handleStartImport = () => {
    setIsImporting(true);
    setImportStatus('processing');
    setImportProgress(0);
    setCurrentStep(1);

    // Simulate import process
    const totalSteps = 6;
    let progress = 0;
    let step = 1;

    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= step * (100 / totalSteps)) {
        step++;
        setCurrentStep(step);
      }
      
      setImportProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(interval);
        setImportStatus('completed');
        setIsImporting(false);
      }
    }, 500);
  };

  const handleRollback = (importId) => {
    console.log('Rolling back import:', importId);
    // Implement rollback logic
  };

  const handleDownloadErrors = () => {
    // Mock download error report
    console.log('Downloading error report...');
  };

  const handleCloseProgressModal = () => {
    setIsImporting(false);
    setImportStatus('idle');
    setImportProgress(0);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Database" size={32} className="text-primary" />
            <h1 className="text-3xl font-heading-bold text-text-primary">
              Data Import Management
            </h1>
          </div>
          <p className="text-text-secondary">
            Upload and manage character data through Excel/CSV file integration for the Inazuma Eleven database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload Section */}
            <div className="bg-card rounded-lg p-6 gaming-shadow">
              <h2 className="text-xl font-heading-semibold text-text-primary mb-6">
                Upload Character Data
              </h2>
              <FileUploadZone
                onFileSelect={handleFileSelect}
                acceptedFiles={['.xlsx', '.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']}
                maxSize={50 * 1024 * 1024} // 50MB
              />
              
              {selectedFile && (
                <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-success" />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{selectedFile.name}</p>
                      <p className="text-sm text-text-secondary">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded successfully
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => {
                        setSelectedFile(null);
                        setFileData(null);
                        setValidationResults(null);
                        setColumnMapping({});
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Data Preview and Mapping */}
            {fileData && (
              <DataPreviewTable
                data={fileData.data}
                columns={fileData.columns}
                onColumnMapping={handleColumnMapping}
                columnMapping={columnMapping}
              />
            )}

            {/* Validation and Import Actions */}
            {fileData && !validationResults && (
              <div className="bg-card rounded-lg p-6 gaming-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-heading-semibold text-text-primary">
                      Ready to Validate
                    </h3>
                    <p className="text-text-secondary">
                      Review your column mapping and validate the data before importing.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    iconName="CheckCircle"
                    onClick={handleValidateData}
                  >
                    Validate Data
                  </Button>
                </div>
              </div>
            )}

            {/* Validation Results */}
            {validationResults && (
              <ValidationResults
                validationResults={validationResults}
                onStartImport={handleStartImport}
                onDownloadErrors={handleDownloadErrors}
              />
            )}
          </div>

          {/* Right Panel - Summary and History */}
          <div className="lg:col-span-1">
            <ImportSummaryPanel
              importStats={mockImportStats}
              importHistory={mockImportHistory}
              onRollback={handleRollback}
            />
          </div>
        </div>
      </div>

      {/* Import Progress Modal */}
      <ImportProgressModal
        isOpen={isImporting}
        onClose={handleCloseProgressModal}
        progress={importProgress}
        status={importStatus}
        currentStep={currentStep}
        totalSteps={6}
        errors={[]}
      />
    </div>
  );
};

export default DataImportManagement;