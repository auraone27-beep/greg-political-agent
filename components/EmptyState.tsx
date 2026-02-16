interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  subtitle,
  action 
}: EmptyStateProps) {
  return (
    <div className="glass-card p-16 text-center relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="max-w-md mx-auto">
        {icon ? (
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-navy/10 to-crimson/10 flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-navy/10 to-crimson/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-navy/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}
        <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-fraunces)' }}>
          {title}
        </h3>
        <p className="text-base text-secondary-gray mb-2 leading-relaxed">
          {description}
        </p>
        {subtitle && (
          <p className="text-sm text-secondary-gray/70">
            {subtitle}
          </p>
        )}
        {action && (
          <a 
            href={action.href}
            className="inline-flex items-center justify-center px-6 py-3 mt-6 bg-navy text-white font-semibold rounded-xl hover:bg-navy/90 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            {action.label}
          </a>
        )}
      </div>
    </div>
  );
}

export function NoRacesState() {
  return (
    <EmptyState
      title="No Active Contests"
      description="Intelligence gathering in progress. Competitive races will surface here as polling data confirms tight margins."
      subtitle="Monitoring 435 House seats • 34 Senate races • 36 gubernatorial contests"
    />
  );
}

export function NoPollsState() {
  return (
    <EmptyState
      icon={
        <svg className="w-10 h-10 text-navy/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      }
      title="No Polling Data Available"
      description="Polling data is currently being collected. Check back soon for the latest survey results."
      subtitle="Data sources: Marist, Quinnipiac, Suffolk, Emerson, and other major pollsters"
    />
  );
}

export function NoCandidatesState() {
  return (
    <EmptyState
      icon={
        <svg className="w-10 h-10 text-navy/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      }
      title="No Candidates Filed"
      description="The candidate filing period is still open. Candidates will appear here once they officially enter the race."
      subtitle="Filing deadline information available through state election boards"
    />
  );
}

export function NoDataState() {
  return (
    <EmptyState
      icon={
        <svg className="w-10 h-10 text-navy/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
      title="No Data Available"
      description="Information is currently being gathered and will be displayed here when available."
    />
  );
}
