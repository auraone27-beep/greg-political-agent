import { races } from '@/lib/data/races';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PollChart from '@/components/PollChart';
import AIChat from '@/components/AIChat';

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
            ← Back to all races
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {race.state} {race.district && `District ${race.district}`} - {race.type}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
              race.status === 'Toss-up' ? 'bg-amber-100 text-amber-800' :
              race.status.includes('Lean') ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {race.status}
            </span>
            <span className="text-sm text-gray-600">
              Election: {new Date(race.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Polling Trends */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Polling Trends</h2>
              <PollChart race={race} />
            </div>

            {/* Candidates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Candidates</h2>
              <div className="space-y-6">
                {race.candidates.map((candidate) => (
                  <div key={candidate.id} className="border-l-4 pl-4" style={{
                    borderColor: candidate.party === 'Democrat' ? '#3b82f6' : 
                                candidate.party === 'Republican' ? '#ef4444' : '#6b7280'
                  }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.party} • {candidate.currentPosition}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {race.polls[0].results[candidate.id]}%
                        </div>
                        <div className="text-xs text-gray-500">Latest poll</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Fundraising</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                          ${(candidate.fundraising.total / 1000000).toFixed(1)}M total
                        </div>
                        <div className="text-xs text-gray-600">
                          ${(candidate.fundraising.lastQuarter / 1000000).toFixed(1)}M last quarter
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Donors</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                          {candidate.fundraising.donorCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">
                          ${candidate.fundraising.averageDonation} avg
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Key Issues</div>
                      <div className="flex flex-wrap gap-2">
                        {candidate.keyIssues.map((issue, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Endorsements ({candidate.endorsements.length})
                      </div>
                      <div className="text-sm text-gray-700">
                        {candidate.endorsements.slice(0, 3).join(', ')}
                        {candidate.endorsements.length > 3 && ` +${candidate.endorsements.length - 3} more`}
                      </div>
                    </div>

                    <div className="mt-4">
                      {race.sentiment.find(s => s.candidate === candidate.id) && (
                        <div className="flex items-center gap-3">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Social Sentiment
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              {race.sentiment.find(s => s.candidate === candidate.id)?.score}/100
                            </span>
                            <span className={`text-sm font-medium ${
                              race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'up' ? 'text-green-600' :
                              race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'down' ? 'text-red-600' :
                              'text-gray-600'
                            }`}>
                              {race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'up' ? '↑ Trending up' :
                               race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'down' ? '↓ Trending down' : 
                               '→ Stable'}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({race.sentiment.find(s => s.candidate === candidate.id)?.sources.toLocaleString()} sources)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Polling Data */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Polls</h2>
              <div className="space-y-3">
                {race.polls.map((poll, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-gray-900">{poll.pollster}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {new Date(poll.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        n={poll.sampleSize} • MoE ±{poll.marginOfError}%
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {race.candidates.map((candidate) => (
                        <div key={candidate.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{candidate.name}</span>
                          <span className="text-sm font-semibold text-gray-900">
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

          <div className="lg:col-span-1 space-y-6">
            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Key Metrics</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Turnout Projection</div>
                  <div className="mt-1 text-2xl font-bold text-gray-900">{race.turnoutProjection}%</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Fundraising</div>
                  <div className="mt-1 text-2xl font-bold text-gray-900">
                    ${(race.candidates.reduce((acc, c) => acc + c.fundraising.total, 0) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Issues</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {race.keyIssues.map((issue, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Strategy Chat */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">AI Strategy Assistant</h2>
              <AIChat race={race} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
