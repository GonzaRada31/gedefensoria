import React from 'react';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'neutral';

interface StatusChipProps {
  variant: StatusVariant;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  variant,
  label,
  count,
  icon,
  className = '',
}) => {
  const variantStyles: Record<StatusVariant, string> = {
    success: 'bg-status-success-bg text-status-success-text border-status-success-border',
    warning: 'bg-status-warning-bg text-status-warning-text border-status-warning-border',
    danger: 'bg-status-danger-bg text-status-danger-text border-status-danger-border',
    info: 'bg-status-info-bg text-status-info-text border-status-info-border',
    violet: 'bg-status-violet-bg text-status-violet-text border-status-violet-border',
    neutral: 'bg-surface-hover text-foreground-muted border-border',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {/* Indicador de punto accesible */}
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-0.5 px-1.5 py-0.2 bg-black/10 dark:bg-white/10 rounded-full text-[11px] font-semibold tabular-nums">
          {count}
        </span>
      )}
    </span>
  );
};
