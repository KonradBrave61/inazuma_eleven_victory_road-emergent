import React from 'react';
import CharacterCard from './CharacterCard';
import SkeletonCard from './SkeletonCard';

const CharacterGrid = ({ 
  characters, 
  loading, 
  onViewDetails, 
  onAddToTeam,
  hasMore,
  loadMoreRef 
}) => {
  return (
    <div className="space-y-6">
      {/* Character Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onViewDetails={onViewDetails}
            onAddToTeam={onAddToTeam}
          />
        ))}
        
        {/* Loading Skeleton Cards */}
        {loading && (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading more characters...</span>
          </div>
        </div>
      )}

      {/* No More Characters */}
      {!hasMore && characters.length > 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary text-sm">
            You've reached the end of the character roster!
          </p>
        </div>
      )}

      {/* No Characters Found */}
      {!loading && characters.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            No Characters Found
          </h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            Try adjusting your search terms or filters to find the characters you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;