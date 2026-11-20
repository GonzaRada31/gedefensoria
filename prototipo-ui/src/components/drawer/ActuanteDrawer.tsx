import React, { useEffect, useRef, useState } from 'react';
import { X, User, Phone, MapPin, Calendar, Clock, AlertTriangle, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { MOCK_ACTUANTES } from '../../mocks/actuantes';
import { MOCK_ACTUACIONES } from '../../mocks/actuaciones';
import { MOCK_ATENCIONES } from '../../mocks/atenciones';
import { StatusChip } from '../common/StatusChip';
import { estadoVisible } from '../common/estadoAtencion';
import { Link } from 'react-router-dom';

export const ActuanteDrawer: React.FC = () => {
  const { selectedActuanteId, closeActuanteDrawer } = useRole();
  const [activeTab, setActiveTab] = useState<'resumen' | 'atenciones' | 'actuaciones'>('resumen');
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const actuante = MOCK_ACTUANTES.find((a) => a.id === selectedActuanteId);

  // Atenciones previas de este actuante
  const atencionesHistorial = MOCK_ATENCIONES.filter(
    (a) => a.actuante.id === selectedActuanteId || a.integrantesGrupo?.some((g) => g.id === selectedActuanteId)
  );

  // Actuaciones vinculadas
  const actuacionesHistorial = MOCK_ACTUACIONES.filter(
    (exp) => exp.actuantePrincipal.id === selectedActuanteId
  );

  // Cálculo de edad exacta
  const calcularEdad = (fechaNac?: string): string => {
    if (!fechaNac) return '—';
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return `${edad} años`;
  };

  useEffect(() => {
    if (selectedActuanteId) {
      closeButtonRef.current?.focus();
    }
  }, [selectedActuanteId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedActuanteId && e.key === 'Escape') {
        e.preventDefault();
        closeActuanteDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedActuanteId, closeActuanteDrawer]);

  if (!selectedActuanteId || !actuante) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-none transition-opacity"
      onClick={closeActuanteDrawer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-actuante-title"
    >
      <div
        ref={drawerRef}
        className="w-full max-w-lg bg-surface border-l border-border h-full flex flex-col shadow-drawer overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Drawer */}
        <div className="p-4 sm:p-5 border-b border-border bg-surface flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full bg-primary-subtle text-primary border border-primary-border flex items-center justify-center font-bold text-lg shrink-0">
              {actuante.nombre[0]}
              {actuante.apellido[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 id="drawer-actuante-title" className="text-lg font-bold text-foreground truncate">
                  {actuante.apellido}, {actuante.nombre}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-muted mt-0.5">
                <span className="font-mono font-medium">
                  {actuante.tipoDocumento === 'SIN_DOCUMENTO' ? 'Sin documento' : `DNI ${actuante.numeroDocumento}`}
                </span>
                <span>•</span>
                <span>Edad: {calcularEdad(actuante.fechaNacimiento)}</span>
                {actuante.genero && actuante.genero !== 'NO_DECLARA' && (
                  <>
                    <span>•</span>
                    <span>Género: {actuante.genero}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeActuanteDrawer}
            className="p-1.5 text-foreground-subtle hover:text-foreground rounded-control hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Cerrar panel lateral (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerta de Antecedentes Críticos */}
        {actuante.antecedentes && (
          <div className="bg-status-warning-bg border-b border-status-warning-border px-4 py-3 flex items-start gap-2.5 text-status-warning-text">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-semibold">Antecedentes detectados:</strong>
              {actuante.antecedentes.asesorPrevio && (
                <div className="mt-0.5">Asesor asignado previamente: {actuante.antecedentes.asesorPrevio}</div>
              )}
              {actuante.antecedentes.actuacionAbiertaNumero && (
                <div className="mt-0.5">
                  Posee Actuación en trámite: <strong>{actuante.antecedentes.actuacionAbiertaNumero}</strong>
                </div>
              )}
              {actuante.antecedentes.documentacionPendiente && (
                <div className="mt-0.5">Documentación adeudada: {actuante.antecedentes.documentacionPendiente}</div>
              )}
            </div>
          </div>
        )}

        {/* Navegación por pestañas */}
        <div className="flex border-b border-border bg-surface px-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('resumen')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'resumen'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
          >
            Resumen y Contacto
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('atenciones')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'atenciones'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
          >
            Historial de Atenciones ({atencionesHistorial.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('actuaciones')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'actuaciones'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
          >
            Actuaciones ({actuacionesHistorial.length})
          </button>
        </div>

        {/* Cuerpo con Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {activeTab === 'resumen' && (
            <div className="space-y-4 text-sm">
              <div className="bg-surface-hover rounded-control p-3.5 border border-border space-y-2">
                <h4 className="text-xs font-semibold uppercase text-foreground-subtle tracking-wider">
                  Datos de contacto y radicación
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div>
                    <span className="text-foreground-subtle block">Teléfono:</span>
                    <span className="font-mono font-medium text-foreground">{actuante.telefono || '—'}</span>
                  </div>
                  <div>
                    <span className="text-foreground-subtle block">Correo electrónico:</span>
                    <span className="text-foreground">{actuante.email || '—'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-foreground-subtle block">Domicilio real:</span>
                    <span className="text-foreground font-medium">
                      {actuante.direccion ? `${actuante.direccion}, ` : ''}
                      {actuante.barrio ? `Barrio ${actuante.barrio}, ` : ''}
                      {actuante.localidad || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {actuante.observaciones && (
                <div className="bg-surface-hover rounded-control p-3.5 border border-border">
                  <h4 className="text-xs font-semibold uppercase text-foreground-subtle tracking-wider mb-1">
                    Observaciones institucionales
                  </h4>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {actuante.observaciones}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'atenciones' && (
            <div className="space-y-3">
              {atencionesHistorial.length === 0 ? (
                <div className="py-8 text-center text-foreground-muted text-xs">
                  No hay atenciones registradas en el historial.
                </div>
              ) : (
                atencionesHistorial.map((at) => (
                  <div key={at.id} className="p-3 bg-surface-hover border border-border rounded-control space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-foreground-subtle" />
                        {at.horaIngreso} hs
                      </span>
                      <StatusChip
                        variant={estadoVisible(at).variant}
                        label={estadoVisible(at).label}
                      />
                    </div>
                    <div className="text-xs text-foreground font-medium">
                      {at.motivoResumen}
                    </div>
                    <div className="text-2xs text-foreground-subtle flex items-center justify-between border-t border-border/60 pt-1.5">
                      <span>Asesor: {at.asesorNombre}</span>
                      {at.esMultiTematica && (
                        <span className="text-primary font-medium">Multi-temática ({at.cantidadConsultas})</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'actuaciones' && (
            <div className="space-y-3">
              {actuacionesHistorial.length === 0 ? (
                <div className="py-8 text-center text-foreground-muted text-xs">
                  No posee actuaciones formales de conflicto o servicio iniciadas.
                </div>
              ) : (
                actuacionesHistorial.map((exp) => (
                  <div key={exp.id} className="p-3 bg-surface-hover border border-border rounded-control space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">
                        Exp. {exp.numeroOficial}
                      </span>
                      <StatusChip
                        variant={exp.estado === 'EN_INSTRUCCION' ? 'info' : exp.estado === 'CON_DICTAMEN' ? 'warning' : 'neutral'}
                        label={exp.estado === 'EN_INSTRUCCION' ? 'En Instrucción' : exp.estado === 'CON_DICTAMEN' ? 'Con Dictamen' : 'Cerrada'}
                      />
                    </div>
                    <p className="text-xs text-foreground font-medium line-clamp-2">
                      {exp.caratula}
                    </p>
                    <div className="text-2xs text-foreground-subtle flex items-center justify-between pt-1">
                      <span>Organismo: {exp.organismoInvolucrado || '—'}</span>
                      <Link
                        to={`/expedientes/${exp.id}`}
                        onClick={closeActuanteDrawer}
                        className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                      >
                        Ver expediente <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Pie Fijo del Drawer */}
        <div className="p-4 border-t border-border bg-surface flex items-center justify-between">
          <button
            type="button"
            onClick={closeActuanteDrawer}
            className="px-4 py-2 text-xs font-medium text-foreground-muted hover:text-foreground border border-border rounded-control hover:bg-surface-hover transition-colors"
          >
            Cerrar panel
          </button>
          <div className="flex items-center gap-2">
            <Link
              to="/atencion/nueva"
              onClick={closeActuanteDrawer}
              className="px-4 py-2 text-xs font-medium bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control transition-colors shadow-subtle inline-flex items-center gap-1.5"
            >
              + Registrar atención
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
