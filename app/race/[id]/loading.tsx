export default function RaceLoading() {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 fade-in">
        {/* Header Skeleton */}
        <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/40 sticky top-0 z-50 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="h-5 bg-navy/10 rounded-lg mb-4 w-48 animate-pulse" />
            <div className="h-10 bg-navy/10 rounded-lg mb-2 w-80 animate-pulse" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-5 bg-gray-200/60 rounded w-24 animate-pulse" />
              <div className="h-4 w-1 bg-gray-200/60 rounded-full animate-pulse" />
              <div className="h-6 bg-crimson/10 rounded-full w-20 animate-pulse" />
              <div className="h-4 w-1 bg-gray-200/60 rounded-full animate-pulse" />
              <div className="h-5 bg-gray-200/60 rounded w-32 animate-pulse" />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Polling Trajectory Skeleton */}
              <div className="glass-card p-8 relative overflow-hidden animate-pulse">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="h-8 bg-navy/10 rounded-lg mb-2 w-64" />
                <div className="h-4 bg-gray-200/60 rounded w-96 mb-6" />
                <div className="h-80 bg-gray-200/40 rounded-lg" />
              </div>

              {/* Candidate Profiles Skeleton */}
              <div className="glass-card p-8 relative overflow-hidden animate-pulse">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="h-8 bg-navy/10 rounded-lg mb-2 w-64" />
                <div className="h-4 bg-gray-200/60 rounded w-80 mb-6" />
                <div className="space-y-8">
                  {[1, 2].map((i) => (
                    <div 
                      key={i}
                      className="border-l-4 border-navy/20 pl-6 py-4 pr-6 rounded-r-xl bg-white/40"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="h-7 bg-navy/10 rounded-lg mb-1 w-48" />
                          <div className="h-4 bg-gray-200/60 rounded w-40" />
                        </div>
                        <div className="text-right">
                          <div className="h-10 bg-navy/10 rounded-lg w-20 mb-1" />
                          <div className="h-3 bg-gray-200/60 rounded w-16" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                        {[1, 2].map((j) => (
                          <div key={j}>
                            <div className="h-3 bg-gray-200/60 rounded w-24 mb-2" />
                            <div className="h-6 bg-navy/10 rounded-lg w-32 mb-1" />
                            <div className="h-4 bg-gray-200/60 rounded w-28" />
                          </div>
                        ))}
                      </div>
                      <div className="mb-4">
                        <div className="h-3 bg-gray-200/60 rounded w-20 mb-2" />
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3].map((k) => (
                            <div key={k} className="h-7 bg-navy/5 rounded-full w-24" />
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="h-3 bg-gray-200/60 rounded w-32 mb-2" />
                        <div className="h-4 bg-gray-200/60 rounded w-full" />
                      </div>
                      <div className="pt-4 border-t border-gray-200/50">
                        <div className="flex items-center gap-3">
                          <div className="h-3 bg-gray-200/60 rounded w-28" />
                          <div className="h-5 bg-navy/10 rounded w-12" />
                          <div className="h-4 bg-gray-200/60 rounded w-24" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Polls Skeleton */}
              <div className="glass-card p-8 relative overflow-hidden animate-pulse">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="h-8 bg-navy/10 rounded-lg mb-2 w-48" />
                <div className="h-4 bg-gray-200/60 rounded w-72 mb-6" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200/50 pb-4 last:border-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="h-5 bg-navy/10 rounded w-48" />
                        <div className="h-4 bg-gray-200/60 rounded w-32" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2].map((j) => (
                          <div key={j} className="flex items-center justify-between">
                            <div className="h-4 bg-gray-200/60 rounded w-32" />
                            <div className="h-5 bg-navy/10 rounded w-12" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1 space-y-8">
              {/* Key Metrics Skeleton */}
              <div className="glass-card p-6 relative overflow-hidden animate-pulse">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="h-7 bg-navy/10 rounded-lg mb-2 w-32" />
                <div className="h-3 bg-gray-200/60 rounded w-48 mb-6" />
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200/60 rounded w-32 mb-2" />
                      <div className="h-10 bg-navy/10 rounded-lg w-24" />
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Chat Skeleton */}
              <div className="glass-card p-6 relative overflow-hidden animate-pulse">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="h-7 bg-navy/10 rounded-lg mb-2 w-48" />
                <div className="h-3 bg-gray-200/60 rounded w-40 mb-4" />
                <div className="space-y-3">
                  <div className="h-32 bg-gray-200/40 rounded-lg" />
                  <div className="h-10 bg-navy/10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
