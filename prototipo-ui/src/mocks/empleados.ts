export interface EmpleadoMock {
  id: string;
  nombre: string;
  apellido: string;
  sector: string;
  rol: 'ASESOR' | 'ADMINISTRATIVO' | 'MESA_ENTRADAS' | 'SUPERADM';
  profesion: string;
  activo: boolean;
  delegacion: string;
}

export const MOCK_EMPLEADOS: EmpleadoMock[] = [
  { id: 'emp-1', nombre: 'Gonzalo', apellido: 'Morales', sector: 'Asesores Legales', rol: 'ASESOR', profesion: 'Abogado', activo: true, delegacion: 'Sede Central (San Salvador)' },
  { id: 'emp-2', nombre: 'Silvina', apellido: 'Quipildor', sector: 'Asesores Sociales', rol: 'ASESOR', profesion: 'Trabajadora Social', activo: true, delegacion: 'Sede Central (San Salvador)' },
  { id: 'emp-3', nombre: 'Martín', apellido: 'Vilca', sector: 'Asesores Psicosociales', rol: 'ASESOR', profesion: 'Psicólogo', activo: true, delegacion: 'Sede Central (San Salvador)' },
  { id: 'emp-4', nombre: 'Valeria', apellido: 'Cruz', sector: 'Asesores Legales', rol: 'ASESOR', profesion: 'Abogada', activo: true, delegacion: 'Sede Central (San Salvador)' },
  { id: 'emp-5', nombre: 'Romina', apellido: 'Mamaní', sector: 'Mesa de Entradas', rol: 'MESA_ENTRADAS', profesion: 'Técnica Administrativa', activo: true, delegacion: 'Sede Central (San Salvador)' },
  { id: 'emp-6', nombre: 'Hugo', apellido: 'Aparicio', sector: 'Administración y Pases', rol: 'ADMINISTRATIVO', profesion: 'Administrativo', activo: true, delegacion: 'Sede Central (San Salvador)' },
  { id: 'emp-7', nombre: 'Carla', apellido: 'Flores', sector: 'Superadministración e Informática', rol: 'SUPERADM', profesion: 'Sistemas', activo: true, delegacion: 'Sede Central (San Salvador)' },
];
