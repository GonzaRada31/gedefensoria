import React from 'react';

interface PageHeaderProps {
  /** Sección a la que pertenece la pantalla (texto chico en mayúsculas, color institucional). */
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  /** Etiqueta opcional junto al título (ej.: nombre del profesional). */
  badge?: React.ReactNode;
  /** Acciones a la derecha (botones). */
  actions?: React.ReactNode;
}

/** Encabezado de pantalla único para toda la app (estilo maqueta Canva). */
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, subtitle, badge, actions }) => (
  <div className="flex flex-row items-start sm:items-end justify-between gap-4">
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      <div className="mt-1 flex items-center gap-2 flex-wrap">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground tracking-tight">{title}</h1>
        {badge}
      </div>
      {subtitle && <p className="text-sm text-foreground-muted mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
