import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import CharacterGalleryDashboard from "pages/character-gallery-dashboard";
import TeamBuilderFormationManager from "pages/team-builder-formation-manager";
import PlayerDetailModal from "pages/player-detail-modal";
import DataImportManagement from "pages/data-import-management";
import PlayerSearchAndSelection from "pages/player-search-and-selection";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CharacterGalleryDashboard />} />
        <Route path="/character-gallery-dashboard" element={<CharacterGalleryDashboard />} />
        <Route path="/team-builder-formation-manager" element={<TeamBuilderFormationManager />} />
        <Route path="/player-detail-modal" element={<PlayerDetailModal />} />
        <Route path="/data-import-management" element={<DataImportManagement />} />
        <Route path="/player-search-and-selection" element={<PlayerSearchAndSelection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;