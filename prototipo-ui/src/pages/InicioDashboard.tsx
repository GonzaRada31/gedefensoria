import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Truck,
  Building,
  Shield,
  BookOpen
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useAtenciones } from '../context/AtencionesContext';
import { PageHeader } from '../components/common/PageHeader';

interface KPICardProps {
  titulo: string;
  valor: number | string;
  variacion?: string;
  variacionPositiva?: boolean;
  icono: React.ReactNode;
  accionTexto: string;
  onClick: () => void;
  alerta?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  titulo,
  valor,
  variacion,
  variacionPositiva,
  icono,
  accionTexto,
  onClick,
  alerta,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`bg-surface p-4 sm:p-5 rounded-card border transition-all cursor-pointer group shadow-card hover:bg-surface-hover ${
        alerta ? 'border-status-danger-border' : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-2xs font-bold text-foreground-subtle uppercase tracking-wider block mb-1">
            {titulo}
          </span>
          <div className="text-3xl font-bold font-display text-foreground tabular-nums tracking-tight">
            {valor}
          </div>
        </div>
        <div className={`p-2.5 rounded-card border ${
          alerta
            ? 'bg-status-danger-bg text-status-danger-text border-status-danger-border'
            : 'bg-primary-subtle text-primary border-primary-border'
        }`}>
          {icono}
        </div>
      </div>

      {variacion && (
        <div className="mt-3 flex items-center gap-1.5 text-2xs text-foreground-muted">
          <TrendingUp className={`w-3.5 h-3.5 ${variacionPositiva ? 'text-emerald-600' : 'text-foreground-subtle'}`} />
          <span>{variacion}</span>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary group-hover:underline">
        <span>{accionTexto}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
};

export const InicioDashboard: React.FC = () => {
  const { role, user } = useRole();
  const { contadores } = useAtenciones();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-[1540px] mx-auto pb-12">
      {/* Cabecera del Inicio */}
      <PageHeader
        eyebrow="Inicio"
        title="Panel de control"
        subtitle={<>Métricas operativas accionables para tu perfil: <strong>{user.sector}</strong>.</>}
        actions={
          <div className="flex items-center gap-2 text-sm text-foreground-subtle">
            <Building className="w-4 h-4" />
            <span className="hidden sm:inline">Sede Central San Salvador de Jujuy</span>
          </div>
        }
      />

      {/* TARJETAS DE KPI ACCIONABLES POR ROL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === 'MESA_ENTRADAS' && (
          <>
            <KPICard
              titulo="En espera en Mesa"
              valor={contadores.enEspera}
              variacion="Tiempo promedio: 14 min"
              icono={<Clock className="w-5 h-5" />}
              accionTexto="Ver atenciones en espera"
              onClick={() => navigate('/atencion/cola')}
            />
            <KPICard
              titulo="En atención en despachos"
              valor={contadores.enAtencion}
              variacion="5 asesores atendiendo"
              icono={<Users className="w-5 h-5" />}
              accionTexto="Monitorear atenciones"
              onClick={() => navigate('/atencion/cola')}
            />
            <KPICard
              titulo="Atenciones finalizadas hoy"
              valor={contadores.finalizadas}
              variacion="+18 % vs. ayer"
              variacionPositiva
              icono={<CheckCircle2 className="w-5 h-5" />}
              accionTexto="Ver historial de hoy"
              onClick={() => navigate('/atencion/cola')}
            />
            <KPICard
              titulo="Demoras prolongadas (>30m)"
              valor={1}
              variacion="Norma Condorí (32 min)"
              icono={<AlertTriangle className="w-5 h-5" />}
              alerta
              accionTexto="Priorizar derivación"
              onClick={() => navigate('/atencion/cola')}
            />
          </>
        )}

        {role === 'ASESOR' && (
          <>
            <KPICard
              titulo="Personas en mi espera"
              valor={misEsperaCount(contadores.enEspera)}
              variacion="4 en atenciones del día"
              icono={<Users className="w-5 h-5" />}
              accionTexto="Ir a mi bandeja"
              onClick={() => navigate('/asesor/bandeja')}
            />
            <KPICard
              titulo="Pedidos por vencer (≤ 2 días)"
              valor={2}
              variacion="EJESA 1ª Reiteración"
              icono={<Clock className="w-5 h-5" />}
              alerta
              accionTexto="Ver trámites urgentes"
              onClick={() => navigate('/expedientes/118-2026')}
            />
            <KPICard
              titulo="Actuaciones activas a cargo"
              valor={12}
              variacion="8 de Conflicto • 4 de Servicio"
              icono={<FileText className="w-5 h-5" />}
              accionTexto="Ver mis actuaciones"
              onClick={() => navigate('/expedientes/118-2026')}
            />
            <KPICard
              titulo="Consultas atendidas este mes"
              valor={48}
              variacion="+12 % vs. mes anterior"
              variacionPositiva
              icono={<CheckCircle2 className="w-5 h-5" />}
              accionTexto="Ver informe mensual"
              onClick={() => navigate('/atencion/cola')}
            />
          </>
        )}

        {role === 'ADMINISTRATIVO' && (
          <>
            <KPICard
              titulo="Trámites en revisión"
              valor={6}
              variacion="3 borradores pendientes"
              icono={<FileText className="w-5 h-5" />}
              accionTexto="Revisar y numerar"
              onClick={() => navigate('/expedientes/118-2026')}
            />
            <KPICard
              titulo="Libro Diario (Asientos hoy)"
              valor={14}
              variacion="Último: LD-2026-0589"
              icono={<BookOpen className="w-5 h-5" />}
              accionTexto="Ver Libro Diario"
              onClick={() => navigate('/expedientes/118-2026')}
            />
            <KPICard
              titulo="Reiteraciones a despachar"
              valor={3}
              variacion="2 con plazo vencido"
              icono={<AlertTriangle className="w-5 h-5" />}
              alerta
              accionTexto="Gestionar despachos"
              onClick={() => navigate('/expedientes/118-2026')}
            />
            <KPICard
              titulo="Sin movimiento > 15 días"
              valor={2}
              variacion="Revisión de archivo"
              icono={<Clock className="w-5 h-5" />}
              accionTexto="Auditar expedientes"
              onClick={() => navigate('/expedientes/118-2026')}
            />
          </>
        )}

        {role === 'SUPERADM' && (
          <>
            <KPICard
              titulo="Total consultas del día"
              valor={contadores.enEspera + contadores.enAtencion + contadores.finalizadas}
              variacion="Promedio diario normal"
              icono={<Users className="w-5 h-5" />}
              accionTexto="Ver atenciones del día"
              onClick={() => navigate('/atencion/cola')}
            />
            <KPICard
              titulo="Actuaciones activas provinciales"
              valor={142}
              variacion="Sede Central y Delegaciones"
              icono={<FileText className="w-5 h-5" />}
              accionTexto="Explorar expedientes"
              onClick={() => navigate('/expedientes/118-2026')}
            />
            <KPICard
              titulo="Operativos Defensoría Móvil"
              valor={8}
              variacion="110 en el año (2.452 consultas)"
              icono={<Truck className="w-5 h-5" />}
              accionTexto="Ver informe territorial"
              onClick={() => navigate('/programas/defensoria-movil')}
            />
            <KPICard
              titulo="Incidentes de seguridad / integridad"
              valor="—"
              variacion="Sistema íntegro y auditado"
              variacionPositiva
              icono={<Shield className="w-5 h-5" />}
              accionTexto="Ver eventos de auditoría"
              onClick={() => navigate('/atencion/cola')}
            />
          </>
        )}
      </div>

      {/* SECCIÓN INFORMATIVA DE OPERATIVIDAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-surface p-4 sm:p-5 rounded-card border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <span>Programa Defensoría Móvil — Próximas Salidas</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-primary-subtle text-primary text-[10px] font-bold">
              Territorio
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-surface-hover rounded-control border border-border flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">SUM Barrio Malvinas — Perico</span>
                <span className="text-foreground-subtle text-2xs">Turno Mañana (08:30 a 13:00 hs) • 4 asesores en equipo</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-2xs font-semibold">
                Activo hoy
              </span>
            </div>

            <div className="p-2.5 bg-surface-hover rounded-control border border-border flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">Centro Vecinal San Cayetano — Palpalá</span>
                <span className="text-foreground-subtle text-2xs">Viernes 21/11 • Asesoramiento y Tarifa Social</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface text-foreground-muted border border-border text-2xs">
                Programado
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface p-4 sm:p-5 rounded-card border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Marco Normativo y Pautas de Atención</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-surface-hover text-foreground-muted text-[10px] font-medium">
              Ley 6380
            </span>
          </div>

          <p className="text-foreground-muted leading-relaxed">
            Recordatorio institucional: toda atención debe preservar el trato no revictimizante hacia el actuante y respetar la Ley 25.326 de Protección de Datos Personales. Ante situaciones de violencia intrafamiliar o urgencia médica (electrodependencia), priorizar derivación inmediata.
          </p>

          <div className="pt-2 flex items-center justify-between text-2xs text-foreground-subtle border-t border-border">
            <span>Delegación Jujuy Sede Central</span>
            <span className="font-mono">IP: 192.168.1.138 (Intranet Segura)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function misEsperaCount(total: number) {
  return Math.max(1, Math.min(total, 3));
}
