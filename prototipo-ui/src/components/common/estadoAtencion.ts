import type { AtencionItem } from '../../types';
import type { StatusVariant } from './StatusChip';

/** Minutos de espera a partir de los cuales se marca "Espera larga" (pasará a ser configurable). */
export const UMBRAL_ESPERA_LARGA_MIN = 30;

/** Estado visible de una atención en la cola (derivado, nunca guardado). */
export function estadoVisible(item: AtencionItem): { variant: StatusVariant; label: string } {
  if (item.estado === 'EN_ATENCION') return { variant: 'success', label: 'En atención' };
  if (item.estado === 'FINALIZADA') return { variant: 'neutral', label: 'Finalizada' };
  if (item.estado === 'SIN_ATENDER') return { variant: 'danger', label: 'Sin atender' };
  if (item.derivada) return { variant: 'violet', label: 'Derivada' };
  if (item.minutosEspera > UMBRAL_ESPERA_LARGA_MIN) return { variant: 'warning', label: 'Espera larga' };
  return { variant: 'info', label: 'En espera' };
}
