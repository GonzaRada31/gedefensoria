import React, { useState, useEffect, useRef } from 'react';
import { Search, User, FileText, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ACTUANTES } from '../../mocks/actuantes';
import { MOCK_ACTUACIONES } from '../../mocks/actuaciones';
import { useRole } from '../../context/RoleContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { openActuanteDrawer } = useRole();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Filtrado de Actuantes
  const filteredActuantes = normalizedQuery
    ? MOCK_ACTUANTES.filter(
        (a) =>
          a.nombre.toLowerCase().includes(normalizedQuery) ||
          a.apellido.toLowerCase().includes(normalizedQuery) ||
          a.numeroDocumento.includes(normalizedQuery) ||
          a.barrio.toLowerCase().includes(normalizedQuery)
      )
    : MOCK_ACTUANTES.slice(0, 3);

  // Filtrado de Actuaciones
  const filteredActuaciones = normalizedQuery
    ? MOCK_ACTUACIONES.filter(
        (exp) =>
          exp.numeroOficial.includes(normalizedQuery) ||
          exp.caratula.toLowerCase().includes(normalizedQuery) ||
          exp.actuantePrincipal.nombre.toLowerCase().includes(normalizedQuery) ||
          exp.actuantePrincipal.apellido.toLowerCase().includes(normalizedQuery)
      )
    : MOCK_ACTUACIONES.slice(0, 3);

  const totalResults = filteredActuantes.length + filteredActuaciones.length;

  const handleSelectActuante = (actuanteId: string) => {
    onClose();
    openActuanteDrawer(actuanteId);
  };

  const handleSelectActuacion = (actuacionId: string) => {
    onClose();
    navigate(`/expedientes/${actuacionId}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-none p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
    >
      <div
        className="w-full max-w-2xl bg-surface border border-border rounded-card shadow-dropdown overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del buscador */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface">
          <Search className="w-5 h-5 text-foreground-subtle shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            id="global-search-title"
            type="text"
            className="w-full bg-transparent text-foreground placeholder:text-foreground-subtle text-base outline-none"
            placeholder="Buscar persona por DNI o apellido, o expediente por número/carátula…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-foreground-subtle hover:text-foreground rounded focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-foreground-subtle bg-surface-hover border border-border rounded">
            ESC
          </kbd>
        </div>

        {/* Resultados */}
        <div className="overflow-y-auto divide-y divide-border p-2">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-foreground-muted">
              <p className="text-sm">No se encontraron resultados para "{query}"</p>
              <p className="text-xs text-foreground-subtle mt-1">
                Probá buscar por número de documento sin puntos o por carátula de expediente.
              </p>
            </div>
          ) : (
            <>
              {/* Sección Actuantes */}
              {filteredActuantes.length > 0 && (
                <div className="py-2">
                  <div className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Personas (Actuantes)
                  </div>
                  <ul className="space-y-1">
                    {filteredActuantes.map((act) => (
                      <li key={act.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectActuante(act.id)}
                          className="w-full flex items-center justify-between px-3 py-2 text-left rounded-control hover:bg-surface-hover text-foreground group transition-colors focus-visible:bg-surface-hover"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-primary-subtle text-primary rounded border border-primary-border">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-medium text-sm flex items-center gap-2">
                                <span>{act.apellido}, {act.nombre}</span>
                                <span className="text-xs text-foreground-muted tabular-nums">
                                  {act.tipoDocumento === 'SIN_DOCUMENTO' ? 'Sin documento' : `DNI ${act.numeroDocumento}`}
                                </span>
                              </div>
                              <div className="text-xs text-foreground-subtle">
                                {act.barrio ? `${act.barrio}, ` : ''}{act.localidad}
                                {act.antecedentes?.actuacionAbiertaNumero && (
                                  <span className="ml-2 text-status-warning-text font-medium">
                                    • Exp. {act.antecedentes.actuacionAbiertaNumero}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-foreground-subtle group-hover:text-primary flex items-center gap-1">
                            Ver ficha <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sección Actuaciones */}
              {filteredActuaciones.length > 0 && (
                <div className="py-2">
                  <div className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Actuaciones (Expedientes)
                  </div>
                  <ul className="space-y-1">
                    {filteredActuaciones.map((exp) => (
                      <li key={exp.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectActuacion(exp.id)}
                          className="w-full flex items-center justify-between px-3 py-2 text-left rounded-control hover:bg-surface-hover text-foreground group transition-colors focus-visible:bg-surface-hover"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-surface-hover text-foreground rounded border border-border">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-medium text-sm flex items-center gap-2">
                                <span className="font-mono text-primary font-bold">{exp.numeroOficial}</span>
                                <span className="text-xs px-2 py-0.2 rounded-full border border-border text-foreground-muted">
                                  {exp.tipo === 'CONFLICTO' ? 'Conflicto' : 'Servicio'}
                                </span>
                              </div>
                              <div className="text-xs text-foreground-muted line-clamp-1 max-w-md">
                                {exp.caratula}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-foreground-subtle group-hover:text-primary flex items-center gap-1">
                            Ir al expediente <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pie con atajos */}
        <div className="px-4 py-2 bg-surface-hover border-t border-border flex items-center justify-between text-xs text-foreground-subtle">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Seleccionar
            </span>
            <span>ESC para cerrar</span>
          </div>
          <span className="tabular-nums">Presione Ctrl+K en cualquier momento</span>
        </div>
      </div>
    </div>
  );
};
