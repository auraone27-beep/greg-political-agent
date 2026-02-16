'use client';

import { Race } from '@/lib/data/races';
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat({ race }: { race: Race }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Intelligence briefing ready for ${race.state} ${race.type === 'Senate' ? 'Senate' : `District ${race.district}`}.\n\nI can analyze polling trends, fundraising dynamics, sentiment shifts, and strategic implications. Ask me anything about this race.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(userMessage, race);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 transition-all duration-200 ${
                message.role === 'user'
                  ? 'bg-navy text-white'
                  : 'bg-white/60 border border-gray-200/50 text-navy'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/60 border border-gray-200/50 rounded-xl px-4 py-3 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-navy rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-navy rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-sm font-medium text-secondary-gray">Analyzing intelligence data...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about strategy, polling, fundraising..."
          className="flex-1 px-4 py-3 bg-white/60 border border-gray-200/50 rounded-xl text-sm text-navy placeholder-secondary-gray focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function generateResponse(query: string, race: Race): string {
  const q = query.toLowerCase();
  const latestPoll = race.polls[0];
  const leader = race.candidates.reduce((prev, current) => 
    (latestPoll.results[current.id] > latestPoll.results[prev.id]) ? current : prev
  );
  const margin = Math.abs(
    latestPoll.results[race.candidates[0].id] - latestPoll.results[race.candidates[1].id]
  );

  if (q.includes('poll') || q.includes('lead') || q.includes('winning')) {
    return `Based on the latest ${latestPoll.pollster} poll from ${new Date(latestPoll.date).toLocaleDateString()}, ${leader.name} is leading with ${latestPoll.results[leader.id]}%. The race is ${margin < 3 ? 'extremely competitive' : margin < 5 ? 'close' : 'showing a clear trend'} with a ${margin.toFixed(1)}% margin. ${margin < 3 ? 'This is within the margin of error, making it a true toss-up.' : ''}`;
  }

  if (q.includes('fundrais') || q.includes('money') || q.includes('donation')) {
    const topFundraiser = race.candidates.reduce((prev, current) => 
      current.fundraising.total > prev.fundraising.total ? current : prev
    );
    return `${topFundraiser.name} leads in fundraising with $${(topFundraiser.fundraising.total / 1000000).toFixed(1)}M raised. Last quarter, they brought in $${(topFundraiser.fundraising.lastQuarter / 1000000).toFixed(1)}M from ${topFundraiser.fundraising.donorCount.toLocaleString()} donors (avg: $${topFundraiser.fundraising.averageDonation}). ${topFundraiser.fundraising.averageDonation < 50 ? 'Strong grassroots support with small-dollar donations.' : 'Higher average donation suggests major donor support.'}`;
  }

  if (q.includes('sentiment') || q.includes('social') || q.includes('online')) {
    const sentiments = race.sentiment;
    return `Social media sentiment analysis:\n\n${sentiments.map(s => {
      const candidate = race.candidates.find(c => c.id === s.candidate);
      return `• ${candidate?.name}: ${s.score}/100 (${s.trend === 'up' ? '↑ trending up' : s.trend === 'down' ? '↓ trending down' : '→ stable'}) from ${s.sources.toLocaleString()} sources`;
    }).join('\n')}\n\nThis data aggregates mentions across social platforms, news sites, and online forums.`;
  }

  if (q.includes('turnout') || q.includes('voter')) {
    return `Turnout is projected at ${race.turnoutProjection}% for this race. ${race.turnoutProjection > 65 ? 'This is a high-turnout race, typical of competitive contests.' : 'Moderate turnout expected.'} Historical data suggests that ${race.turnoutProjection > 65 ? 'high turnout' : 'turnout at this level'} typically favors ${race.type === 'Senate' ? 'candidates with strong statewide name recognition' : 'incumbents with established ground operations'}.`;
  }

  if (q.includes('strategy') || q.includes('win') || q.includes('recommend')) {
    return `Strategic recommendations for this ${race.status} race:\n\n1. Focus on the ${race.keyIssues[0]} issue - it's a top voter priority\n2. Increase voter contact in areas with projected ${race.turnoutProjection > 65 ? 'high' : 'moderate'} turnout\n3. ${margin < 3 ? 'Every vote counts - maximize GOTV efforts' : 'Build on current momentum with targeted messaging'}\n4. Monitor sentiment trends and adjust messaging accordingly\n\nThe race is currently ${race.status}, so ${margin < 5 ? 'undecided voters will be critical' : 'maintaining current support is key'}.`;
  }

  if (q.includes('issue') || q.includes('topic')) {
    return `Top issues in this race:\n\n${race.keyIssues.map((issue, idx) => `${idx + 1}. ${issue}`).join('\n')}\n\n${race.candidates.map(c => `${c.name} is emphasizing: ${c.keyIssues.slice(0, 2).join(', ')}`).join('\n')}`;
  }

  // Default response
  return `I can help you analyze:\n\n• Polling trends and margins\n• Fundraising and donor data\n• Social media sentiment\n• Turnout projections\n• Campaign strategy recommendations\n• Key issues and messaging\n\nWhat specific aspect would you like to explore?`;
}
