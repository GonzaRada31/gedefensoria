import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RoleProvider } from './context/RoleContext';
import { AtencionesProvider } from './context/AtencionesContext';
import { AppLayout } from './components/layout/AppLayout';
import { MesaEntradasCola } from './pages/MesaEntradasCola';
import { RegistrarAtencion } from './pages/RegistrarAtencion';
import { BandejaAsesor } from './pages/BandejaAsesor';
import { DetalleActuacion } from './pages/DetalleActuacion';
import { InicioDashboard } from './pages/InicioDashboard';
import { Login } from './pages/Login';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RoleProvider>
        <AtencionesProvider>
          <BrowserRouter>
            <Routes>
              {/* Pantalla 1: Ingreso */}
              <Route path="/login" element={<Login />} />

              {/* Marco de la App */}
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/atencion/cola" replace />} />
                
                {/* Pantalla 3: Atenciones del día */}
                <Route path="/atencion/cola" element={<MesaEntradasCola />} />

                {/* Pantalla 4: Registrar Atención */}
                <Route path="/atencion/nueva" element={<RegistrarAtencion />} />

                {/* Pantalla 6: Bandeja del Asesor */}
                <Route path="/asesor/bandeja" element={<BandejaAsesor />} />

                {/* Pantalla 7: Detalle de Actuación */}
                <Route path="/expedientes/:id" element={<DetalleActuacion />} />
                <Route path="/expedientes/tramites" element={<DetalleActuacion />} />

                {/* Pantalla 8: Inicio y Métricas */}
                <Route path="/inicio" element={<InicioDashboard />} />

                {/* Programas */}
                <Route
                  path="/programas/defensoria-movil"
                  element={<InicioDashboard />}
                />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/atencion/cola" replace />} />
            </Routes>
          </BrowserRouter>
        </AtencionesProvider>
      </RoleProvider>
    </ThemeProvider>
  );
};

export default App;
