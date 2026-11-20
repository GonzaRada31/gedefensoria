import React from 'react';
import { AlertCircle, Monitor, ShieldAlert, X } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const SessionConflictModal: React.FC = () => {
  const { sessionModalOpen, setSessionModalOpen, user } = useRole();

  if (!sessionModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-conflict-title"
    >
      <div className="w-full max-w-md bg-surface border border-border rounded-card shadow-dropdown overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-status-warning-bg text-status-warning-text border border-status-warning-border rounded-full shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 id="session-conflict-title" className="text-base font-bold text-foreground">
                Sesión abierta detectada
              </h3>
              <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                Tenés una sesión activa con el usuario <strong className="text-foreground">{user.nombre} {user.apellido}</strong> en otro equipo de la Defensoría desde las <strong className="text-foreground">09:12 hs</strong>.
              </p>
              
              <div className="mt-3.5 p-3 bg-surface-hover rounded-control border border-border flex items-center gap-2.5 text-xs text-foreground-muted">
                <Monitor className="w-4 h-4 text-foreground-subtle shrink-0" />
                <span>Equipo: PC-MESA-04 (IP local: 192.168.1.44)</span>
              </div>

              <p className="text-xs text-foreground-subtle mt-3">
                Por seguridad y consistencia en el Libro Diario y pases, sólo se permite una sesión activa por operador. ¿Deseás cerrarla y continuar en este equipo?
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-surface-hover border-t border-border flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setSessionModalOpen(false)}
            className="px-3.5 py-2 text-xs font-medium text-foreground-muted hover:text-foreground border border-border rounded-control hover:bg-surface transition-colors"
          >
            Cancelar y salir
          </button>
          <button
            type="button"
            onClick={() => {
              setSessionModalOpen(false);
            }}
            className="px-4 py-2 text-xs font-medium bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control transition-colors shadow-subtle"
          >
            Cerrar otra sesión y continuar acá
          </button>
        </div>
      </div>
    </div>
  );
};
