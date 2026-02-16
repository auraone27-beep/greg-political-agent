import { races } from '@/lib/data/races';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PollChart from '@/components/PollChart';
import AIChat from '@/components/AIChat';
import Sparkline from '@/components/Sparkline';

export function generateStaticParams() {
  return races.map((race) => ({
    id: race.id,
  }));
}

export default function RacePage({ params }: { params: { id: string } }) {
  const race = races.find(r => r.id === params.id);
  
  if (!race) {
    notFound();
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 fade-in">
        {/* Header */}
        <header className="border-b border-gray-200/50 backdrop-blur-sm bg-white/40 sticky top-0 z-50 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-semibold text-navy hover:text-crimson transition-colors duration-200 mb-4 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
              <span className="ml-2">Race Intelligence Dashboard</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
              {race.state} {race.district && `District ${race.district}`}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base text-secondary-gray font-medium">{race.type}</span>
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
                Election: {new Date(race.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Polling Trajectory */}
              <div className="glass-card p-8 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
                  Polling Trajectory
                </h2>
                <p className="text-sm text-secondary-gray mb-6">Historical trend analysis across all major pollsters</p>
                <PollChart race={race} />
              </div>

              {/* Candidate Profiles */}
              <div className="glass-card p-8 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
                  Candidate Profiles
                </h2>
                <p className="text-sm text-secondary-gray mb-6">Comprehensive intelligence on key contenders</p>
                <div className="space-y-8">
                  {race.candidates.map((candidate) => {
                    const sentiment = race.sentiment.find(s => s.candidate === candidate.id);
                    const latestPoll = race.polls[0].results[candidate.id];
                    
                    return (
                      <div 
                        key={candidate.id} 
                        className="border-l-4 pl-6 py-4 pr-6 rounded-r-xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all duration-200 relative overflow-hidden group"
                        style={{
                          borderLeftColor: candidate.party === 'Democrat' ? '#1E3A5F' : 
                                      candidate.party === 'Republican' ? '#DC2626' : '#6B7280'
                        }}
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-fraunces)' }}>
                              {candidate.name}
                            </h3>
                            <p className="text-sm font-medium text-secondary-gray">
                              {candidate.party} • {candidate.currentPosition}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-fraunces)' }}>
                              {latestPoll}%
                            </div>
                            <div className="text-xs text-secondary-gray">Latest poll</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                          <div>
                            <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                              Fundraising
                            </div>
                            <div className="text-lg font-bold text-navy">
                              ${(candidate.fundraising.total / 1000000).toFixed(1)}M total
                            </div>
                            <div className="text-sm text-secondary-gray">
                              ${(candidate.fundraising.lastQuarter / 1000000).toFixed(1)}M last quarter
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                              Donors
                            </div>
                            <div className="text-lg font-bold text-navy">
                              {candidate.fundraising.donorCount.toLocaleString()}
                            </div>
                            <div className="text-sm text-secondary-gray">
                              ${candidate.fundraising.averageDonation} average
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                            Key Issues
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {candidate.keyIssues.map((issue, idx) => (
                              <span 
                                key={idx} 
                                className="px-3 py-1 bg-navy/5 text-navy text-sm rounded-full font-medium hover:bg-navy/10 transition-colors duration-200"
                              >
                                {issue}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                            Endorsements ({candidate.endorsements.length})
                          </div>
                          <div className="text-sm text-secondary-gray">
                            {candidate.endorsements.slice(0, 3).join(', ')}
                            {candidate.endorsements.length > 3 && ` +${candidate.endorsements.length - 3} more`}
                          </div>
                        </div>

                        {sentiment && (
                          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200/50">
                            <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider">
                              Social Sentiment
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-bold text-navy">
                                {sentiment.score}/100
                              </span>
                              <span className={`text-sm font-semibold ${
                                sentiment.trend === 'up' ? 'text-green-600' :
                                sentiment.trend === 'down' ? 'text-red-600' :
                                'text-secondary-gray'
                              }`}>
                                {sentiment.trend === 'up' ? '↑ Trending up' :
                                 sentiment.trend === 'down' ? '↓ Trending down' : 
                                 '→ Stable'}
                              </span>
                              <span className="text-xs text-secondary-gray">
                                ({sentiment.sources.toLocaleString()} sources)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Polls */}
              <div className="glass-card p-8 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
                  Recent Polls
                </h2>
                <p className="text-sm text-secondary-gray mb-6">Latest survey data from credible pollsters</p>
                <div className="space-y-4">
                  {race.polls.map((poll, idx) => (
                    <div 
                      key={idx} 
                      className="border-b border-gray-200/50 pb-4 last:border-0 hover:bg-white/40 rounded-lg p-4 -m-4 transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <span className="font-semibold text-navy">{poll.pollster}</span>
                          <span className="mx-2 text-secondary-gray">•</span>
                          <span className="text-sm text-secondary-gray">
                            {new Date(poll.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-secondary-gray">
                          n={poll.sampleSize.toLocaleString()} • MoE ±{poll.marginOfError}%
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {race.candidates.map((candidate) => (
                          <div key={candidate.id} className="flex items-center justify-between">
                            <span className="text-sm text-secondary-gray">{candidate.name}</span>
                            <span className="text-base font-bold text-navy">
                              {poll.results[candidate.id]}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Key Metrics */}
              <div className="glass-card p-6 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <h2 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
                  Key Metrics
                </h2>
                <p className="text-xs text-secondary-gray mb-6 uppercase tracking-wider">Race fundamentals at a glance</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider">
                        Turnout Projection
                      </div>
                      <Sparkline data={[58, 60, 59, 62, 61, 64, race.turnoutProjection]} color="#1E3A5F" className="w-12 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-navy tabular-nums" style={{ fontFamily: 'var(--font-fraunces)' }}>
                      {race.turnoutProjection}%
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider">
                        Total Fundraising
                      </div>
                      <Sparkline data={[4.2, 4.8, 5.1, 5.6, 6.0, 6.5, (race.candidates.reduce((acc, c) => acc + c.fundraising.total, 0) / 1000000)]} color="#0891b2" className="w-12 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-navy tabular-nums" style={{ fontFamily: 'var(--font-fraunces)' }}>
                      ${(race.candidates.reduce((acc, c) => acc + c.fundraising.total, 0) / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-secondary-gray uppercase tracking-wider mb-2">
                      Key Issues
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {race.keyIssues.map((issue, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-crimson/10 text-crimson text-xs rounded-full font-semibold"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Strategy Assistant */}
              <div className="glass-card p-6 relative overflow-hidden hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005] transition-all">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <h2 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
                  AI Strategy Assistant
                </h2>
                <p className="text-xs text-secondary-gray mb-4 uppercase tracking-wider">Instant intelligence briefings</p>
                <AIChat race={race} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
