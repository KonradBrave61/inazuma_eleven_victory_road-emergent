import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 animate-pulse">
      {/* Portrait Skeleton */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted"></div>
        
        {/* Role Badge Skeleton */}
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-muted"></div>

        {/* Level Badge Skeleton */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-muted rounded-full w-12 h-6"></div>
      </div>

      {/* Character Info Skeleton */}
      <div className="text-center mb-3 space-y-2">
        <div className="h-4 bg-muted rounded mx-auto w-3/4"></div>
        <div className="h-3 bg-muted rounded mx-auto w-1/2"></div>
        <div className="h-5 bg-muted rounded-full mx-auto w-16"></div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="flex space-x-2">
        <div className="flex-1 h-8 bg-muted rounded"></div>
        <div className="flex-1 h-8 bg-muted rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;