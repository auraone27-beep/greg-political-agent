import { races } from '@/lib/data/races';
import Link from 'next/link';

export default function Home() {
  const tossupCount = races.filter(r => r.status === 'Toss-up').length;
  const avgTurnout = Math.round(races.reduce((acc, r) => acc + r.turnoutProjection, 0) / races.length);

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 fade-in">
        {/* Header */}
        <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/40 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
              Political Race Agent
            </h1>
            <p className="text-lg text-secondary-gray">Race Intelligence Dashboard</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6">
              <div className="text-sm font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                Total Races Tracked
              </div>
              <div className="text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-fraunces)' }}>
                {races.length}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-sm font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                Toss-Up Races
              </div>
              <div className="text-4xl font-bold text-crimson" style={{ fontFamily: 'var(--font-fraunces)' }}>
                {tossupCount}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-sm font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                Avg. Projected Turnout
              </div>
              <div className="text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-fraunces)' }}>
                {avgTurnout}%
              </div>
            </div>
          </div>

          {/* Race Cards */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: 'var(--font-fraunces)' }}>
              Competitive Races
            </h2>
            
            {races.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="text-lg text-secondary-gray mb-2">No races currently tracked</p>
                <p className="text-sm text-secondary-gray">New races will appear here as they become competitive</p>
              </div>
            ) : (
              races.map((race) => {
                const latestPoll = race.polls[0];
                const candidates = race.candidates;
                const leader = candidates.reduce((prev, current) => 
                  (latestPoll.results[current.id] > latestPoll.results[prev.id]) ? current : prev
                );
                
                return (
                  <div key={race.id} className="glass-card overflow-hidden transition-all duration-200">
                    <div className="p-8">
                      {/* Race Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-fraunces)' }}>
                            {race.state} {race.district && `District ${race.district}`}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-medium text-secondary-gray">
                              {race.type}
                            </span>
                            <span className="text-secondary-gray">•</span>
                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                              race.status === 'Toss-up' 
                                ? 'bg-crimson/10 text-crimson' 
                                : race.status.includes('Lean') 
                                ? 'bg-navy/10 text-navy' 
                                : 'bg-gray-100 text-secondary-gray'
                            }`}>
                              {race.status}
                            </span>
                            <span className="text-secondary-gray">•</span>
                            <span className="text-sm text-secondary-gray">
                              {new Date(race.date).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                        <Link 
                          href={`/race/${race.id}`}
                          className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy/90 hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                          View Analysis
                        </Link>
                      </div>

                      {/* Candidates */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {candidates.map((candidate) => {
                          const pollResult = latestPoll.results[candidate.id];
                          const sentiment = race.sentiment.find(s => s.candidate === candidate.id);
                          
                          return (
                            <div 
                              key={candidate.id} 
                              className="flex gap-4 p-4 rounded-xl bg-white/40 border border-gray-200/50 hover:bg-white/60 transition-all duration-200"
                            >
                              <div 
                                className="w-1.5 rounded-full flex-shrink-0"
                                style={{ 
                                  backgroundColor: candidate.party === 'Democrat' ? '#1E3A5F' : 
                                                  candidate.party === 'Republican' ? '#DC2626' : '#6B7280' 
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-lg font-bold text-navy truncate" style={{ fontFamily: 'var(--font-fraunces)' }}>
                                      {candidate.name}
                                    </h4>
                                    <p className="text-sm text-secondary-gray">{candidate.currentPosition}</p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-fraunces)' }}>
                                      {pollResult}%
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2 text-secondary-gray">
                                    <span className="font-semibold text-navy">
                                      ${(candidate.fundraising.total / 1000000).toFixed(1)}M
                                    </span>
                                    <span>raised</span>
                                    <span>•</span>
                                    <span>{candidate.fundraising.donorCount.toLocaleString()} donors</span>
                                  </div>
                                  
                                  {sentiment && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-secondary-gray">Sentiment:</span>
                                      <span className="font-semibold text-navy">{sentiment.score}/100</span>
                                      <span className={`font-medium ${
                                        sentiment.trend === 'up' ? 'text-green-600' :
                                        sentiment.trend === 'down' ? 'text-red-600' :
                                        'text-secondary-gray'
                                      }`}>
                                        {sentiment.trend === 'up' ? '↑' :
                                         sentiment.trend === 'down' ? '↓' : '→'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Poll Metadata */}
                      <div className="pt-4 border-t border-gray-200/50">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary-gray">
                          <div>
                            <span className="font-medium text-navy">Latest:</span>{' '}
                            {latestPoll.pollster}
                          </div>
                          <span className="text-gray-300">•</span>
                          <div>
                            {new Date(latestPoll.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <span className="text-gray-300">•</span>
                          <div>n={latestPoll.sampleSize.toLocaleString()}</div>
                          <span className="text-gray-300">•</span>
                          <div>MoE ±{latestPoll.marginOfError}%</div>
                          <span className="text-gray-300">•</span>
                          <div>
                            <span className="font-medium text-navy">Turnout:</span>{' '}
                            {race.turnoutProjection}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
