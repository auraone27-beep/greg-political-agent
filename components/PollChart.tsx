'use client';

import { Race } from '@/lib/data/races';

export default function PollChart({ race }: { race: Race }) {
  const reversedPolls = [...race.polls].reverse();
  const maxValue = 60;
  
  return (
    <div className="space-y-6">
      <div className="h-80 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-sm font-medium text-secondary-gray">
          <span>60%</span>
          <span>50%</span>
          <span>40%</span>
          <span>30%</span>
        </div>

        {/* Chart area */}
        <div className="ml-14 h-full border-l-2 border-b-2 border-gray-300 relative rounded-bl-lg">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[60, 50, 40, 30].map((val) => (
              <div key={val} className="border-t border-gray-200/50" />
            ))}
          </div>

          {/* Poll lines */}
          <div className="absolute inset-0">
            {race.candidates.map((candidate, candidateIdx) => {
              const points = reversedPolls.map((poll, idx) => ({
                x: (idx / (reversedPolls.length - 1)) * 100,
                y: ((maxValue - poll.results[candidate.id]) / maxValue) * 100
              }));

              const pathD = points.map((point, idx) => 
                `${idx === 0 ? 'M' : 'L'} ${point.x}% ${point.y}%`
              ).join(' ');

              const color = candidate.party === 'Democrat' ? '#1E3A5F' : 
                           candidate.party === 'Republican' ? '#DC2626' : '#6B7280';

              return (
                <svg key={candidate.id} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  {/* Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Points */}
                  {points.map((point, idx) => (
                    <g key={idx}>
                      <circle
                        cx={`${point.x}%`}
                        cy={`${point.y}%`}
                        r="6"
                        fill="white"
                        stroke={color}
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                        className="hover:r-8 transition-all duration-200 cursor-pointer"
                      />
                      <title>
                        {candidate.name}: {reversedPolls[idx].results[candidate.id]}% 
                        ({new Date(reversedPolls[idx].date).toLocaleDateString()})
                      </title>
                    </g>
                  ))}
                </svg>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="ml-14 mt-4 flex justify-between text-sm font-medium text-secondary-gray">
          {reversedPolls.map((poll, idx) => (
            <span key={idx} className="text-center">
              {new Date(poll.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200/50">
        {race.candidates.map((candidate) => {
          const color = candidate.party === 'Democrat' ? '#1E3A5F' : 
                       candidate.party === 'Republican' ? '#DC2626' : '#6B7280';
          
          return (
            <div key={candidate.id} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full border-2" 
                style={{ 
                  backgroundColor: color,
                  borderColor: color
                }}
              />
              <span className="text-sm font-semibold text-navy">{candidate.name}</span>
              <span className="text-sm text-secondary-gray">({candidate.party.substring(0, 1)})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
