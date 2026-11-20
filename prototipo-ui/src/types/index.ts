export type UserRole = 'MESA_ENTRADAS' | 'ASESOR' | 'ADMINISTRATIVO' | 'SUPERADM';

export type TipoDocumento = 'DNI' | 'LC' | 'LE' | 'PASAPORTE' | 'EXTRANJERO' | 'SIN_DOCUMENTO';

export type Genero = 'M' | 'F' | 'X' | 'NO_DECLARA';

export interface Actuante {
  id: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string; // e.g. "99.123.456" o "—"
  nombre: string;
  apellido: string;
  fechaNacimiento?: string; // YYYY-MM-DD
  genero: Genero;
  telefono: string;
  email?: string;
  direccion: string;
  barrio: string;
  localidad: string;
  observaciones?: string;
  // Antecedentes detectados para ME y Asesor
  antecedentes?: {
    asesorPrevio?: string;
    actuacionAbiertaId?: string;
    actuacionAbiertaNumero?: string;
    documentacionPendiente?: string;
    alertas?: string[];
  };
}

export type EstadoAtencion = 'EN_ESPERA' | 'EN_ATENCION' | 'FINALIZADA' | 'SIN_ATENDER';
export type OrigenAtencion = 'PRESENCIAL' | 'TELEFONICA' | 'PROGRAMA' | 'OFICIO';

export interface AtencionItem {
  /** Pase dado por Mesa de Entradas: la persona espera al profesional (estado visible "Derivada"). */
  derivada?: boolean;
  id: string;
  horaIngreso: string; // HH:MM
  horaAtencionInicio?: string;
  horaAtencionFin?: string;
  estado: EstadoAtencion;
  actuante: Actuante;
  esGrupal: boolean;
  integrantesGrupo?: Actuante[];
  motivoResumen: string;
  asesorId: string;
  asesorNombre: string;
  origen: OrigenAtencion;
  // Defensoría Móvil u operativo territorial
  programaNombre?: string; // ej. "Defensoría Móvil"
  operativoLugar?: string; // ej. "SUM Barrio Malvinas, Perico"
  // Multi-temática
  esMultiTematica: boolean;
  cantidadConsultas: number;
  consultasResumen?: string[];
  notasMesaEntradas?: string;
  // Tiempo de espera en minutos (para cálculo de demora)
  minutosEspera: number;
  minutosAtencion?: number;
}

export interface NomencladorItem {
  id: string;
  area: string;
  grupo: string;
  tema: string;
  subtema?: string;
}

export type TipoTramiteCategoria =
  | '1. Borradores y Trabajos'
  | '2. Notas y Oficios Emitidos'
  | '3. Notas y Oficios Recibidos'
  | '4. Pedidos de Informe'
  | '5. Actas y Gestiones Físicas'
  | '6. Informes Técnicos'
  | '7. Resoluciones y Cierres';

export type CursoTramite = 'ENTRADA' | 'SALIDA' | 'INTERNO';
export type AmbitoTramite = 'NACIONAL' | 'PROVINCIAL' | 'MUNICIPAL' | 'PRIVADO' | 'PARTICULAR' | 'OTRO';

export type EstadoTramite =
  | 'BORRADOR'
  | 'EN_REVISION'
  | 'DEFINITIVO'
  | 'VENCIDO'
  | 'PRORROGADO'
  | 'RESPONDIDO'
  | 'ANULADO'
  | 'EN_CAMPO';

export interface Tramite {
  id: string;
  actuacionId: string;
  categoria: TipoTramiteCategoria;
  tipoDetallado: string;
  curso: CursoTramite;
  ambito: AmbitoTramite;
  ambitoDescripcion?: string;
  estado: EstadoTramite;
  numeroLibroDiario?: string; // ej. "LD-2026-0842"
  fechaCreacion: string;
  destinatario?: string; // Organismo / persona
  fechaVencimiento?: string;
  diasHabilesRestantes?: number;
  plazoDescripcion?: string; // ej. "5 días hábiles"
  esPedidoInforme?: boolean;
  reiteracionNro?: number; // 0 = base, 1 = 1ra, 2 = 2da
  fueCorregido?: boolean;
  versionAnterior?: {
    fecha: string;
    autor: string;
    motivo: string;
  };
}

export type TipoActuacion = 'SERVICIO' | 'CONFLICTO';
export type EstadoActuacion = 'EN_INSTRUCCION' | 'CON_DICTAMEN' | 'CERRADA_SERVICIO' | 'ARCHIVADA';

export interface Actuacion {
  id: string;
  numeroOficial: string; // ej. "142/2026"
  caratula: string;
  tipo: TipoActuacion;
  estado: EstadoActuacion;
  asesorId: string;
  asesorNombre: string;
  actuantePrincipal: Actuante;
  fechaInicio: string;
  fechaCierre?: string;
  organismoInvolucrado?: string;
  resumenHechos: string;
  tramitesCount: number;
}
