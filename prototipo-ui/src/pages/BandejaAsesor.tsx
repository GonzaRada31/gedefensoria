import React, { useState, useMemo } from 'react';
import {
  User,
  Users,
  Clock,
  AlertTriangle,
  Play,
  CheckCircle2,
  Plus,
  FileText,
  ShieldAlert,
  Search,
  Building,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Copy,
  ChevronDown
} from 'lucide-react';
import { useAtenciones } from '../context/AtencionesContext';
import { useRole } from '../context/RoleContext';
import { MOCK_NOMENCLADOR } from '../mocks/nomenclador';
import { MOCK_ACTUACIONES } from '../mocks/actuaciones';
import { AtencionItem, NomencladorItem } from '../types';
import { PageHeader } from '../components/common/PageHeader';

export const BandejaAsesor: React.FC = () => {
  const { atenciones, tomarAtencion, finalizarAtencion } = useAtenciones();
  const { user, openActuanteDrawer } = useRole();

  // Filtrar atenciones asignadas a este asesor (o en demo a Dr. Morales)
  const misDerivaciones = useMemo(() => {
    return atenciones.filter(
      (a) => a.estado === 'EN_ESPERA' && (a.asesorId === user.id || a.asesorNombre.includes('Morales'))
    );
  }, [atenciones, user]);

  const atencionEnCurso = useMemo(() => {
    return atenciones.find(
      (a) => a.estado === 'EN_ATENCION' && (a.asesorId === user.id || a.asesorNombre.includes('Morales'))
    );
  }, [atenciones, user]);

  // Estado del formulario de atención en curso
  const [consultas, setConsultas] = useState<
    Array<{
      id: string;
      nomencladorId: string;
      dictamen: string;
    }>
  >([
    {
      id: 'c-1',
      nomencladorId: 'nom-1',
      dictamen: 'Se brinda asesoramiento legal. Se solicita a la empresa distribuidora informe sobre el cuadro tarifario aplicado.',
    },
  ]);

  // Modal / Sección de Cierre: Servicio vs Conflicto
  const [tipoCierre, setTipoCierre] = useState<'SERVICIO' | 'CONFLICTO'>('SERVICIO');
  const [caratulaConflicto, setCaratulaConflicto] = useState('');
  const [organismoDemandado, setOrganismoDemandado] = useState('EJESA');

  // Búsqueda de Nomenclador
  const [searchNomenclador, setSearchNomenclador] = useState('');

  // Sugerencia predictiva de carátulas similares para no duplicar (RF-AD-006)
  const caratulasSugeridas = useMemo(() => {
    if (!caratulaConflicto.trim()) return [];
    const query = caratulaConflicto.toLowerCase();
    return MOCK_ACTUACIONES.filter(
      (exp) =>
        exp.caratula.toLowerCase().includes(query) ||
        exp.actuantePrincipal.apellido.toLowerCase().includes(query)
    );
  }, [caratulaConflicto]);

  const handleAgregarOtraConsulta = () => {
    const nuevaId = `c-${Date.now()}`;
    setConsultas((prev) => [
      ...prev,
      {
        id: nuevaId,
        nomencladorId: 'nom-4', // Sugiere tarifa social u otro tema relacionado
        dictamen: 'Problemática conexa planteada en la misma audiencia presencial.',
      },
    ]);
  };

  const handleRemoverConsulta = (id: string) => {
    if (consultas.length <= 1) return;
    setConsultas((prev) => prev.filter((c) => c.id !== id));
  };

  const handleFinalizarAtencion = () => {
    if (!atencionEnCurso) return;
    finalizarAtencion(atencionEnCurso.id);
  };

  return (
    <div className="space-y-6 max-w-[1540px] mx-auto pb-12">
      {/* Cabecera */}
      <PageHeader
        eyebrow="Espacio de trabajo"
        title="Bandeja del Asesor"
        badge={
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-subtle text-primary">
            {user.nombre} {user.apellido}
          </span>
        }
        subtitle="Derivaciones recibidas de Mesa de Entradas, lectura de antecedentes y despacho en curso."
        actions={
          <div className="flex items-center gap-2 text-sm">
            <span className="text-foreground-subtle hidden sm:inline">Personas derivadas a tu turno:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-solid text-primary-solid-fg font-bold tabular-nums">
              {misDerivaciones.length}
            </span>
          </div>
        }
      />

      {/* SECCIÓN 1: ATENCIÓN EN CURSO (SI HAY UNA ACTIVA) */}
      {atencionEnCurso ? (
        <div className="bg-surface border-2 border-primary/50 rounded-card p-4 sm:p-6 shadow-card space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-primary">
                  Atención en curso en despacho
                </span>
                <h2 className="text-lg font-bold text-foreground">
                  {atencionEnCurso.actuante.apellido}, {atencionEnCurso.actuante.nombre}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openActuanteDrawer(atencionEnCurso.actuante.id)}
                className="px-3 py-1.5 text-xs font-medium border border-border rounded-control hover:bg-surface-hover text-foreground flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Ver ficha completa</span>
              </button>
            </div>
          </div>

          {/* Resumen del motivo inicial y antecedentes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-surface-hover rounded-control border border-border">
              <span className="text-2xs font-semibold text-foreground-subtle uppercase tracking-wider block mb-1">
                Motivo cargado en Mesa de Entradas
              </span>
              <p className="text-foreground font-medium">{atencionEnCurso.motivoResumen}</p>
            </div>

            <div className="p-3 bg-surface-hover rounded-control border border-border">
              <span className="text-2xs font-semibold text-foreground-subtle uppercase tracking-wider block mb-1">
                Datos de radicación y contacto
              </span>
              <p className="text-foreground">
                {atencionEnCurso.actuante.barrio}, {atencionEnCurso.actuante.localidad} • Tel: {atencionEnCurso.actuante.telefono || '—'}
              </p>
            </div>
          </div>

          {/* Formulario de Consultas y Nomenclador */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Clasificación por Nomenclador de Consultas ({consultas.length})</span>
                </h3>
                <p className="text-2xs text-foreground-muted">
                  Toda consulta debe codificarse obligatoriamente con el Nomenclador institucional (Área &gt; Grupo &gt; Tema &gt; Subtema).
                </p>
              </div>

              {/* Botón para agregar otra consulta (Multi-temática) */}
              <button
                type="button"
                onClick={handleAgregarOtraConsulta}
                className="px-3 py-1.5 text-xs font-semibold bg-primary-subtle text-primary border border-primary-border rounded-control hover:bg-primary-subtle/80 flex items-center gap-1.5 transition-colors"
                title="Clona los datos del actuante y suma una nueva problemática en la misma atención"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar otra consulta (Multi-temática)</span>
              </button>
            </div>

            {/* Lista de Consultas de la Atención */}
            <div className="space-y-3">
              {consultas.map((cons, index) => {
                const itemNom = MOCK_NOMENCLADOR.find((n) => n.id === cons.nomencladorId) || MOCK_NOMENCLADOR[0];

                return (
                  <div key={cons.id} className="p-4 bg-surface-hover rounded-card border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-primary-solid text-primary-solid-fg text-[11px] font-bold">
                        Consulta #{index + 1}
                      </span>
                      {consultas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoverConsulta(cons.id)}
                          className="text-status-danger-text text-2xs hover:underline"
                        >
                          Eliminar esta consulta
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-2xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                          Nomenclador Oficial (Área &gt; Grupo &gt; Tema)
                        </label>
                        <select
                          className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-xs text-foreground outline-none"
                          value={cons.nomencladorId}
                          onChange={(e) => {
                            const val = e.target.value;
                            setConsultas((prev) =>
                              prev.map((c) => (c.id === cons.id ? { ...c, nomencladorId: val } : c))
                            );
                          }}
                        >
                          {MOCK_NOMENCLADOR.map((nom) => (
                            <option key={nom.id} value={nom.id}>
                              {nom.area} / {nom.grupo}: {nom.tema}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-2xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                          Subtema / Especificación técnica
                        </label>
                        <div className="p-1.5 bg-surface border border-border rounded-control text-xs text-foreground font-medium">
                          {itemNom.subtema || 'General'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-2xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                        Dictamen / Orientación profesional brindada
                      </label>
                      <textarea
                        rows={2}
                        className="w-full bg-surface border border-border rounded-control p-2.5 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="Registrá el dictamen jurídico o psicosocial brindado al actuante…"
                        value={cons.dictamen}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConsultas((prev) =>
                            prev.map((c) => (c.id === cons.id ? { ...c, dictamen: val } : c))
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sección de Cierre: Servicio vs Conflicto */}
          <div className="p-4 bg-surface-active/30 rounded-card border border-border space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Resolución y Cierre de la Atención
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setTipoCierre('SERVICIO')}
                className={`p-3.5 rounded-card border text-left transition-colors ${
                  tipoCierre === 'SERVICIO'
                    ? 'bg-primary-subtle border-primary text-primary font-bold shadow-subtle'
                    : 'bg-surface border-border text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-bold">Actuación de Servicio</span>
                </div>
                <p className="text-2xs font-normal text-foreground-muted leading-relaxed">
                  Se abre y cierra en el acto. Asesoramiento inmediato, orientación o derivación sin trámites posteriores.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTipoCierre('CONFLICTO')}
                className={`p-3.5 rounded-card border text-left transition-colors ${
                  tipoCierre === 'CONFLICTO'
                    ? 'bg-primary-subtle border-primary text-primary font-bold shadow-subtle'
                    : 'bg-surface border-border text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-bold">Abrir Actuación de Conflicto</span>
                </div>
                <p className="text-2xs font-normal text-foreground-muted leading-relaxed">
                  Inicia un expediente formal. Requiere trámites, pedidos de informe, oficios y seguimiento con Libro Diario.
                </p>
              </button>
            </div>

            {/* Formulario si abre Actuación de Conflicto */}
            {tipoCierre === 'CONFLICTO' && (
              <div className="p-4 bg-surface rounded-card border border-border space-y-3 animate-in fade-in">
                <div>
                  <label htmlFor="caratula-input" className="block text-2xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    Carátula propuesta de la Actuación *
                  </label>
                  <input
                    id="caratula-input"
                    type="text"
                    className="w-full bg-surface-hover border border-border rounded-control px-3 py-2 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="ej. CONDORÍ, NORMA BEATRIZ C/ EJESA S.A. S/ CORTE INDEBIDO Y ELECTRODEPENDENCIA"
                    value={caratulaConflicto}
                    onChange={(e) => setCaratulaConflicto(e.target.value)}
                  />
                </div>

                {/* Buscador predictivo de carátulas similares (RF-AD-006) */}
                {caratulasSugeridas.length > 0 && (
                  <div className="p-3 bg-status-warning-bg border border-status-warning-border rounded-control text-xs text-status-warning-text space-y-1">
                    <span className="font-bold flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Atención: existen carátulas similares en el sistema para evitar duplicados:
                    </span>
                    <ul className="list-disc pl-5 space-y-0.5 text-2xs">
                      {caratulasSugeridas.map((sug) => (
                        <li key={sug.id}>
                          <strong>Exp. {sug.numeroOficial}:</strong> {sug.caratula}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botón de Cierre */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleFinalizarAtencion}
              className="px-6 py-2.5 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold text-xs rounded-control transition-colors shadow-subtle flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {tipoCierre === 'SERVICIO'
                  ? 'Finalizar y archivar como Actuación de Servicio'
                  : 'Crear Actuación de Conflicto y pasar a Trámites'}
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {/* SECCIÓN 2: PERSONAS EN ESPERA EN TU BANDEJA */}
      <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Atenciones asignadas a tu despacho
            </h2>
            <p className="text-xs text-foreground-muted">
              Leé los antecedentes y el motivo antes de llamar al actuante.
            </p>
          </div>
          <span className="text-xs font-semibold tabular-nums text-foreground-subtle">
            {misDerivaciones.length} en espera
          </span>
        </div>

        <div className="divide-y divide-border">
          {misDerivaciones.length === 0 ? (
            <div className="py-12 text-center text-foreground-muted text-xs">
              No tenés personas en espera en este momento. Los nuevos pases de Mesa de Entradas aparecerán aquí al instante.
            </div>
          ) : (
            misDerivaciones.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-surface-hover transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground">
                      {item.actuante.apellido}, {item.actuante.nombre}
                    </span>
                    <span className="font-mono text-xs text-foreground-muted">
                      {item.actuante.tipoDocumento === 'SIN_DOCUMENTO' ? 'Sin documento' : `DNI ${item.actuante.numeroDocumento}`}
                    </span>
                    {item.esGrupal && (
                      <span className="px-1.5 py-0.2 bg-primary-subtle text-primary border border-primary-border rounded text-[10px] font-bold">
                        Grupal ({item.integrantesGrupo?.length || 2})
                      </span>
                    )}
                    {item.programaNombre && (
                      <span className="px-1.5 py-0.2 bg-surface-hover text-foreground-muted border border-border rounded text-[10px] font-semibold">
                        {item.programaNombre}
                      </span>
                    )}
                  </div>

                  {/* Motivo visible */}
                  <p className="text-xs font-medium text-foreground leading-snug">
                    {item.motivoResumen}
                  </p>

                  {/* Antecedentes detectados para el asesor antes de llamar */}
                  {item.actuante.antecedentes && (
                    <div className="inline-flex items-center gap-1.5 text-2xs text-status-warning-text bg-status-warning-bg px-2 py-0.5 rounded border border-status-warning-border">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>
                        Antecedentes: {item.actuante.antecedentes.actuacionAbiertaNumero ? `Exp. ${item.actuante.antecedentes.actuacionAbiertaNumero} previo` : item.actuante.antecedentes.documentacionPendiente}
                      </span>
                    </div>
                  )}

                  <div className="text-2xs text-foreground-subtle flex items-center gap-3 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Esperando hace: <strong className="tabular-nums font-mono text-foreground">{item.minutosEspera} min</strong>
                    </span>
                    <span>•</span>
                    <span>Ingreso: {item.horaIngreso} hs</span>
                  </div>
                </div>

                {/* Acciones para el Asesor */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openActuanteDrawer(item.actuante.id)}
                    className="px-3 py-1.5 border border-border rounded-control text-xs font-medium text-foreground hover:bg-surface transition-colors"
                  >
                    Ver ficha
                  </button>
                  <button
                    type="button"
                    onClick={() => tomarAtencion(item.id)}
                    className="px-4 py-1.5 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control text-xs font-semibold transition-colors shadow-subtle flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Llamar y Tomar</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
