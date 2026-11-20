import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Eye, EyeOff, Monitor, Clock } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useTheme } from '../context/ThemeContext';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('rmamani');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setSessionModalOpen, setInactivityModalOpen } = useRole();
  const { theme, setThemeSetting } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Debe ingresar usuario y contraseña para acceder.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/atencion/cola');
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-background text-foreground p-4">
      {/* Barra superior de la pantalla de login */}
      <div className="flex items-center justify-between py-2 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary-solid text-primary-solid-fg flex items-center justify-center font-bold text-sm">
            DP
          </div>
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
            Defensoría del Pueblo de Jujuy
          </span>
        </div>

        {/* Variantes de prueba de inicio de sesión requeridas por la consigna */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setSessionModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border rounded-control hover:bg-surface-hover text-foreground-muted"
          >
            <Monitor className="w-3.5 h-3.5 text-status-warning-text" />
            <span>Simular conflicto de sesión</span>
          </button>
          <button
            type="button"
            onClick={() => setInactivityModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border rounded-control hover:bg-surface-hover text-foreground-muted"
          >
            <Clock className="w-3.5 h-3.5 text-status-danger-text" />
            <span>Simular inactividad</span>
          </button>
        </div>
      </div>

      {/* Contenedor Central del Formulario */}
      <div className="w-full max-w-md mx-auto my-auto py-6">
        <div className="bg-surface border border-border rounded-card p-6 sm:p-8 shadow-card space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-bold font-display text-foreground tracking-tight">
              Sistema de Gestión de Actuaciones
            </h1>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Ingreso institucional para operadores, asesores y secretarías.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-status-danger-bg text-status-danger-text border border-status-danger-border rounded-control text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-username" className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                Usuario de red / sistema
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-foreground-subtle" />
                <input
                  id="login-username"
                  type="text"
                  required
                  autoFocus
                  className="w-full bg-surface-hover border border-border rounded-control pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-foreground-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="ej. rmamani"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-foreground-subtle" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-surface-hover border border-border rounded-control pl-9 pr-9 py-2 text-xs text-foreground placeholder:text-foreground-subtle outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-foreground-subtle hover:text-foreground p-0.5 rounded"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Aviso: Sin opción "Recordarme" según la consigna (seguridad de datos sensibles) */}
            <div className="p-2.5 bg-surface-hover rounded-control border border-border text-2xs text-foreground-subtle leading-normal">
              🔒 <strong>Seguridad institucional:</strong> No se almacena la contraseña en equipos compartidos. La sesión caduca automáticamente ante inactividad.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover font-semibold text-xs rounded-control transition-colors shadow-subtle flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isSubmitting ? 'Iniciando sesión…' : 'Ingresar al sistema'}
            </button>
          </form>
        </div>
      </div>

      {/* Pie institucional */}
      <div className="text-center text-xs text-foreground-subtle py-3 border-t border-border max-w-4xl mx-auto w-full">
        Defensoría del Pueblo de la Provincia de Jujuy — República Argentina • Ley Provincial N° 6380
      </div>
    </div>
  );
};
