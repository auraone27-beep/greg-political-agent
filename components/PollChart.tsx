'use client';

import { Race } from '@/lib/data/races';

export default function PollChart({ race }: { race: Race }) {
  const reversedPolls = [...race.polls].reverse();
  const maxValue = 60;
  
  return (
    <div className="space-y-4">
      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
          <span>60%</span>
          <span>50%</span>
          <span>40%</span>
          <span>30%</span>
        </div>

        {/* Chart area */}
        <div className="ml-10 h-full border-l border-b border-gray-200 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[60, 50, 40, 30].map((val) => (
              <div key={val} className="border-t border-gray-100" />
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

              const color = candidate.party === 'Democrat' ? '#3b82f6' : 
                           candidate.party === 'Republican' ? '#ef4444' : '#6b7280';

              return (
                <svg key={candidate.id} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  {points.map((point, idx) => (
                    <circle
                      key={idx}
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="4"
                      fill={color}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="ml-10 mt-2 flex justify-between text-xs text-gray-500">
          {reversedPolls.map((poll, idx) => (
            <span key={idx}>
              {new Date(poll.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6">
        {race.candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ 
                backgroundColor: candidate.party === 'Democrat' ? '#3b82f6' : 
                                candidate.party === 'Republican' ? '#ef4444' : '#6b7280' 
              }}
            />
            <span className="text-sm font-medium text-gray-700">{candidate.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
