import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Users,
  Search,
  AlertTriangle,
  FileText,
  ArrowRight,
  CheckCircle2,
  Phone,
  Truck,
  Building,
  UserCheck,
  UserX,
  Plus,
  Trash2,
  Info,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { useAtenciones } from '../context/AtencionesContext';
import { MOCK_ACTUANTES } from '../mocks/actuantes';
import { MOCK_EMPLEADOS } from '../mocks/empleados';
import { Actuante, OrigenAtencion, TipoDocumento, Genero } from '../types';
import { PageHeader } from '../components/common/PageHeader';

export const RegistrarAtencion: React.FC = () => {
  const navigate = useNavigate();
  const { agregarAtencion } = useAtenciones();

  // Paso actual (1: Persona/Grupo, 2: Motivo y Origen, 3: Destino/Pase)
  const [paso, setPaso] = useState<1 | 2 | 3>(1);

  // Búsqueda de persona
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Actuante | null>(null);
  const [esSinDocumento, setEsSinDocumento] = useState(false);
  const [esPersonaNueva, setEsPersonaNueva] = useState(false);

  // Formulario persona nueva
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevoDni, setNuevoDni] = useState('');
  const [nuevoTipoDoc, setNuevoTipoDoc] = useState<TipoDocumento>('DNI');
  const [nuevoFechaNac, setNuevoFechaNac] = useState('');
  const [nuevoGenero, setNuevoGenero] = useState<Genero>('NO_DECLARA');
  const [nuevoTelefono, setNuevoTelefono] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoDireccion, setNuevoDireccion] = useState('');
  const [nuevoBarrio, setNuevoBarrio] = useState('');
  const [nuevoLocalidad, setNuevoLocalidad] = useState('San Salvador de Jujuy');

  // Consulta grupal
  const [esGrupal, setEsGrupal] = useState(false);
  const [integrantesGrupo, setIntegrantesGrupo] = useState<Actuante[]>([]);
  const [nuevoIntegranteNombre, setNuevoIntegranteNombre] = useState('');
  const [nuevoIntegranteDni, setNuevoIntegranteDni] = useState('');

  // Paso 2: Motivo y Origen
  const [motivoResumen, setMotivoResumen] = useState('');
  const [origen, setOrigen] = useState<OrigenAtencion>('PRESENCIAL');
  const [esProgramaMovil, setEsProgramaMovil] = useState(false);
  const [operativoLugar, setOperativoLugar] = useState('SUM Barrio Malvinas, Perico');
  const [notasMesa, setNotasMesa] = useState('');

  // Paso 3: Destino (Pre-consulta vs Pase a Asesor)
  const [tipoDestino, setTipoDestino] = useState<'PASE_ASESOR' | 'PRECONSULTA'>('PASE_ASESOR');
  const [asesorSeleccionadoId, setAsesorSeleccionadoId] = useState('emp-1'); // Dr. Gonzalo Morales por defecto

  const asesores = MOCK_EMPLEADOS.filter((e) => e.rol === 'ASESOR' && e.activo);

  // Buscar DNI en el padrón local mock
  const handleBuscarDni = () => {
    const limpio = dniBusqueda.trim().replace(/\./g, '');
    const encontrado = MOCK_ACTUANTES.find(
      (a) => a.numeroDocumento.replace(/\./g, '') === limpio
    );

    if (encontrado) {
      setPersonaSeleccionada(encontrado);
      setEsPersonaNueva(false);
    } else {
      setPersonaSeleccionada(null);
      setEsPersonaNueva(true);
      setNuevoDni(dniBusqueda);
    }
  };

  const seleccionarPersonaRapida = (actuante: Actuante) => {
    setPersonaSeleccionada(actuante);
    setDniBusqueda(actuante.numeroDocumento);
    setEsPersonaNueva(false);
    setEsSinDocumento(actuante.tipoDocumento === 'SIN_DOCUMENTO');
  };

  const handleToggleSinDocumento = () => {
    const next = !esSinDocumento;
    setEsSinDocumento(next);
    if (next) {
      // Actuante sin documento de prueba
      const sinDoc = MOCK_ACTUANTES.find((a) => a.tipoDocumento === 'SIN_DOCUMENTO');
      if (sinDoc) {
        setPersonaSeleccionada(sinDoc);
      } else {
        setEsPersonaNueva(true);
        setNuevoTipoDoc('SIN_DOCUMENTO');
        setNuevoDni('—');
      }
    } else {
      setPersonaSeleccionada(null);
    }
  };

  const handleAgregarIntegrante = () => {
    if (!nuevoIntegranteNombre.trim()) return;
    const nuevo: Actuante = {
      id: `act-grp-${Date.now()}`,
      tipoDocumento: 'DNI',
      numeroDocumento: nuevoIntegranteDni.trim() || '—',
      nombre: nuevoIntegranteNombre.split(' ')[0] || nuevoIntegranteNombre,
      apellido: nuevoIntegranteNombre.split(' ').slice(1).join(' ') || '—',
      genero: 'NO_DECLARA',
      telefono: '',
      direccion: '',
      barrio: '',
      localidad: 'San Salvador de Jujuy',
    };
    setIntegrantesGrupo((prev) => [...prev, nuevo]);
    setNuevoIntegranteNombre('');
    setNuevoIntegranteDni('');
  };

  const handleRemoverIntegrante = (id: string) => {
    setIntegrantesGrupo((prev) => prev.filter((i) => i.id !== id));
  };

  // Enviar y dar el pase al instante
  const handleFinalizarRegistro = () => {
    let actuanteFinal: Actuante;

    if (personaSeleccionada) {
      actuanteFinal = personaSeleccionada;
    } else {
      actuanteFinal = {
        id: `act-${Date.now()}`,
        tipoDocumento: esSinDocumento ? 'SIN_DOCUMENTO' : nuevoTipoDoc,
        numeroDocumento: esSinDocumento ? '—' : nuevoDni || '99.999.000',
        nombre: nuevoNombre || 'Persona',
        apellido: nuevoApellido || 'Registrada',
        fechaNacimiento: nuevoFechaNac || undefined,
        genero: nuevoGenero,
        telefono: nuevoTelefono || '—',
        email: nuevoEmail || undefined,
        direccion: nuevoDireccion || '—',
        barrio: nuevoBarrio || 'Centro',
        localidad: nuevoLocalidad || 'San Salvador de Jujuy',
      };
    }

    const asesor = asesores.find((a) => a.id === asesorSeleccionadoId) || asesores[0];

    const ahora = new Date();
    const horaIngreso = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

    agregarAtencion({
      horaIngreso,
      estado: tipoDestino === 'PRECONSULTA' ? 'FINALIZADA' : 'EN_ESPERA',
      actuante: actuanteFinal,
      esGrupal,
      integrantesGrupo: esGrupal ? [actuanteFinal, ...integrantesGrupo] : undefined,
      motivoResumen: motivoResumen.trim() || 'Consulta general en Mesa de Entradas',
      asesorId: asesor.id,
      asesorNombre: `${asesor.profesion === 'Abogado' ? 'Dr.' : asesor.profesion === 'Abogada' ? 'Dra.' : 'Lic.'} ${asesor.nombre} ${asesor.apellido}`,
      origen: esProgramaMovil ? 'PROGRAMA' : origen,
      programaNombre: esProgramaMovil ? 'Defensoría Móvil' : undefined,
      operativoLugar: esProgramaMovil ? operativoLugar : undefined,
      esMultiTematica: false,
      cantidadConsultas: 1,
      notasMesaEntradas: notasMesa,
      horaAtencionFin: tipoDestino === 'PRECONSULTA' ? horaIngreso : undefined,
    });

    // La pantalla queda libre al instante navegando de regreso a Atenciones del día
    navigate('/atencion/cola');
  };

  // Cálculo de edad
  const calcularEdad = (fechaNac?: string) => {
    if (!fechaNac) return null;
    const hoy = new Date();
    const nac = new Date(fechaNac);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  };

  return (
    <div className="max-w-[1540px] mx-auto space-y-6 pb-12">
      {/* Cabecera */}
      <PageHeader
        eyebrow="Mesa de Entradas"
        title="Registrar atención"
        subtitle="Ingreso rápido de personas, verificación de antecedentes y pase a profesionales de turno."
        actions={
          <button
            type="button"
            onClick={() => navigate('/atencion/cola')}
            className="hidden sm:inline-flex text-sm font-medium text-foreground hover:bg-surface-hover px-4 py-2.5 border border-border-strong bg-surface rounded-control"
          >
            Volver a Atenciones del día
          </button>
        }
      />

      {/* Indicador de Pasos del Asistente */}
      <div className="grid grid-cols-3 gap-2 text-xs select-none">
        <button
          type="button"
          onClick={() => setPaso(1)}
          className={`p-3 rounded-card border text-left transition-colors flex items-center gap-2.5 ${
            paso === 1
              ? 'bg-primary-subtle border-primary-border text-primary font-semibold'
              : paso > 1
              ? 'bg-surface border-border text-foreground hover:bg-surface-hover'
              : 'bg-surface-hover border-border text-foreground-subtle'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            paso === 1 ? 'bg-primary-solid text-primary-solid-fg' : 'bg-surface-active text-foreground'
          }`}>
            1
          </span>
          <div className="min-w-0">
            <span className="block font-medium truncate">Persona / Grupo</span>
            <span className="block text-[11px] opacity-80 truncate">
              {personaSeleccionada ? `${personaSeleccionada.apellido}` : 'Buscar o crear'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => personaSeleccionada && setPaso(2)}
          disabled={!personaSeleccionada && !esPersonaNueva}
          className={`p-3 rounded-card border text-left transition-colors flex items-center gap-2.5 ${
            paso === 2
              ? 'bg-primary-subtle border-primary-border text-primary font-semibold'
              : paso > 2
              ? 'bg-surface border-border text-foreground hover:bg-surface-hover'
              : 'bg-surface-hover border-border text-foreground-subtle disabled:opacity-50'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            paso === 2 ? 'bg-primary-solid text-primary-solid-fg' : 'bg-surface-active text-foreground'
          }`}>
            2
          </span>
          <div className="min-w-0">
            <span className="block font-medium truncate">Motivo y Origen</span>
            <span className="block text-[11px] opacity-80 truncate">
              {motivoResumen ? 'Problemática cargada' : 'Tema de consulta'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => paso >= 2 && setPaso(3)}
          disabled={paso < 2}
          className={`p-3 rounded-card border text-left transition-colors flex items-center gap-2.5 ${
            paso === 3
              ? 'bg-primary-subtle border-primary-border text-primary font-semibold'
              : 'bg-surface-hover border-border text-foreground-subtle disabled:opacity-50'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            paso === 3 ? 'bg-primary-solid text-primary-solid-fg' : 'bg-surface-active text-foreground'
          }`}>
            3
          </span>
          <div className="min-w-0">
            <span className="block font-medium truncate">Destino y Pase</span>
            <span className="block text-[11px] opacity-80 truncate">
              {tipoDestino === 'PASE_ASESOR' ? 'Pase a profesional' : 'Pre-consulta'}
            </span>
          </div>
        </button>
      </div>

      {/* CUERPO DEL PASO 1: PERSONA O GRUPO */}
      {paso === 1 && (
        <div className="bg-surface border border-border rounded-card p-4 sm:p-6 space-y-5 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Paso 1: Identificación del Actuante o Grupo
              </h2>
              <p className="text-xs text-foreground-muted">
                Buscá por DNI para detectar antecedentes inmediatos o seleccioná una de las opciones especiales.
              </p>
            </div>

            {/* Opciones Especiales: Sin Documento y Consulta Grupal */}
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={esSinDocumento}
                  onChange={handleToggleSinDocumento}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                />
                <span>Sin documento</span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={esGrupal}
                  onChange={(e) => setEsGrupal(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                />
                <span>Consulta grupal</span>
              </label>
            </div>
          </div>

          {/* Buscador de DNI */}
          {!esSinDocumento && (
            <div className="space-y-2">
              <label htmlFor="dni-search-input" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                Número de documento (DNI)
              </label>
              <div className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-foreground-subtle" />
                  <input
                    id="dni-search-input"
                    type="text"
                    className="w-full bg-surface-hover border border-border rounded-control pl-9 pr-3 py-2 text-xs font-mono text-foreground placeholder:text-foreground-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="ej. 99.412.301"
                    value={dniBusqueda}
                    onChange={(e) => setDniBusqueda(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleBuscarDni()}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleBuscarDni}
                  className="px-4 py-2 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold text-xs rounded-control transition-colors shadow-subtle focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Buscar
                </button>
              </div>

              {/* Sugerencias de prueba rápidas para demo */}
              <div className="pt-1 flex items-center gap-2 flex-wrap text-2xs text-foreground-subtle">
                <span>Ejemplos para probar antecedentes:</span>
                <button
                  type="button"
                  onClick={() => seleccionarPersonaRapida(MOCK_ACTUANTES[0])}
                  className="underline hover:text-primary"
                >
                  Norma Condorí (Exp. abierto EJESA)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => seleccionarPersonaRapida(MOCK_ACTUANTES[1])}
                  className="underline hover:text-primary"
                >
                  Faustino Mendoza (ISJ prótesis)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => seleccionarPersonaRapida(MOCK_ACTUANTES[3])}
                  className="underline hover:text-primary"
                >
                  Carlos Tocónas (Grupal agua)
                </button>
              </div>
            </div>
          )}

          {/* FICHA DE PERSONA ENCONTRADA / ANTECEDENTES DETECTADOS */}
          {personaSeleccionada && (
            <div className="p-4 rounded-card border border-border bg-surface-hover space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-subtle text-primary border border-primary-border flex items-center justify-center font-bold text-sm">
                    {personaSeleccionada.nombre[0]}{personaSeleccionada.apellido[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {personaSeleccionada.apellido}, {personaSeleccionada.nombre}
                    </h3>
                    <div className="text-xs text-foreground-muted flex items-center gap-2">
                      <span className="font-mono">
                        {personaSeleccionada.tipoDocumento === 'SIN_DOCUMENTO' ? 'Sin documento acreditado' : `DNI ${personaSeleccionada.numeroDocumento}`}
                      </span>
                      <span>•</span>
                      <span>
                        {personaSeleccionada.fechaNacimiento
                          ? `${calcularEdad(personaSeleccionada.fechaNacimiento)} años`
                          : 'Edad sin registrar'}
                      </span>
                      <span>•</span>
                      <span>{personaSeleccionada.barrio}, {personaSeleccionada.localidad}</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-2xs font-bold rounded bg-status-success-bg text-status-success-text border border-status-success-border">
                  Registrado en padrón
                </span>
              </div>

              {/* ALERTA DE ANTECEDENTES (Requisito no negociable) */}
              {personaSeleccionada.antecedentes && (
                <div className="p-3 bg-status-warning-bg border border-status-warning-border rounded-control text-xs text-status-warning-text space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Antecedentes detectados para esta persona:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-2xs leading-relaxed">
                    {personaSeleccionada.antecedentes.asesorPrevio && (
                      <li>
                        Asesor asignado previamente: <strong>{personaSeleccionada.antecedentes.asesorPrevio}</strong>
                      </li>
                    )}
                    {personaSeleccionada.antecedentes.actuacionAbiertaNumero && (
                      <li>
                        Posee Actuación de Conflicto en curso: <strong>Exp. {personaSeleccionada.antecedentes.actuacionAbiertaNumero}</strong>
                      </li>
                    )}
                    {personaSeleccionada.antecedentes.documentacionPendiente && (
                      <li>
                        Documentación adeudada: <strong>{personaSeleccionada.antecedentes.documentacionPendiente}</strong>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* FORMULARIO DE ALTA RÁPIDA SI ES NUEVA */}
          {esPersonaNueva && (
            <div className="p-4 rounded-card border border-primary-border bg-primary-subtle/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <UserCheck className="w-4 h-4" />
                <span>Persona no encontrada en el padrón local — Registro rápido en línea</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-foreground-muted font-medium mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="ej. Juan Carlos"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground-muted font-medium mb-1">Apellido *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="ej. Vilte"
                    value={nuevoApellido}
                    onChange={(e) => setNuevoApellido(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground-muted font-medium mb-1">DNI / Documento</label>
                  <input
                    type="text"
                    disabled={esSinDocumento}
                    className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-foreground font-mono outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                    placeholder="ej. 99.888.777"
                    value={esSinDocumento ? '— Sin documento —' : nuevoDni}
                    onChange={(e) => setNuevoDni(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground-muted font-medium mb-1">Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    value={nuevoFechaNac}
                    onChange={(e) => setNuevoFechaNac(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground-muted font-medium mb-1">Teléfono de contacto</label>
                  <input
                    type="tel"
                    className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-foreground font-mono outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="ej. 388-4123456"
                    value={nuevoTelefono}
                    onChange={(e) => setNuevoTelefono(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground-muted font-medium mb-1">Barrio</label>
                  <input
                    type="text"
                    className="w-full bg-surface border border-border rounded-control px-2.5 py-1.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="ej. Cuyaya / Alto Comedero"
                    value={nuevoBarrio}
                    onChange={(e) => setNuevoBarrio(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN CONSULTA GRUPAL (Varias personas, una atención) */}
          {esGrupal && (
            <div className="p-4 rounded-card border border-border bg-surface-hover space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Integrantes adicionales del grupo ({integrantesGrupo.length})
                  </h3>
                </div>
                <span className="text-2xs text-foreground-subtle">
                  Se vinculan todos a la misma consulta
                </span>
              </div>

              {/* Formulario rápido para sumar integrante */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nombre y Apellido del acompañante"
                  className="flex-1 bg-surface border border-border rounded-control px-3 py-1.5 text-xs text-foreground placeholder:text-foreground-subtle outline-none"
                  value={nuevoIntegranteNombre}
                  onChange={(e) => setNuevoIntegranteNombre(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="DNI"
                  className="w-32 bg-surface border border-border rounded-control px-3 py-1.5 text-xs text-foreground font-mono placeholder:text-foreground-subtle outline-none"
                  value={nuevoIntegranteDni}
                  onChange={(e) => setNuevoIntegranteDni(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAgregarIntegrante}
                  className="px-3 py-1.5 bg-surface text-foreground hover:bg-surface-active border border-border rounded-control text-xs font-semibold inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>

              {/* Lista de integrantes cargados */}
              {integrantesGrupo.length > 0 && (
                <ul className="divide-y divide-border border border-border rounded-control bg-surface overflow-hidden">
                  {integrantesGrupo.map((integ) => (
                    <li key={integ.id} className="px-3 py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-foreground">{integ.nombre} {integ.apellido}</span>
                        <span className="ml-2 font-mono text-foreground-muted text-2xs">DNI {integ.numeroDocumento}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoverIntegrante(integ.id)}
                        className="text-status-danger-text hover:text-red-700 p-1 rounded"
                        title="Quitar del grupo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Botón Siguiente */}
          <div className="pt-3 border-t border-border flex justify-end">
            <button
              type="button"
              disabled={!personaSeleccionada && !nuevoNombre.trim()}
              onClick={() => setPaso(2)}
              className="px-5 py-2.5 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold text-xs rounded-control transition-colors shadow-subtle flex items-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Continuar a Motivo y Origen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CUERPO DEL PASO 2: MOTIVO Y ORIGEN */}
      {paso === 2 && (
        <div className="bg-surface border border-border rounded-card p-4 sm:p-6 space-y-5 shadow-card">
          <div className="pb-3 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              Paso 2: Motivo de la Consulta y Origen
            </h2>
            <p className="text-xs text-foreground-muted">
              El motivo será visible directamente en Atenciones del día para que los operadores e investigadores tengan contexto inmediato.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Motivo Resumen */}
            <div>
              <label htmlFor="motivo-textarea" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                Motivo / Problemática planteada *
              </label>
              <textarea
                id="motivo-textarea"
                rows={3}
                required
                className="w-full bg-surface-hover border border-border rounded-control p-3 text-xs text-foreground placeholder:text-foreground-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary leading-relaxed"
                placeholder="Describí brevemente el reclamo o motivo por el que asiste (ej. Corte de luz en domicilio con electrodependiente, falta de prótesis en ISJ, reclamo por baja presión de agua)…"
                value={motivoResumen}
                onChange={(e) => setMotivoResumen(e.target.value)}
              />

              {/* Botones de sugerencias rápidas comunes */}
              <div className="mt-2 flex items-center gap-1.5 flex-wrap text-2xs text-foreground-subtle">
                <span>Atajos comunes:</span>
                <button
                  type="button"
                  onClick={() => setMotivoResumen('Reclamo por corte de suministro eléctrico y solicitud de inscripción como electrodependiente (EJESA)')}
                  className="px-2 py-0.5 rounded border border-border bg-surface hover:bg-surface-hover text-foreground"
                >
                  EJESA Electrodependiente
                </button>
                <button
                  type="button"
                  onClick={() => setMotivoResumen('Falta de provisión y baja presión de agua potable en red pública (Agua de los Andes)')}
                  className="px-2 py-0.5 rounded border border-border bg-surface hover:bg-surface-hover text-foreground"
                >
                  Agua de los Andes
                </button>
                <button
                  type="button"
                  onClick={() => setMotivoResumen('Demora injustificada en cobertura de insumos médicos / prótesis en Instituto de Seguros (ISJ)')}
                  className="px-2 py-0.5 rounded border border-border bg-surface hover:bg-surface-hover text-foreground"
                >
                  ISJ Prótesis
                </button>
                <button
                  type="button"
                  onClick={() => setMotivoResumen('Gestión urgente de exención de arancel por extravío de documentación (Registro Civil)')}
                  className="px-2 py-0.5 rounded border border-border bg-surface hover:bg-surface-hover text-foreground"
                >
                  Registro Civil DNI
                </button>
              </div>
            </div>

            {/* Canal de Origen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                  Canal de Ingreso
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setOrigen('PRESENCIAL'); setEsProgramaMovil(false); }}
                    className={`p-2.5 rounded-control border text-left transition-colors flex items-center gap-2 ${
                      origen === 'PRESENCIAL' && !esProgramaMovil
                        ? 'bg-primary-solid text-primary-solid-fg font-semibold border-primary'
                        : 'bg-surface-hover border-border text-foreground hover:bg-surface'
                    }`}
                  >
                    <Building className="w-4 h-4 shrink-0" />
                    <span>Presencial (Mesa)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setOrigen('TELEFONICA'); setEsProgramaMovil(false); }}
                    className={`p-2.5 rounded-control border text-left transition-colors flex items-center gap-2 ${
                      origen === 'TELEFONICA'
                        ? 'bg-primary-solid text-primary-solid-fg font-semibold border-primary'
                        : 'bg-surface-hover border-border text-foreground hover:bg-surface'
                    }`}
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Telefónica</span>
                  </button>
                </div>
              </div>

              {/* Programa Institucional (Defensoría Móvil) */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                  ¿Proviene de un Programa u Operativo Territorial?
                </label>
                <button
                  type="button"
                  onClick={() => setEsProgramaMovil(!esProgramaMovil)}
                  className={`w-full p-2.5 rounded-control border text-left transition-colors flex items-center justify-between ${
                    esProgramaMovil
                      ? 'bg-primary-subtle border-primary text-primary font-semibold'
                      : 'bg-surface-hover border-border text-foreground hover:bg-surface'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Defensoría Móvil (Salida a Territorio)</span>
                  </span>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    esProgramaMovil ? 'bg-primary-solid border-primary' : 'border-border'
                  }`}>
                    {esProgramaMovil && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </button>
              </div>
            </div>

            {/* Selector de Lugar de Operativo Territorial si aplica */}
            {esProgramaMovil && (
              <div className="p-3 bg-surface-hover rounded-control border border-border space-y-2 animate-in fade-in">
                <label className="block text-2xs font-semibold text-foreground-muted uppercase tracking-wider">
                  Lugar / Institución anfitriona del operativo
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-2.5 top-2.5 text-foreground-subtle" />
                  <input
                    type="text"
                    className="w-full bg-surface border border-border rounded-control pl-8 pr-3 py-1.5 text-xs text-foreground outline-none"
                    placeholder="ej. SUM Barrio Malvinas, Perico / Capilla San Cayetano, Palpalá"
                    value={operativoLugar}
                    onChange={(e) => setOperativoLugar(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Notas internas de Mesa de Entradas */}
            <div>
              <label htmlFor="notas-me" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                Notas y observaciones de Mesa de Entradas (opcional)
              </label>
              <input
                id="notas-me"
                type="text"
                className="w-full bg-surface-hover border border-border rounded-control px-3 py-2 text-xs text-foreground placeholder:text-foreground-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="ej. Presenta copia de factura; persona de trato cordial; se prioriza por condición de salud."
                value={notasMesa}
                onChange={(e) => setNotasMesa(e.target.value)}
              />
            </div>
          </div>

          {/* Botones de Navegación */}
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPaso(1)}
              className="px-4 py-2 border border-border rounded-control text-xs text-foreground-muted hover:text-foreground hover:bg-surface-hover"
            >
              Atrás
            </button>
            <button
              type="button"
              disabled={!motivoResumen.trim()}
              onClick={() => setPaso(3)}
              className="px-5 py-2.5 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold text-xs rounded-control transition-colors shadow-subtle flex items-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Continuar a Destino y Pase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CUERPO DEL PASO 3: DESTINO Y PASE ASÍNCRONO */}
      {paso === 3 && (
        <div className="bg-surface border border-border rounded-card p-4 sm:p-6 space-y-5 shadow-card">
          <div className="pb-3 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              Paso 3: Definir Destino y Transmitir Pase
            </h2>
            <p className="text-xs text-foreground-muted">
              Elegí si la visita es una Pre-consulta (se cierra en Mesa) o si requiere pase a las atenciones de un profesional asesor.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Selector Pre-consulta vs Pase a Asesor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipoDestino('PASE_ASESOR')}
                className={`p-4 rounded-card border text-left transition-all ${
                  tipoDestino === 'PASE_ASESOR'
                    ? 'bg-primary-subtle border-primary text-primary font-bold shadow-subtle'
                    : 'bg-surface-hover border-border text-foreground hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm font-bold">Derivar a Asesor (Pase)</span>
                </div>
                <p className="text-xs font-normal text-foreground-muted leading-relaxed">
                  Pasa a la bandeja de espera del profesional de turno para asesoramiento jurídico, social o psicológico.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTipoDestino('PRECONSULTA')}
                className={`p-4 rounded-card border text-left transition-all ${
                  tipoDestino === 'PRECONSULTA'
                    ? 'bg-primary-subtle border-primary text-primary font-bold shadow-subtle'
                    : 'bg-surface-hover border-border text-foreground hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-bold">Pre-consulta (Finaliza en Mesa)</span>
                </div>
                <p className="text-xs font-normal text-foreground-muted leading-relaxed">
                  Para audiencias, entrega de notas, consultas de trámite general que no originan expediente ni actuación de asesor.
                </p>
              </button>
            </div>

            {/* Si es Pase a Asesor: Selección del profesional */}
            {tipoDestino === 'PASE_ASESOR' && (
              <div className="p-4 bg-surface-hover rounded-card border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                    Seleccionar Profesional Asesor
                  </label>
                  <span className="text-2xs text-foreground-subtle">
                    Atenciones en espera de cada profesional
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {asesores.map((as) => {
                    const isSelected = asesorSeleccionadoId === as.id;
                    const prefijo = as.profesion === 'Abogado' ? 'Dr.' : as.profesion === 'Abogada' ? 'Dra.' : 'Lic.';

                    return (
                      <button
                        key={as.id}
                        type="button"
                        onClick={() => setAsesorSeleccionadoId(as.id)}
                        className={`p-3 rounded-control border text-left transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-primary-solid text-primary-solid-fg border-primary font-semibold shadow-subtle'
                            : 'bg-surface border-border text-foreground hover:bg-surface-hover'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block text-xs font-bold truncate">
                            {prefijo} {as.nombre} {as.apellido}
                          </span>
                          <span className={`block text-[11px] truncate ${
                            isSelected ? 'text-primary-solid-fg opacity-80' : 'text-foreground-subtle'
                          }`}>
                            {as.sector}
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums shrink-0 ml-2 ${
                          isSelected ? 'bg-black/10 text-primary-solid-fg' : 'bg-surface-hover text-foreground-muted border border-border'
                        }`}>
                          En turno
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Aviso de No-Bloqueo de Pantalla (Diseño To-Be) */}
            <div className="p-3 bg-surface-hover rounded-control border border-border flex items-start gap-2.5 text-xs text-foreground-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-foreground">Flujo Asíncrono:</strong> Al presionar el botón inferior, el pase se transmitirá digitalmente en tiempo real a la bandeja del profesional. <strong>Tu pantalla quedará inmediatamente libre y lista</strong> para registrar al siguiente ciudadano.
              </div>
            </div>
          </div>

          {/* Botón Final */}
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPaso(2)}
              className="px-4 py-2 border border-border rounded-control text-xs text-foreground-muted hover:text-foreground hover:bg-surface-hover"
            >
              Atrás
            </button>

            <button
              type="button"
              onClick={handleFinalizarRegistro}
              className="px-6 py-2.5 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold text-xs rounded-control transition-colors shadow-subtle flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {tipoDestino === 'PASE_ASESOR'
                  ? 'Dar pase y liberar pantalla'
                  : 'Registrar pre-consulta y finalizar'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
