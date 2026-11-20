import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

export interface UserInfo {
  id: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  sector: string;
  delegacion: string;
}

const USERS_BY_ROLE: Record<UserRole, UserInfo> = {
  MESA_ENTRADAS: {
    id: 'emp-5',
    nombre: 'Romina',
    apellido: 'Mamaní',
    rol: 'MESA_ENTRADAS',
    sector: 'Mesa de Entradas General',
    delegacion: 'Sede Central (San Salvador)',
  },
  ASESOR: {
    id: 'emp-1',
    nombre: 'Gonzalo',
    apellido: 'Morales',
    rol: 'ASESOR',
    sector: 'Asesoría Jurídica y Servicios Públicos',
    delegacion: 'Sede Central (San Salvador)',
  },
  ADMINISTRATIVO: {
    id: 'emp-6',
    nombre: 'Hugo',
    apellido: 'Aparicio',
    rol: 'ADMINISTRATIVO',
    sector: 'Administración y Trámites',
    delegacion: 'Sede Central (San Salvador)',
  },
  SUPERADM: {
    id: 'emp-7',
    nombre: 'Carla',
    apellido: 'Flores',
    rol: 'SUPERADM',
    sector: 'Superadministración y Sistemas',
    delegacion: 'Sede Central (San Salvador)',
  },
};

interface RoleContextType {
  role: UserRole;
  user: UserInfo;
  setRole: (role: UserRole) => void;
  // Simulación de alertas de sesión (Requisito Pantalla 1)
  sessionModalOpen: boolean;
  setSessionModalOpen: (open: boolean) => void;
  inactivityModalOpen: boolean;
  setInactivityModalOpen: (open: boolean) => void;
  // Drawer de ficha de persona global
  selectedActuanteId: string | null;
  openActuanteDrawer: (actuanteId: string) => void;
  closeActuanteDrawer: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('MESA_ENTRADAS');
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [inactivityModalOpen, setInactivityModalOpen] = useState(false);
  const [selectedActuanteId, setSelectedActuanteId] = useState<string | null>(null);

  const user = USERS_BY_ROLE[role];

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const openActuanteDrawer = (actuanteId: string) => {
    setSelectedActuanteId(actuanteId);
  };

  const closeActuanteDrawer = () => {
    setSelectedActuanteId(null);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        user,
        setRole,
        sessionModalOpen,
        setSessionModalOpen,
        inactivityModalOpen,
        setInactivityModalOpen,
        selectedActuanteId,
        openActuanteDrawer,
        closeActuanteDrawer,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
