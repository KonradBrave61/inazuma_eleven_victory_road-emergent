import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 gaming-shadow animate-pulse">
      {/* Portrait Skeleton */}
      <div className="flex justify-center mb-3">
        <div className="w-20 h-20 rounded-full bg-muted border-2 border-border"></div>
      </div>

      {/* Name Skeleton */}
      <div className="text-center mb-3">
        <div className="h-4 bg-muted rounded mb-2 mx-auto w-3/4"></div>
        
        {/* Role and Level Skeleton */}
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="h-6 bg-muted rounded w-12"></div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
        
        {/* Rarity Skeleton */}
        <div className="flex items-center justify-center space-x-1">
          <div className="w-3 h-3 bg-muted rounded"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
      </div>

      {/* Element Skeleton */}
      <div className="flex justify-center mb-3">
        <div className="h-6 bg-muted rounded w-16"></div>
      </div>

      {/* Button Skeleton */}
      <div className="h-8 bg-muted rounded w-full"></div>
    </div>
  );
};

export default SkeletonCard;