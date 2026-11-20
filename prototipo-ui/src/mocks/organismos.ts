export interface Organismo {
  id: string;
  nombre: string;
  sigla: string;
  ambito: 'PROVINCIAL' | 'MUNICIPAL' | 'NACIONAL' | 'PRIVADO';
  direccion: string;
}

export const MOCK_ORGANISMOS: Organismo[] = [
  { id: 'org-1', nombre: 'Empresa Jujeña de Energía S.A.', sigla: 'EJESA', ambito: 'PRIVADO', direccion: 'Independencia 740, San Salvador de Jujuy' },
  { id: 'org-2', nombre: 'Agua Potable y Saneamiento de Jujuy', sigla: 'Agua de los Andes', ambito: 'PROVINCIAL', direccion: 'Alvear 941, San Salvador de Jujuy' },
  { id: 'org-3', nombre: 'Instituto de Seguros de Jujuy', sigla: 'ISJ', ambito: 'PROVINCIAL', direccion: 'Alvear 745, San Salvador de Jujuy' },
  { id: 'org-4', nombre: 'Administración Nacional de la Seguridad Social', sigla: 'ANSES Jujuy', ambito: 'NACIONAL', direccion: 'Curupaití 125, San Salvador de Jujuy' },
  { id: 'org-5', nombre: 'Instituto de Vivienda y Urbanismo de Jujuy', sigla: 'IVUJ', ambito: 'PROVINCIAL', direccion: 'Güemes 853, San Salvador de Jujuy' },
  { id: 'org-6', nombre: 'Superintendencia de Servicios Públicos', sigla: 'SuSePu', ambito: 'PROVINCIAL', direccion: 'Las Heras 213, San Salvador de Jujuy' },
  { id: 'org-7', nombre: 'Ministerio de Salud de Jujuy', sigla: 'MSAL Jujuy', ambito: 'PROVINCIAL', direccion: 'Av. Italia esq. Independencia, San Salvador de Jujuy' },
  { id: 'org-8', nombre: 'Municipalidad de San Salvador de Jujuy', sigla: 'Muni Jujuy', ambito: 'MUNICIPAL', direccion: 'Av. El Éxodo 215, San Salvador de Jujuy' },
];
