import { races } from '@/lib/data/races';
import Link from 'next/link';
import Sparkline from '@/components/Sparkline';

export default function Home() {
  const tossupCount = races.filter(r => r.status === 'Toss-up').length;
  const avgTurnout = Math.round(races.reduce((acc, r) => acc + r.turnoutProjection, 0) / races.length);

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 fade-in">
        {/* Header */}
        <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/40 sticky top-0 z-50 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-2 leading-tight" style={{ fontFamily: 'var(--font-fraunces)' }}>
              2026 Political Race Intelligence
            </h1>
            <p className="text-lg text-secondary-gray font-medium">Real-time analysis • Polling trajectories • Strategic insights for Gregory Curtis</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="flex items-start justify-between mb-3">
                <div className="text-xs font-bold text-secondary-gray uppercase tracking-wider letter-spacing-wide">
                  Competitive Contests
                </div>
                <Sparkline data={[12, 14, 13, 15, 14, 16, races.length]} color="#1E3A5F" className="w-16 h-8" />
              </div>
              <div className="text-4xl font-bold text-navy mb-1 tabular-nums" style={{ fontFamily: 'var(--font-fraunces)' }}>
                {races.length}
              </div>
              <p className="text-sm text-secondary-gray">races under active surveillance</p>
            </div>
            
            <div className="glass-card p-6 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="flex items-start justify-between mb-3">
                <div className="text-xs font-bold text-secondary-gray uppercase tracking-wider">
                  Too Close to Call
                </div>
                <Sparkline data={[4, 5, 4, 6, 5, 6, tossupCount]} color="#DC2626" className="w-16 h-8" />
              </div>
              <div className="text-4xl font-bold text-crimson mb-1 tabular-nums" style={{ fontFamily: 'var(--font-fraunces)' }}>
                {tossupCount}
              </div>
              <p className="text-sm text-secondary-gray">within margin of error</p>
            </div>
            
            <div className="glass-card p-6 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="flex items-start justify-between mb-3">
                <div className="text-xs font-bold text-secondary-gray uppercase tracking-wider">
                  Voter Engagement
                </div>
                <Sparkline data={[62, 64, 63, 65, 64, 66, avgTurnout]} color="#0891b2" className="w-16 h-8" />
              </div>
              <div className="text-4xl font-bold text-navy mb-1 tabular-nums" style={{ fontFamily: 'var(--font-fraunces)' }}>
                {avgTurnout}%
              </div>
              <p className="text-sm text-secondary-gray">average projected turnout</p>
            </div>
          </div>

          {/* Race Cards */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: 'var(--font-fraunces)' }}>
              Competitive Races
            </h2>
            
            {races.length === 0 ? (
              <div className="glass-card p-16 text-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-navy/10 to-crimson/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-navy/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-fraunces)' }}>
                    No Active Contests
                  </h3>
                  <p className="text-base text-secondary-gray mb-2 leading-relaxed">
                    Intelligence gathering in progress. Competitive races will surface here as polling data confirms tight margins.
                  </p>
                  <p className="text-sm text-secondary-gray/70">
                    Monitoring 435 House seats • 34 Senate races • 36 gubernatorial contests
                  </p>
                </div>
              </div>
            ) : (
              races.map((race) => {
                const latestPoll = race.polls[0];
                const candidates = race.candidates;
                const leader = candidates.reduce((prev, current) => 
                  (latestPoll.results[current.id] > latestPoll.results[prev.id]) ? current : prev
                );
                
                return (
                  <div key={race.id} className="glass-card overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all duration-200 relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
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
                              className="flex gap-4 p-5 rounded-xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all duration-200 relative overflow-hidden group"
                            >
                              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                              <div 
                                className="w-1.5 rounded-full flex-shrink-0 shadow-sm"
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
