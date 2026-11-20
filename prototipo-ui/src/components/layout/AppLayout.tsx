import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import {
  Users,
  FileText,
  Truck,
  BarChart3,
  Settings,
  SlidersHorizontal,
  Search,
  Moon,
  Sun,
  Laptop,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Bell,
  LogOut,
  FolderOpen,
  UserCheck,
  UserPlus,
  Compass,
  AlertTriangle,
  MonitorCheck
} from 'lucide-react';
import { useTheme, ThemeSetting } from '../../context/ThemeContext';
import { useRole } from '../../context/RoleContext';
import { useAtenciones } from '../../context/AtencionesContext';
import { GlobalSearchModal } from './GlobalSearchModal';
import { ActuanteDrawer } from '../drawer/ActuanteDrawer';
import { SessionConflictModal } from '../auth/SessionConflictModal';
import { InactivityModal } from '../auth/InactivityModal';
import { ToastContainer } from './ToastContainer';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  roles?: string[];
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('gedefensoria-sidebar-collapsed') === 'true';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { theme, themeSetting, setThemeSetting } = useTheme();
  const { role, setRole, user, setSessionModalOpen, setInactivityModalOpen } = useRole();
  const { contadores, addToast } = useAtenciones();
  const location = useLocation();

  // Colapso de menú con Ctrl+B y buscador con Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarCollapsed((prev) => {
          const next = !prev;
          localStorage.setItem('gedefensoria-sidebar-collapsed', String(next));
          return next;
        });
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('gedefensoria-sidebar-collapsed', String(next));
      return next;
    });
  };

  // Grupos de navegación por tarea
  const navGroups: NavGroup[] = [
    {
      title: 'Espacio de trabajo',
      items: [
        {
          to: '/atencion/cola',
          label: 'Atenciones del día',
          icon: <Clock className="w-4 h-4 shrink-0" />,
          badge: contadores.enEspera,
        },
        {
          to: '/atencion/nueva',
          label: 'Registrar atención',
          icon: <UserPlus className="w-4 h-4 shrink-0" />,
          roles: ['MESA_ENTRADAS', 'SUPERADM'],
        },
        {
          to: '/asesor/bandeja',
          label: 'Bandeja del Asesor',
          icon: <UserCheck className="w-4 h-4 shrink-0" />,
          roles: ['ASESOR', 'SUPERADM'],
          badge: contadores.enEspera,
        },
      ],
    },
    {
      title: 'Expedientes',
      items: [
        {
          to: '/expedientes/118-2026',
          label: 'Actuación 118/2026',
          icon: <FileText className="w-4 h-4 shrink-0" />,
        },
        {
          to: '/expedientes/tramites',
          label: 'Trámites y Libro Diario',
          icon: <FolderOpen className="w-4 h-4 shrink-0" />,
          roles: ['ADMINISTRATIVO', 'ASESOR', 'SUPERADM'],
        },
      ],
    },
    {
      title: 'Programas',
      items: [
        {
          to: '/programas/defensoria-movil',
          label: 'Defensoría Móvil',
          icon: <Truck className="w-4 h-4 shrink-0" />,
        },
      ],
    },
    {
      title: 'Informes',
      items: [
        {
          to: '/inicio',
          label: 'Tablero de Control',
          icon: <BarChart3 className="w-4 h-4 shrink-0" />,
        },
      ],
    },
    {
      title: 'Administración',
      items: [
        {
          to: '/admin/catalogos',
          label: 'Nomenclador y Parámetros',
          icon: <Settings className="w-4 h-4 shrink-0" />,
          roles: ['SUPERADM', 'ADMINISTRATIVO'],
        },
      ],
    },
  ];

  // Cálculo de Miga de Pan a partir de la ruta actual
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/atencion/cola')) return { group: 'Mesa de Entradas', current: 'Atenciones del día' };
    if (path.includes('/atencion/nueva')) return { group: 'Mesa de Entradas', current: 'Registrar atención' };
    if (path.includes('/asesor/bandeja')) return { group: 'Espacio de trabajo', current: 'Bandeja del Asesor' };
    if (path.includes('/expedientes/')) return { group: 'Expedientes', current: 'Detalle de actuación' };
    if (path.includes('/inicio')) return { group: 'Inicio', current: 'Panel de control' };
    if (path.includes('/login')) return { group: 'Acceso', current: 'Ingreso al Sistema' };
    return { group: 'Defensoría', current: 'Gestión Institucional' };
  };

  const breadcrumb = getBreadcrumb();

  // Accesos de la barra inferior en celular (4 + "Más"), filtrados por rol
  const shortLabels: Record<string, string> = {
    '/inicio': 'Inicio',
    '/atencion/cola': 'Atenciones',
    '/atencion/nueva': 'Registrar',
    '/asesor/bandeja': 'Bandeja',
    '/expedientes/118-2026': 'Actuación',
    '/expedientes/tramites': 'Trámites',
    '/programas/defensoria-movil': 'Móvil',
    '/admin/catalogos': 'Catálogos',
  };
  const bottomOrder = ['/inicio', '/atencion/cola', '/asesor/bandeja', '/atencion/nueva', '/expedientes/118-2026', '/expedientes/tramites'];
  const allowedItems = navGroups.flatMap((g) => g.items).filter((it) => !it.roles || it.roles.includes(role));
  const bottomItems = bottomOrder
    .map((to) => allowedItems.find((it) => it.to === to))
    .filter((it): it is NavItem => Boolean(it))
    .slice(0, 4);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* MENÚ LATERAL OSCURO (Marco 'Chrome' - sobrio en todos los temas) */}
      <aside
        className={`hidden md:flex flex-col shrink-0 bg-chrome-bg text-chrome-text border-r border-chrome-border transition-all duration-200 select-none ${
          sidebarCollapsed ? 'w-16' : 'w-60'
        }`}
        aria-label="Navegación principal"
      >
        {/* Cabecera del Marco */}
        <div className="h-16 flex items-center justify-between px-4">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-control bg-white/15 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-subtle">
                DP
              </div>
              <div className="min-w-0">
                <span className="block text-[13px] font-bold leading-tight tracking-tight text-white">
                  Defensoría del Pueblo
                </span>
                <span className="block text-[11px] text-chrome-muted truncate">
                  Provincia de Jujuy
                </span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 mx-auto rounded-control bg-white/15 text-white flex items-center justify-center font-bold text-sm shadow-subtle">
              DP
            </div>
          )}

          <button
            type="button"
            onClick={toggleSidebar}
            className="p-1 rounded text-chrome-muted hover:text-white hover:bg-chrome-hover focus-visible:ring-2 focus-visible:ring-primary ml-auto"
            title={sidebarCollapsed ? 'Expandir menú lateral (Ctrl+B)' : 'Colapsar menú lateral (Ctrl+B)'}
            aria-label={sidebarCollapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Lista de navegación por tareas */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group) => {
            // Filtrar ítems permitidos para el rol actual
            const visibleItems = group.items.filter(
              (item) => !item.roles || item.roles.includes(role)
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.title} className="space-y-1">
                {!sidebarCollapsed ? (
                  <div className="px-2.5 pb-1 text-[11px] font-semibold tracking-wider uppercase text-chrome-muted">
                    {group.title}
                  </div>
                ) : (
                  <div className="border-t border-chrome-border my-2" />
                )}

                {visibleItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-control text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-chrome-active text-chrome-active-fg font-bold shadow-[inset_3px_0_0_var(--color-chrome-active-edge)]'
                          : 'text-chrome-text hover:text-white hover:bg-chrome-hover'
                      } ${sidebarCollapsed ? 'justify-center px-0' : ''}`
                    }
                  >
                    {item.icon}
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums bg-white/20 text-white">
                        {item.badge}
                      </span>
                    )}
                    {sidebarCollapsed && <span className="sr-only">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Pie del menú lateral: Configuración + ficha del usuario (estilo Canva) */}
        <div className="mx-3 pt-3 pb-4 border-t border-chrome-border space-y-1">
          <button
            type="button"
            onClick={() => addToast('info', 'Configuración', 'Pantalla en diseño: preferencias, catálogos y parámetros del organismo.')}
            title={sidebarCollapsed ? 'Configuración' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-control text-sm font-medium text-chrome-text hover:text-white hover:bg-chrome-hover transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed ? <span>Configuración</span> : <span className="sr-only">Configuración</span>}
          </button>

          <div
            className={`flex items-center gap-2.5 px-2 py-2 ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title={sidebarCollapsed ? `${user.nombre} ${user.apellido} — ${user.sector}` : undefined}
          >
            <div className="w-8 h-8 rounded-full bg-chrome-active text-chrome-active-fg flex items-center justify-center font-bold text-xs shrink-0" aria-hidden="true">
              {user.nombre[0]}
              {user.apellido[0]}
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <span className="block text-[13px] font-bold leading-tight text-white truncate">
                  {user.nombre} {user.apellido}
                </span>
                <span className="block text-xs text-chrome-muted leading-tight mt-0.5 truncate">
                  {user.sector}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* BARRA SUPERIOR (En celular probada a 390px en UN SOLO RENGLÓN) */}
        <header className="h-16 md:h-[78px] bg-surface border-b border-border px-4 md:px-8 xl:px-10 flex shrink-0">
          {/* Mismo ancho y margen que el Área de trabajo: el header queda alineado con el contenido */}
          <div className="w-full max-w-[1540px] mx-auto flex items-center justify-between gap-2">
          {/* Lado izquierdo: Botón móvil + Miga de Pan */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Marca en celular (estilo Canva) */}
            <div className="md:hidden flex items-center gap-2 font-bold text-sm text-foreground min-w-0">
              <span className="w-8 h-8 rounded-control bg-primary-solid text-primary-solid-fg flex items-center justify-center text-xs font-bold shrink-0" aria-hidden="true">
                DP
              </span>
              <span className="truncate">Defensoría · Jujuy</span>
            </div>

            {/* Miga de pan accesible */}
            <nav className="hidden md:flex items-center text-xs font-medium truncate" aria-label="Miga de pan">
              <span className="text-foreground-subtle hidden sm:inline">{breadcrumb.group}</span>
              <span className="text-foreground-subtle mx-1.5 hidden sm:inline">/</span>
              <span className="text-foreground font-semibold truncate">{breadcrumb.current}</span>
            </nav>
          </div>

          {/* Buscador Global Rápido (Ctrl+K) */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 h-10 md:h-[43px] w-10 md:w-auto justify-center md:justify-start shrink-0 md:shrink bg-background hover:bg-surface-hover text-foreground-subtle hover:text-foreground rounded-xl border border-border text-sm md:flex-1 max-w-[620px] ml-auto md:ml-0 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Buscador global (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline truncate">Buscar persona o expediente…</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.2 text-[10px] bg-background border border-border rounded font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Lado derecho: Selector de Rol Demo + Selector de Tema + Usuario */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Selector de Rol de demostración */}
            <div className="relative hidden sm:block">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="text-xs bg-surface-hover border border-border rounded-control px-2 py-1 text-foreground font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                title="Cambiar rol de demostración"
                aria-label="Seleccionar rol de usuario para demostración"
              >
                <option value="MESA_ENTRADAS">Rol: Mesa de Entradas</option>
                <option value="ASESOR">Rol: Asesor Legal</option>
                <option value="ADMINISTRATIVO">Rol: Administrativo</option>
                <option value="SUPERADM">Rol: Superadministrador</option>
              </select>
            </div>

            {/* Menú de variantes de sesión (para probar requisitos Pantalla 1) */}
            <div className="hidden xl:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSessionModalOpen(true)}
                className="px-2 py-1 text-[11px] font-medium border border-border rounded-control hover:bg-surface-hover text-foreground-subtle hover:text-foreground"
                title="Probar aviso de conflicto de sesión abierta"
              >
                Conflicto sesión
              </button>
              <button
                type="button"
                onClick={() => setInactivityModalOpen(true)}
                className="px-2 py-1 text-[11px] font-medium border border-border rounded-control hover:bg-surface-hover text-foreground-subtle hover:text-foreground"
                title="Probar aviso de inactividad con cuenta regresiva"
              >
                Inactividad
              </button>
            </div>

            {/* Selector de Tema Institucional (Claro, Oscuro, Negro, Sistema) */}
            <div className="flex items-center border border-border rounded-control p-0.5 bg-surface-hover">
              <button
                type="button"
                onClick={() => setThemeSetting('claro')}
                className={`p-1 rounded text-xs transition-colors ${
                  themeSetting === 'claro' ? 'bg-surface text-foreground shadow-subtle' : 'text-foreground-subtle hover:text-foreground'
                }`}
                title="Tema Claro"
                aria-label="Cambiar a Tema Claro"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setThemeSetting('oscuro')}
                className={`p-1 rounded text-xs transition-colors ${
                  themeSetting === 'oscuro' ? 'bg-surface text-foreground shadow-subtle' : 'text-foreground-subtle hover:text-foreground'
                }`}
                title="Tema Oscuro"
                aria-label="Cambiar a Tema Oscuro"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setThemeSetting('negro')}
                className={`p-1 rounded text-xs font-bold transition-colors ${
                  themeSetting === 'negro' ? 'bg-surface text-foreground shadow-subtle' : 'text-foreground-subtle hover:text-foreground'
                }`}
                title="Tema Negro OLED"
                aria-label="Cambiar a Tema Negro Alto Contraste"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] leading-none">N</span>
              </button>
              <button
                type="button"
                onClick={() => setThemeSetting('sistema')}
                className={`p-1 rounded text-xs transition-colors ${
                  themeSetting === 'sistema' ? 'bg-surface text-foreground shadow-subtle' : 'text-foreground-subtle hover:text-foreground'
                }`}
                title="Tema del Sistema"
                aria-label="Seguir tema del Sistema Operativo"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
          </div>
        </header>

        {/* ÁREA DE TRABAJO (Scroll independiente para que las tablas scrolleen dentro) */}
        <main className="flex-1 overflow-y-auto bg-background px-4 pt-6 pb-28 md:px-8 md:py-8 xl:px-10">
          <Outlet />
        </main>
      </div>

      {/* BARRA DE NAVEGACIÓN INFERIOR EN CELULAR (estilo Canva) */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border flex justify-around px-1 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(23,61,66,0.035)]"
        aria-label="Navegación en celular"
      >
        {bottomItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 min-w-[60px] py-1 rounded-control text-xs font-semibold [&_svg]:w-5 [&_svg]:h-5 ${
                isActive ? 'text-primary' : 'text-foreground-subtle hover:text-foreground'
              }`
            }
          >
            {item.icon}
            <span>{shortLabels[item.to] || item.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 min-w-[60px] py-1 rounded-control text-xs font-semibold text-foreground-subtle hover:text-foreground"
          aria-label="Más opciones de menú"
        >
          <Menu className="w-5 h-5" />
          <span>Más</span>
        </button>
      </nav>

      {/* MENÚ MÓVIL (para pruebas a 390px) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 bg-chrome-bg text-chrome-text h-full flex flex-col p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-chrome-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-control bg-white/15 text-white flex items-center justify-center font-bold text-xs">
                  DP
                </div>
                <span className="text-xs font-bold uppercase text-white">Defensoría Jujuy</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-chrome-muted hover:text-white"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 border-b border-chrome-border text-xs text-chrome-muted">
              <div>Usuario: <strong className="text-white">{user.nombre} {user.apellido}</strong></div>
              <div className="text-2xs">{user.sector}</div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="mt-2 w-full text-xs bg-white/10 border border-chrome-border rounded-control px-2 py-1.5 text-white outline-none"
                aria-label="Seleccionar rol de usuario para demostración"
              >
                <option className="text-black" value="MESA_ENTRADAS">Rol: Mesa de Entradas</option>
                <option className="text-black" value="ASESOR">Rol: Asesor Legal</option>
                <option className="text-black" value="ADMINISTRATIVO">Rol: Administrativo</option>
                <option className="text-black" value="SUPERADM">Rol: Superadministrador</option>
              </select>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 space-y-4">
              {navGroups.map((group) => {
                const visible = group.items.filter((i) => !i.roles || i.roles.includes(role));
                if (visible.length === 0) return null;
                return (
                  <div key={group.title} className="space-y-1">
                    <div className="px-2 text-2xs font-semibold uppercase text-chrome-muted">
                      {group.title}
                    </div>
                    {visible.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-control text-xs ${
                            isActive
                              ? 'bg-chrome-active text-chrome-active-fg font-semibold'
                              : 'text-chrome-muted hover:text-white hover:bg-chrome-hover'
                          }`
                        }
                      >
                        <span className="flex items-center gap-2.5">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full text-2xs font-bold bg-white/20 text-white">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Modales y Drawers Globales */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <ActuanteDrawer />
      <SessionConflictModal />
      <InactivityModal />
      <ToastContainer />
    </div>
  );
};
