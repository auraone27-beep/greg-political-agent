import { races } from '@/lib/data/races';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Political Race Intelligence</h1>
          <p className="mt-1 text-sm text-gray-600">AI-powered analysis of competitive 2026 races</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Races</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{races.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Toss-ups</div>
            <div className="mt-2 text-3xl font-bold text-amber-600">
              {races.filter(r => r.status === 'Toss-up').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Turnout Projection</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {Math.round(races.reduce((acc, r) => acc + r.turnoutProjection, 0) / races.length)}%
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {races.map((race) => {
            const latestPoll = race.polls[0];
            const candidates = race.candidates;
            const leader = candidates.reduce((prev, current) => 
              (latestPoll.results[current.id] > latestPoll.results[prev.id]) ? current : prev
            );
            
            return (
              <div key={race.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {race.state} {race.district && `District ${race.district}`} - {race.type}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          race.status === 'Toss-up' ? 'bg-amber-100 text-amber-800' :
                          race.status.includes('Lean') ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {race.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {new Date(race.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/race/${race.id}`}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="flex items-start gap-4">
                        <div className={`w-2 h-full rounded ${
                          candidate.party === 'Democrat' ? 'bg-blue-500' : 
                          candidate.party === 'Republican' ? 'bg-red-500' : 
                          'bg-gray-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                            <span className="text-2xl font-bold text-gray-900">
                              {latestPoll.results[candidate.id]}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{candidate.currentPosition}</p>
                          <div className="mt-2 text-sm text-gray-700">
                            <span className="font-medium">${(candidate.fundraising.total / 1000000).toFixed(1)}M</span> raised
                            <span className="mx-2">•</span>
                            <span>{candidate.fundraising.donorCount.toLocaleString()} donors</span>
                          </div>
                          <div className="mt-2">
                            {race.sentiment.find(s => s.candidate === candidate.id) && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Sentiment:</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {race.sentiment.find(s => s.candidate === candidate.id)?.score}
                                </span>
                                <span className={`text-xs ${
                                  race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'up' ? 'text-green-600' :
                                  race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'down' ? 'text-red-600' :
                                  'text-gray-600'
                                }`}>
                                  {race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'up' ? '↑' :
                                   race.sentiment.find(s => s.candidate === candidate.id)?.trend === 'down' ? '↓' : '→'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">
                        Latest poll: <span className="font-medium">{latestPoll.pollster}</span>
                        <span className="mx-2">•</span>
                        {new Date(latestPoll.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        <span className="mx-2">•</span>
                        n={latestPoll.sampleSize}
                        <span className="mx-2">•</span>
                        MoE ±{latestPoll.marginOfError}%
                      </div>
                      <div className="text-gray-600">
                        Turnout: <span className="font-medium">{race.turnoutProjection}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
