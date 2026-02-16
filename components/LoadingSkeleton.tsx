export function RaceCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden transition-all duration-200 relative animate-pulse">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="h-8 bg-navy/10 rounded-lg mb-3 w-3/4" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-5 bg-gray-200/60 rounded w-24" />
              <div className="h-4 w-1 bg-gray-200/60 rounded-full" />
              <div className="h-6 bg-crimson/10 rounded-full w-20" />
              <div className="h-4 w-1 bg-gray-200/60 rounded-full" />
              <div className="h-5 bg-gray-200/60 rounded w-32" />
            </div>
          </div>
          <div className="h-12 bg-navy/10 rounded-xl w-32" />
        </div>

        {/* Candidates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {[1, 2].map((i) => (
            <div 
              key={i}
              className="flex gap-4 p-5 rounded-xl bg-white/40 border border-gray-200/50 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="w-1.5 rounded-full flex-shrink-0 bg-gray-200/60 h-24" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="h-6 bg-navy/10 rounded-lg mb-2 w-2/3" />
                    <div className="h-4 bg-gray-200/60 rounded w-1/2" />
                  </div>
                  <div className="h-10 bg-navy/10 rounded-lg w-16" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-200/60 rounded w-full" />
                  <div className="h-4 bg-gray-200/60 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Poll Metadata */}
        <div className="pt-4 border-t border-gray-200/50">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200/60 rounded w-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="glass-card p-6 relative overflow-hidden animate-pulse">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="h-3 bg-gray-200/60 rounded w-2/3 mb-3" />
      <div className="h-10 bg-navy/10 rounded-lg mb-2 w-20" />
      <div className="h-4 bg-gray-200/60 rounded w-3/4" />
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 fade-in">
        {/* Header Skeleton */}
        <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/40 sticky top-0 z-50 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-12 bg-navy/10 rounded-lg mb-2 w-96 animate-pulse" />
            <div className="h-5 bg-gray-200/60 rounded w-64 animate-pulse" />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Metrics Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>

          {/* Race Cards Skeleton */}
          <div className="space-y-8">
            <div className="h-8 bg-navy/10 rounded-lg mb-6 w-64 animate-pulse" />
            <RaceCardSkeleton />
            <RaceCardSkeleton />
          </div>
        </main>
      </div>
    </div>
  );
}
