import React, { useState, useEffect } from 'react';
import { Timer, Save, Check } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const InactivityModal: React.FC = () => {
  const { inactivityModalOpen, setInactivityModalOpen } = useRole();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (!inactivityModalOpen) {
      setSecondsLeft(30);
      setSavedStatus(false);
      return;
    }

    // Simula guardado automático de borrador en el segundo 2
    const saveTimer = setTimeout(() => {
      setSavedStatus(true);
    }, 1800);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setInactivityModalOpen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(saveTimer);
    };
  }, [inactivityModalOpen, setInactivityModalOpen]);

  if (!inactivityModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inactivity-title"
    >
      <div className="w-full max-w-md bg-surface border border-border rounded-card shadow-dropdown overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-status-danger-bg text-status-danger-text border border-status-danger-border rounded-full shrink-0">
              <Timer className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 id="inactivity-title" className="text-base font-bold text-foreground">
                Cierre de sesión por inactividad
              </h3>
              <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                Por seguridad del sistema y protección de datos sensibles, la sesión se cerrará automáticamente en:
              </p>

              <div className="my-3 text-center py-2 bg-surface-hover rounded-control border border-border">
                <span className="text-2xl font-bold font-mono text-status-danger-text tabular-nums">
                  00:{secondsLeft.toString().padStart(2, '0')}
                </span>
                <span className="block text-2xs text-foreground-subtle mt-0.5">segundos restantes</span>
              </div>

              {/* Indicador de guardando cambios */}
              <div className="flex items-center gap-2 text-xs py-1 text-foreground-muted">
                {savedStatus ? (
                  <>
                    <Check className="w-4 h-4 text-status-success-text shrink-0" />
                    <span className="text-status-success-text font-medium">
                      Cambios y borradores guardados automáticamente en el servidor.
                    </span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-foreground-subtle animate-spin shrink-0" />
                    <span>Guardando tus cambios en segundo plano…</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-surface-hover border-t border-border flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setInactivityModalOpen(false)}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control transition-colors shadow-subtle"
          >
            Continuar trabajando
          </button>
        </div>
      </div>
    </div>
  );
};
