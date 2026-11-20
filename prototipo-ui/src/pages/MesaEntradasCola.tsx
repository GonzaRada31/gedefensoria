import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  User,
  Users,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Eye,
  AlertCircle,
  Truck,
  Phone,
  FileCheck,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { useAtenciones } from '../context/AtencionesContext';
import { useRole } from '../context/RoleContext';
import { StatusChip } from '../components/common/StatusChip';
import { estadoVisible, UMBRAL_ESPERA_LARGA_MIN } from '../components/common/estadoAtencion';
import { AtencionItem, EstadoAtencion } from '../types';
import { PageHeader } from '../components/common/PageHeader';

export const MesaEntradasCola: React.FC = () => {
  const { atenciones, darPase, contadores } = useAtenciones();
  const { openActuanteDrawer } = useRole();

  const [activeTab, setActiveTab] = useState<EstadoAtencion>('EN_ESPERA');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsesor, setSelectedAsesor] = useState<string>('TODOS');

  // Filtrado de la lista según pestaña activa y criterios de búsqueda
  const filteredAtenciones = useMemo(() => {
    return atenciones.filter((item) => {
      if (item.estado !== activeTab) return false;

      if (selectedAsesor !== 'TODOS' && item.asesorNombre !== selectedAsesor) {
        return false;
      }

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchActuante =
          item.actuante.nombre.toLowerCase().includes(query) ||
          item.actuante.apellido.toLowerCase().includes(query) ||
          item.actuante.numeroDocumento.includes(query);
        const matchMotivo = item.motivoResumen.toLowerCase().includes(query);
        const matchGrupo = item.integrantesGrupo?.some(
          (g) => g.nombre.toLowerCase().includes(query) || g.apellido.toLowerCase().includes(query)
        );
        return matchActuante || matchMotivo || matchGrupo;
      }

      return true;
    });
  }, [atenciones, activeTab, selectedAsesor, searchTerm]);

  // Lista única de asesores para el filtro rápido
  const asesoresDisponibles = useMemo(() => {
    const list = Array.from(new Set(atenciones.map((a) => a.asesorNombre)));
    return list;
  }, [atenciones]);

  // Indicadores del día (derivados, nunca guardados)
  const enEsperaLista = atenciones.filter((a) => a.estado === 'EN_ESPERA');
  const esperaPromedio = enEsperaLista.length
    ? Math.round(enEsperaLista.reduce((acc, a) => acc + a.minutosEspera, 0) / enEsperaLista.length)
    : 0;
  const indicadores = [
    { label: 'En espera', value: contadores.enEspera, icon: <Clock className="w-4 h-4" /> },
    { label: 'En atención', value: contadores.enAtencion, icon: <Users className="w-4 h-4" /> },
    { label: 'Atendidas hoy', value: contadores.finalizadas, icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: 'Espera promedio', value: esperaPromedio, unit: 'min', icon: <RefreshCw className="w-4 h-4" /> },
  ];
  const fechaHoy = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6 max-w-[1540px] mx-auto">
      {/* Cabecera de la Pantalla */}
      <PageHeader
        eyebrow="Mesa de Entradas"
        title="Atenciones del día"
        subtitle={`${fechaHoy} · Seguimiento de la atención en tiempo real`}
        actions={
          <Link
            to="/atencion/nueva"
            className="inline-flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 text-sm font-semibold bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control transition-colors shadow-card focus-visible:ring-2 focus-visible:ring-primary"
          >
            <UserPlus className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">Registrar atención</span>
          </Link>
        }
      />

      {/* Indicadores del día */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {indicadores.map((k) => (
          <div key={k.label} className="bg-surface border border-border rounded-card shadow-card p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-foreground-muted">{k.label}</span>
              <span className="w-8 h-8 rounded-control bg-primary-subtle text-primary flex items-center justify-center" aria-hidden="true">
                {k.icon}
              </span>
            </div>
            <div className="mt-3 text-3xl sm:text-4xl font-bold font-display text-foreground tabular-nums">
              {k.value}
              {k.unit && <span className="ml-1 text-base font-medium text-foreground-subtle">{k.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Pestañas de Estado con Contadores (RF-ME) */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-border overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('EN_ESPERA')}
          className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'EN_ESPERA'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <span>En espera</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${
              activeTab === 'EN_ESPERA'
                ? 'bg-primary-solid text-primary-solid-fg'
                : 'bg-surface-hover text-foreground-muted border border-border'
            }`}
          >
            {contadores.enEspera}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('EN_ATENCION')}
          className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'EN_ATENCION'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <span>En atención</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${
              activeTab === 'EN_ATENCION'
                ? 'bg-status-info-text text-surface'
                : 'bg-surface-hover text-foreground-muted border border-border'
            }`}
          >
            {contadores.enAtencion}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('FINALIZADA')}
          className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'FINALIZADA'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <span>Finalizadas</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${
              activeTab === 'FINALIZADA'
                ? 'bg-status-success-text text-surface'
                : 'bg-surface-hover text-foreground-muted border border-border'
            }`}
          >
            {contadores.finalizadas}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('SIN_ATENDER')}
          className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'SIN_ATENDER'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <span>Sin atender / Desistidas</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${
              activeTab === 'SIN_ATENDER'
                ? 'bg-status-warning-text text-surface'
                : 'bg-surface-hover text-foreground-muted border border-border'
            }`}
          >
            {contadores.sinAtender}
          </span>
        </button>
      </div>

      {/* Barra de Filtros Concurrentes (muy valorada por los operadores) */}
      <div className="bg-surface p-3 rounded-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-foreground-subtle" />
          <input
            type="text"
            className="w-full bg-surface-hover border border-border rounded-control pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-foreground-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Filtrar por nombre, DNI o motivo…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="filtro-asesor" className="text-xs text-foreground-muted whitespace-nowrap">
            Asesor:
          </label>
          <select
            id="filtro-asesor"
            className="text-xs bg-surface-hover border border-border rounded-control px-2.5 py-1.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
            value={selectedAsesor}
            onChange={(e) => setSelectedAsesor(e.target.value)}
          >
            <option value="TODOS">Todos los asesores</option>
            {asesoresDisponibles.map((as) => (
              <option key={as} value={as}>
                {as}
              </option>
            ))}
          </select>

          {(searchTerm || selectedAsesor !== 'TODOS') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedAsesor('TODOS');
              }}
              className="text-xs text-primary hover:underline px-1 whitespace-nowrap"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Versión celular (estilo Canva): tarjetas en lugar de tabla */}
      <div className="md:hidden space-y-2.5">
        {filteredAtenciones.length === 0 ? (
          <div className="py-10 text-center text-sm text-foreground-muted">No hay registros en esta pestaña</div>
        ) : (
          filteredAtenciones.map((item) => {
            const larga = item.minutosEspera > UMBRAL_ESPERA_LARGA_MIN;
            const chip = estadoVisible(item);
            return (
              <div key={item.id} className="bg-surface border border-border rounded-card shadow-card p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-sm font-bold tabular-nums text-foreground">{item.horaIngreso} hs</span>
                  <StatusChip variant={chip.variant} label={chip.label} />
                </div>
                <button
                  type="button"
                  onClick={() => openActuanteDrawer(item.actuante.id)}
                  className="text-left text-sm font-bold text-foreground hover:text-primary"
                  aria-label={`Abrir ficha de ${item.actuante.apellido}, ${item.actuante.nombre}`}
                >
                  {item.actuante.apellido}, {item.actuante.nombre}
                  {item.esGrupal && <span className="ml-1.5 text-xs font-semibold text-primary">· Grupal ({item.integrantesGrupo?.length || 2})</span>}
                </button>
                <div className="text-xs text-foreground-subtle mt-0.5 tabular-nums">
                  {item.actuante.tipoDocumento === 'SIN_DOCUMENTO' ? 'Sin documento' : `DNI ${item.actuante.numeroDocumento}`}
                </div>
                <p className="text-sm text-foreground mt-2 mb-3 leading-snug">{item.motivoResumen}</p>
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border text-xs text-foreground-subtle">
                  <span>Asesor <strong className="text-foreground font-semibold">{item.asesorNombre}</strong></span>
                  <span className={larga && item.estado === 'EN_ESPERA' ? 'text-status-danger-text font-semibold' : ''}>
                    Espera <strong className="font-semibold tabular-nums">{item.minutosEspera} min</strong>
                  </span>
                </div>
                {item.estado === 'EN_ESPERA' && !item.derivada && (
                  <button
                    type="button"
                    onClick={() => darPase(item.id)}
                    className="mt-3 w-full h-10 inline-flex items-center justify-center gap-1.5 text-sm font-semibold bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Dar pase <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })
        )}
        <p className="text-xs text-foreground-subtle text-center pt-1">
          Mostrando {filteredAtenciones.length} de {atenciones.length} atenciones del día
        </p>
      </div>

      {/* Tabla densa de Atenciones del día */}
      <div className="hidden md:block bg-surface rounded-card border border-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto max-h-[calc(100vh-280px)]">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-surface-alt border-b border-border sticky top-0 z-10 select-none">
              <tr>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap w-20">
                  Hora
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap min-w-[200px]">
                  Persona (Actuante)
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap min-w-[280px]">
                  Motivo / Problemática
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap min-w-[160px]">
                  Asesor Asignado
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap w-28 text-right">
                  {activeTab === 'EN_ATENCION' ? 'Atención' : 'Espera'}
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap w-32">
                  Estado
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap min-w-[140px]">
                  Origen / Programa
                </th>
                <th scope="col" className="py-3 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] whitespace-nowrap w-36 text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAtenciones.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-foreground-muted">
                    <div className="max-w-sm mx-auto space-y-1">
                      <p className="font-medium text-sm">No hay registros en esta pestaña</p>
                      <p className="text-xs text-foreground-subtle">
                        {searchTerm || selectedAsesor !== 'TODOS'
                          ? 'Probá modificando los filtros de búsqueda.'
                          : 'Las atenciones registradas aparecerán inmediatamente aquí.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAtenciones.map((item) => {
                  const tieneEsperaProlongada = item.minutosEspera > UMBRAL_ESPERA_LARGA_MIN;
                  const chip = estadoVisible(item);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-hover transition-colors group"
                    >
                      {/* 1. Hora */}
                      <td className="py-2.5 px-3 font-mono font-medium text-foreground-muted whitespace-nowrap">
                        {item.horaIngreso} hs
                      </td>

                      {/* 2. Persona (Actuante) */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-start gap-2">
                          {item.esGrupal ? (
                            <span
                              className="p-1 bg-surface-hover text-foreground rounded shrink-0 border border-border"
                              title={`Consulta grupal: ${item.integrantesGrupo?.length || 2} personas`}
                            >
                              <Users className="w-3.5 h-3.5 text-primary" />
                            </span>
                          ) : (
                            <span className="p-1 bg-surface-hover text-foreground-subtle rounded shrink-0 border border-border">
                              <User className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground flex items-center gap-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => openActuanteDrawer(item.actuante.id)}
                                className="hover:text-primary hover:underline text-left text-xs font-semibold"
                              >
                                {item.actuante.apellido}, {item.actuante.nombre}
                              </button>

                              {item.esGrupal && (
                                <span className="px-1.5 py-0.2 bg-primary-subtle text-primary border border-primary-border text-[10px] font-bold rounded">
                                  Grupal ({item.integrantesGrupo?.length || 2})
                                </span>
                              )}
                            </div>

                            <div className="text-[11px] text-foreground-subtle flex items-center gap-2 mt-0.5">
                              <span className="font-mono">
                                {item.actuante.tipoDocumento === 'SIN_DOCUMENTO'
                                  ? 'Sin documento'
                                  : `DNI ${item.actuante.numeroDocumento}`}
                              </span>
                              <span>•</span>
                              <span>{item.actuante.barrio || item.actuante.localidad}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 3. MOTIVO VISIBLE DIRECTAMENTE (Requisito no negociable) */}
                      <td className="py-2.5 px-3">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-foreground leading-snug">
                            {item.motivoResumen}
                          </p>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* Etiqueta Multi-temática */}
                            {item.esMultiTematica && (
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-subtle text-primary border border-primary-border"
                                title={`Atención multi-temática: ${item.cantidadConsultas} consultas`}
                              >
                                Multi-temática ({item.cantidadConsultas})
                              </span>
                            )}

                            {/* Alerta de antecedentes si existe */}
                            {item.actuante.antecedentes?.actuacionAbiertaNumero && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-status-warning-bg text-status-warning-text border border-status-warning-border">
                                Exp. {item.actuante.antecedentes.actuacionAbiertaNumero}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 4. Asesor asignado */}
                      <td className="py-2.5 px-3">
                        <span className="text-xs font-medium text-foreground block">
                          {item.asesorNombre}
                        </span>
                        <span className="text-[11px] text-foreground-subtle">
                          Sede Central
                        </span>
                      </td>

                      {/* 5. Tiempo de espera o demora (en vivo, tabular-nums) */}
                      <td className="py-2.5 px-3 text-right font-mono whitespace-nowrap">
                        {activeTab === 'EN_ATENCION' ? (
                          <div className="text-status-info-text font-bold tabular-nums">
                            {item.minutosAtencion || 0} min
                            <span className="block text-[10px] text-foreground-subtle font-sans">
                              en curso
                            </span>
                          </div>
                        ) : activeTab === 'FINALIZADA' ? (
                          <span className="text-foreground-muted tabular-nums">
                            {item.minutosAtencion ? `${item.minutosAtencion} min` : '—'}
                          </span>
                        ) : (
                          <div
                            className={`font-semibold tabular-nums flex items-center justify-end gap-1 ${
                              tieneEsperaProlongada ? 'text-status-danger-text' : 'text-foreground'
                            }`}
                          >
                            {tieneEsperaProlongada && (
                              <span title="Demora prolongada (> 30 min)" className="inline-flex">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              </span>
                            )}
                            <span>{item.minutosEspera} min</span>
                          </div>
                        )}
                      </td>

                      {/* Estado visible (En espera / Espera larga / Derivada / En atención) */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <StatusChip variant={chip.variant} label={chip.label} />
                      </td>

                      {/* 6. Origen + Marca visual de Programa / Operativo */}
                      <td className="py-2.5 px-3">
                        {item.programaNombre ? (
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-hover border border-border rounded text-[11px] text-foreground">
                            <Truck className="w-3.5 h-3.5 text-primary shrink-0" />
                            <div>
                              <strong className="font-semibold block leading-tight">
                                {item.programaNombre}
                              </strong>
                              <span className="text-[10px] text-foreground-subtle block leading-tight">
                                {item.operativoLugar || 'Operativo territorial'}
                              </span>
                            </div>
                          </div>
                        ) : item.origen === 'TELEFONICA' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-muted">
                            <Phone className="w-3 h-3 text-foreground-subtle" /> Telefónica
                          </span>
                        ) : (
                          <span className="text-[11px] text-foreground-muted">
                            Presencial (Mesa)
                          </span>
                        )}
                      </td>

                      {/* 7. Acciones de fila visibles (No ocultas en menú según Gemini guidelines) */}
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {item.estado === 'EN_ESPERA' && !item.derivada && (
                            <button
                              type="button"
                              onClick={() => darPase(item.id)}
                              className="px-2.5 py-1 text-xs font-semibold bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control transition-colors shadow-subtle focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-1"
                              title="Dar pase al profesional (asíncrono, libera la pantalla al instante)"
                            >
                              <span>Dar pase</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}


                          <button
                            type="button"
                            onClick={() => openActuanteDrawer(item.actuante.id)}
                            className="p-1 text-foreground-subtle hover:text-foreground hover:bg-surface-hover rounded border border-border focus-visible:ring-2 focus-visible:ring-primary"
                            title="Ver ficha completa de la persona en panel lateral"
                            aria-label={`Ver ficha de ${item.actuante.apellido}, ${item.actuante.nombre}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pie informativo de la tabla */}
        <div className="p-3 bg-surface-hover border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground-subtle">
          <div className="flex items-center gap-3">
            <span>
              Mostrando <strong className="text-foreground tabular-nums">{filteredAtenciones.length}</strong> de{' '}
              <strong className="text-foreground tabular-nums">{atenciones.length}</strong> atenciones del día
            </span>
            <span>•</span>
            <span className="text-status-warning-text font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Rojo = demora &gt; {UMBRAL_ESPERA_LARGA_MIN} min
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>Actualización en tiempo real activa</span>
            <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};
