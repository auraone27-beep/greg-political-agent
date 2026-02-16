interface SparklineProps {
  data: number[];
  color?: string;
  className?: string;
}

export default function Sparkline({ data, color = "#0891b2", className = "w-20 h-10" }: SparklineProps) {
  if (data.length === 0) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((v, i) => `${i * 10},${40 - ((v - min) / range) * 35}`).join(' ');
  
  return (
    <svg viewBox={`0 0 ${data.length * 10} 40`} className={className}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
