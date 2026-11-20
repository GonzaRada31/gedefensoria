import React from 'react';
import { useAtenciones } from '../../context/AtencionesContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAtenciones();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-status-success-text shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-status-warning-text shrink-0" />,
          info: <Info className="w-5 h-5 text-status-info-text shrink-0" />,
        };

        const borderStyles = {
          success: 'border-status-success-border bg-surface',
          warning: 'border-status-warning-border bg-surface',
          info: 'border-status-info-border bg-surface',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-card border shadow-dropdown transition-all animate-in fade-in slide-in-from-bottom-2 ${borderStyles[toast.tipo]}`}
          >
            {icons[toast.tipo]}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground leading-tight">
                {toast.titulo}
              </h4>
              <p className="text-xs text-foreground-muted mt-1 leading-normal">
                {toast.mensaje}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-foreground-subtle hover:text-foreground p-1 rounded focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
