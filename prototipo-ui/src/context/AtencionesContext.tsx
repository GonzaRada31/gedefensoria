import React, { createContext, useContext, useState, useEffect } from 'react';
import { AtencionItem, EstadoAtencion } from '../types';
import { MOCK_ATENCIONES } from '../mocks/atenciones';

interface ToastNotice {
  id: string;
  tipo: 'success' | 'info' | 'warning';
  titulo: string;
  mensaje: string;
}

interface AtencionesContextType {
  atenciones: AtencionItem[];
  darPase: (atencionId: string) => void;
  tomarAtencion: (atencionId: string) => void;
  finalizarAtencion: (atencionId: string) => void;
  marcarSinAtender: (atencionId: string) => void;
  agregarAtencion: (item: Omit<AtencionItem, 'id' | 'minutosEspera'>) => void;
  toasts: ToastNotice[];
  removeToast: (id: string) => void;
  addToast: (tipo: 'success' | 'info' | 'warning', titulo: string, mensaje: string) => void;
  contadores: {
    enEspera: number;
    enAtencion: number;
    finalizadas: number;
    sinAtender: number;
  };
}

const AtencionesContext = createContext<AtencionesContextType | undefined>(undefined);

export const AtencionesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [atenciones, setAtenciones] = useState<AtencionItem[]>(MOCK_ATENCIONES);
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  // Contador de tiempo de espera "en vivo" (simulado para ergonomía visual en el turno)
  useEffect(() => {
    const timer = setInterval(() => {
      setAtenciones((prev) =>
        prev.map((item) => {
          if (item.estado === 'EN_ESPERA') {
            return { ...item, minutosEspera: item.minutosEspera + 1 };
          }
          if (item.estado === 'EN_ATENCION') {
            return {
              ...item,
              minutosAtencion: (item.minutosAtencion || 0) + 1,
            };
          }
          return item;
        })
      );
    }, 60000); // Cada minuto actualiza el tiempo de espera
    return () => clearInterval(timer);
  }, []);

  const addToast = (tipo: 'success' | 'info' | 'warning', titulo: string, mensaje: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, tipo, titulo, mensaje }]);
    // 5 segundos de visibilidad y se cierra
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Pase asíncrono que libera inmediatamente la pantalla de Mesa de Entradas
  const darPase = (atencionId: string) => {
    const target = atenciones.find((a) => a.id === atencionId);
    if (!target) return;

    // El pase deja la atención "Derivada": sigue esperando hasta que el profesional la toma
    setAtenciones((prev) =>
      prev.map((a) => (a.id === atencionId ? { ...a, derivada: true } : a))
    );

    addToast(
      'success',
      'Pase transmitido con éxito',
      `Se derivó a ${target.actuante.apellido}, ${target.actuante.nombre} hacia ${target.asesorNombre}. La pantalla quedó liberada al instante.`
    );
  };

  const tomarAtencion = (atencionId: string) => {
    const target = atenciones.find((a) => a.id === atencionId);
    if (!target) return;

    setAtenciones((prev) =>
      prev.map((a) => {
        if (a.id === atencionId) {
          return {
            ...a,
            estado: 'EN_ATENCION',
            horaAtencionInicio: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
            minutosAtencion: 0,
          };
        }
        return a;
      })
    );

    addToast(
      'info',
      'Atención en curso iniciada',
      `Iniciaste la atención de ${target.actuante.apellido}, ${target.actuante.nombre}.`
    );
  };

  const finalizarAtencion = (atencionId: string) => {
    setAtenciones((prev) =>
      prev.map((a) => {
        if (a.id === atencionId) {
          return {
            ...a,
            estado: 'FINALIZADA',
            horaAtencionFin: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return a;
      })
    );

    addToast('success', 'Atención finalizada', 'Se registró el cierre de la consulta.');
  };

  const marcarSinAtender = (atencionId: string) => {
    setAtenciones((prev) =>
      prev.map((a) => {
        if (a.id === atencionId) {
          return { ...a, estado: 'SIN_ATENDER' };
        }
        return a;
      })
    );
    addToast('warning', 'Turno marcado como sin atender', 'El actuante salió de las atenciones activas.');
  };

  const agregarAtencion = (item: Omit<AtencionItem, 'id' | 'minutosEspera'>) => {
    const nueva: AtencionItem = {
      ...item,
      id: `ate-${Date.now()}`,
      minutosEspera: 0,
    };
    setAtenciones((prev) => [nueva, ...prev]);
    addToast('success', 'Atención registrada', `Se sumó a las atenciones de ${item.asesorNombre}.`);
  };

  const contadores = {
    enEspera: atenciones.filter((a) => a.estado === 'EN_ESPERA').length,
    enAtencion: atenciones.filter((a) => a.estado === 'EN_ATENCION').length,
    finalizadas: atenciones.filter((a) => a.estado === 'FINALIZADA').length,
    sinAtender: atenciones.filter((a) => a.estado === 'SIN_ATENDER').length,
  };

  return (
    <AtencionesContext.Provider
      value={{
        atenciones,
        darPase,
        tomarAtencion,
        finalizarAtencion,
        marcarSinAtender,
        agregarAtencion,
        toasts,
        removeToast,
        addToast,
        contadores,
      }}
    >
      {children}
    </AtencionesContext.Provider>
  );
};

export const useAtenciones = () => {
  const context = useContext(AtencionesContext);
  if (!context) {
    throw new Error('useAtenciones must be used within an AtencionesProvider');
  }
  return context;
};
