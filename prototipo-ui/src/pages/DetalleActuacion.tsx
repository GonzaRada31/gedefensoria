import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  User,
  Building,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  History,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Share2,
  AlertTriangle,
  RotateCcw,
  Check
} from 'lucide-react';
import { MOCK_ACTUACIONES } from '../mocks/actuaciones';
import { MOCK_TRAMITES } from '../mocks/tramites';
import { StatusChip } from '../components/common/StatusChip';
import { Tramite, EstadoTramite } from '../types';

export const DetalleActuacion: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Buscar actuación o usar por defecto la 118/2026 (exp-101)
  const actuacion =
    MOCK_ACTUACIONES.find((exp) => exp.id === id || exp.numeroOficial.replace('/', '-') === id) ||
    MOCK_ACTUACIONES[0];

  const [activeTab, setActiveTab] = useState<'resumen' | 'tramites' | 'circuito' | 'adjuntos' | 'historial'>('tramites');
  const [verCorregidos, setVerCorregidos] = useState(false);
  const [tramitesList, setTramitesList] = useState<Tramite[]>(
    MOCK_TRAMITES.filter((t) => t.actuacionId === actuacion.id)
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Acción para generar reiteración en 1 clic (clonando)
  const handleGenerarReiteracion = (tramiteBase: Tramite) => {
    const nuevoNivel = (tramiteBase.reiteracionNro || 1) + 1;
    const nuevoTramite: Tramite = {
      id: `tra-${Date.now()}`,
      actuacionId: actuacion.id,
      categoria: '4. Pedidos de Informe',
      tipoDetallado: `${nuevoNivel}ª Reiteración`,
      curso: 'SALIDA',
      ambito: tramiteBase.ambito,
      ambitoDescripcion: tramiteBase.ambitoDescripcion,
      estado: 'BORRADOR',
      fechaCreacion: new Date().toISOString().split('T')[0],
      destinatario: tramiteBase.destinatario,
      plazoDescripcion: '48 horas hábiles',
      esPedidoInforme: true,
      reiteracionNro: nuevoNivel,
      fueCorregido: false,
    };

    setTramitesList((prev) => [nuevoTramite, ...prev]);
    showToast(`Se generó automáticamente la ${nuevoNivel}ª Reiteración en Borrador.`);
  };

  return (
    <div className="space-y-5 max-w-[1540px] mx-auto pb-12">
      {/* Toast local de aviso */}
      {toastMsg && (
        <div className="fixed top-16 right-4 z-50 bg-surface border border-primary text-foreground text-xs p-3 rounded-card shadow-dropdown flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ENCABEZADO DE LA ACTUACIÓN (Requisito no negociable) */}
      <div className="bg-surface border border-border rounded-card p-4 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary-subtle text-primary border border-primary-border rounded-card">
              <FileText className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Actuación {actuacion.numeroOficial}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary-border">
                  {actuacion.tipo === 'CONFLICTO' ? 'Actuación de Conflicto' : 'Actuación de Servicio'}
                </span>
                <StatusChip
                  variant={actuacion.estado === 'EN_INSTRUCCION' ? 'info' : 'success'}
                  label={actuacion.estado === 'EN_INSTRUCCION' ? 'En Instrucción' : 'Cerrada'}
                />
              </div>
              <p className="text-xs text-foreground-muted mt-0.5">
                Iniciada el {actuacion.fechaInicio} • Asesor a cargo: <strong>{actuacion.asesorNombre}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/atencion/cola"
              className="px-3 py-1.5 border border-border rounded-control text-xs text-foreground-muted hover:text-foreground hover:bg-surface-hover"
            >
              Volver a Atenciones del día
            </Link>
          </div>
        </div>

        {/* Carátula Oficial */}
        <div className="p-3 bg-surface-hover rounded-control border border-border">
          <span className="text-2xs font-bold text-foreground-subtle uppercase tracking-wider block mb-1">
            Carátula Oficial
          </span>
          <p className="font-display font-semibold text-sm text-foreground leading-snug">
            {actuacion.caratula}
          </p>
        </div>

        {/* Datos clave del expediente */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 bg-surface-hover rounded-control border border-border">
            <span className="text-foreground-subtle block text-2xs uppercase">Actuante</span>
            <span className="font-semibold text-foreground">
              {actuacion.actuantePrincipal.apellido}, {actuacion.actuantePrincipal.nombre}
            </span>
            <span className="block text-2xs text-foreground-muted font-mono">
              DNI {actuacion.actuantePrincipal.numeroDocumento}
            </span>
          </div>

          <div className="p-2.5 bg-surface-hover rounded-control border border-border">
            <span className="text-foreground-subtle block text-2xs uppercase">Organismo / Entidad Reclamada</span>
            <span className="font-semibold text-foreground">
              {actuacion.organismoInvolucrado || '—'}
            </span>
            <span className="block text-2xs text-foreground-muted">Sede Jujuy</span>
          </div>

          <div className="p-2.5 bg-surface-hover rounded-control border border-border">
            <span className="text-foreground-subtle block text-2xs uppercase">Volumen de Trámites</span>
            <span className="font-semibold text-foreground">
              {tramitesList.length} gestiones registradas
            </span>
            <span className="block text-2xs text-foreground-muted">Libro Diario Digital correlativo</span>
          </div>
        </div>
      </div>

      {/* PESTAÑAS (Resumen · Trámites · Circuito · Adjuntos · Historial) */}
      <div className="flex border-b border-border text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('tramites')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'tramites'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Trámites ({tramitesList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('resumen')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'resumen'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Resumen de Hechos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('circuito')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'circuito'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Circuito (Pases)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('adjuntos')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'adjuntos'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <Paperclip className="w-4 h-4" />
          <span>Adjuntos (2)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('historial')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'historial'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Historial de Auditoría</span>
        </button>
      </div>

      {/* PESTAÑA TRÁMITES (Requisito central de la pantalla 7) */}
      {activeTab === 'tramites' && (
        <div className="space-y-4">
          {/* Barra de Controles de la Tabla de Trámites */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface p-3 rounded-card border border-border shadow-subtle text-xs">
            <div className="flex items-center gap-3">
              {/* Switch "Ver trámites corregidos" */}
              <label className="inline-flex items-center gap-2 text-foreground font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={verCorregidos}
                  onChange={(e) => setVerCorregidos(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                />
                <span>Ver versiones corregidas / históricas</span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => showToast('Abriendo catálogo de los 31 tipos agrupados en 7 categorías.')}
              className="px-3.5 py-1.5 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold rounded-control transition-colors shadow-subtle flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Nuevo trámite</span>
            </button>
          </div>

          {/* Tabla Densa de Trámites */}
          <div className="bg-surface rounded-card border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-surface-alt border-b border-border select-none">
                  <tr>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px]">
                      Tipo (7 Categorías)
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] w-24">
                      Curso
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px]">
                      Estado
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px]">
                      Libro Diario
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px]">
                      Destinatario
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px]">
                      Vencimiento / Semáforo
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-semibold text-foreground-muted uppercase tracking-wider text-[11px] text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tramitesList.map((tr) => {
                    const esVencido = tr.estado === 'VENCIDO';
                    const vencePronto = tr.diasHabilesRestantes !== undefined && tr.diasHabilesRestantes <= 2 && tr.diasHabilesRestantes > 0;
                    const puedeReiterar = tr.esPedidoInforme && (esVencido || vencePronto) && (tr.reiteracionNro || 0) < 2;

                    return (
                      <React.Fragment key={tr.id}>
                        <tr className="hover:bg-surface-hover transition-colors">
                          {/* 1. Categoría y Tipo detallado */}
                          <td className="py-2.5 px-3">
                            <span className="font-semibold text-foreground block">
                              {tr.tipoDetallado}
                            </span>
                            <span className="text-2xs text-foreground-subtle block">
                              {tr.categoria}
                            </span>
                          </td>

                          {/* 2. Curso */}
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              tr.curso === 'SALIDA'
                                ? 'bg-primary-subtle text-primary border border-primary-border'
                                : tr.curso === 'ENTRADA'
                                ? 'bg-status-success-bg text-status-success-text border border-status-success-border'
                                : 'bg-surface-hover text-foreground-muted border border-border'
                            }`}>
                              {tr.curso}
                            </span>
                          </td>

                          {/* 3. Estado como chip con color + texto */}
                          <td className="py-2.5 px-3">
                            <StatusChip
                              variant={
                                tr.estado === 'DEFINITIVO'
                                  ? 'success'
                                  : tr.estado === 'VENCIDO'
                                  ? 'danger'
                                  : tr.estado === 'BORRADOR'
                                  ? 'neutral'
                                  : 'warning'
                              }
                              label={tr.estado}
                            />
                          </td>

                          {/* 4. Número del Libro Diario */}
                          <td className="py-2.5 px-3 font-mono font-medium">
                            {tr.numeroLibroDiario ? (
                              <span className="text-foreground">{tr.numeroLibroDiario}</span>
                            ) : (
                              <span className="text-foreground-subtle">— (En borrador)</span>
                            )}
                          </td>

                          {/* 5. Destinatario */}
                          <td className="py-2.5 px-3 text-foreground-muted">
                            {tr.destinatario || '—'}
                          </td>

                          {/* 6. Vencimiento con Semáforo y Texto explicativo */}
                          <td className="py-2.5 px-3">
                            {tr.fechaVencimiento ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 font-medium">
                                  {esVencido ? (
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" title="Semáforo Rojo: Vencido" />
                                  ) : vencePronto ? (
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" title="Semáforo Amarillo: Próximo a vencer" />
                                  ) : (
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Semáforo Verde: A tiempo" />
                                  )}
                                  <span className={`font-semibold ${
                                    esVencido ? 'text-status-danger-text' : vencePronto ? 'text-status-warning-text' : 'text-foreground'
                                  }`}>
                                    {tr.fechaVencimiento}
                                  </span>
                                </div>
                                <span className="block text-2xs text-foreground-subtle">
                                  {esVencido
                                    ? 'Plazo vencido sin respuesta'
                                    : tr.diasHabilesRestantes === 2
                                    ? 'Vence en 2 días hábiles'
                                    : tr.plazoDescripcion || 'En término'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-foreground-subtle">—</span>
                            )}
                          </td>

                          {/* 7. Acciones */}
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            {puedeReiterar && (
                              <button
                                type="button"
                                onClick={() => handleGenerarReiteracion(tr)}
                                className="px-2.5 py-1 text-xs font-semibold bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover rounded-control transition-colors shadow-subtle inline-flex items-center gap-1"
                                title="Genera la siguiente reiteración clonando el contenido"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Generar reiteración</span>
                              </button>
                            )}
                          </td>
                        </tr>

                        {/* Fila expandida de versión corregida si el switch está activo */}
                        {verCorregidos && tr.fueCorregido && tr.versionAnterior && (
                          <tr className="bg-amber-50/40 dark:bg-amber-950/20 text-xs">
                            <td colSpan={7} className="py-2 px-4 border-l-4 border-amber-500">
                              <div className="flex items-center gap-2 text-2xs text-foreground-muted">
                                <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>
                                  <strong>Versión anterior ({tr.versionAnterior.fecha})</strong> por {tr.versionAnterior.autor}: {tr.versionAnterior.motivo}
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA RESUMEN */}
      {activeTab === 'resumen' && (
        <div className="bg-surface p-5 rounded-card border border-border space-y-4 text-xs">
          <h3 className="font-bold text-sm text-foreground">Resumen de los Hechos</h3>
          <p className="text-foreground-muted leading-relaxed">
            {actuacion.resumenHechos}
          </p>
          <div className="pt-3 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-foreground-subtle block">Normativa aplicable:</span>
              <span className="text-foreground">Ley Provincial N° 6380 • Ley Nacional N° 27.351 (Electrodependientes)</span>
            </div>
            <div>
              <span className="font-semibold text-foreground-subtle block">Competencia:</span>
              <span className="text-foreground">Servicios Públicos Provinciales y Defensa de Derechos Colectivos</span>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA CIRCUITO (PASES) */}
      {activeTab === 'circuito' && (
        <div className="bg-surface p-5 rounded-card border border-border space-y-4 text-xs">
          <h3 className="font-bold text-sm text-foreground">Circuito de Pases Internos</h3>
          <div className="relative border-l-2 border-border ml-3 pl-4 space-y-4">
            <div className="relative">
              <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-primary-solid" />
              <div className="font-semibold text-foreground">Mesa de Entradas &gt; Asesoría Jurídica</div>
              <p className="text-2xs text-foreground-subtle">05/11/2026 08:30 hs • Operador: Romina Mamaní • Motivo: Apertura de actuación por corte intempestivo</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-500" />
              <div className="font-semibold text-foreground">Asesoría Jurídica &gt; Secretaría Privada</div>
              <p className="text-2xs text-foreground-subtle">17/11/2026 11:20 hs • Operador: Dr. Gonzalo Morales • Motivo: Firma de oficio y salida de 1ª Reiteración</p>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA ADJUNTOS */}
      {activeTab === 'adjuntos' && (
        <div className="bg-surface p-5 rounded-card border border-border space-y-3 text-xs">
          <h3 className="font-bold text-sm text-foreground">Documentos Digitalizados</h3>
          <ul className="divide-y divide-border border border-border rounded-control">
            <li className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-foreground-subtle" />
                <span className="font-medium text-foreground">Certificado_Electrodependencia_2026.pdf</span>
              </div>
              <span className="text-2xs text-foreground-subtle">1.2 MB • Digitalizado en Mesa</span>
            </li>
            <li className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-foreground-subtle" />
                <span className="font-medium text-foreground">Factura_EJESA_Noviembre_Impaga.pdf</span>
              </div>
              <span className="text-2xs text-foreground-subtle">840 KB • Adjunto</span>
            </li>
          </ul>
        </div>
      )}

      {/* PESTAÑA HISTORIAL */}
      {activeTab === 'historial' && (
        <div className="bg-surface p-5 rounded-card border border-border space-y-3 text-xs">
          <h3 className="font-bold text-sm text-foreground">Auditoría del Expediente</h3>
          <div className="text-2xs text-foreground-subtle space-y-1">
            <p>• 05/11/2026 08:15 — Creación de actuación por Romina Mamaní (Mesa de Entradas)</p>
            <p>• 06/11/2026 09:40 — Emisión de Pedido de Informe LD-2026-0512 por Dr. Gonzalo Morales</p>
            <p>• 17/11/2026 16:30 — Modificación y aprobación de 1ª Reiteración LD-2026-0589 por Hugo Aparicio</p>
          </div>
        </div>
      )}
    </div>
  );
};
