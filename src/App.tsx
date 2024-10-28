import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Preloader
import Loader from '@/common/Loader';

// Components
import PageTitle from '@/components/PageTitle';

// Pages Components
import SignIn from '@/pages/Authentication/SignIn';
import SignInReception from './pages/Authentication/SignInReception';
import Providers from '@/pages/Dashboard/Providers';
import Calendar from '@/pages/Reception/Calendar';
import Dashboard from '@/pages/Dashboard/Dashboard';
import ServiceLogs from '@/pages/Dashboard/ServiceLogs';
import ServiceClients from '@/pages/Dashboard/ServiceClients';
import Appoinments from '@/pages/Reception/Appoinments';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Simulate load time, remove this on production
    // 1000ms = 1s
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/service/clients"
          element={
            <>
              <PageTitle title="Servicios Clientes" />
              <ServiceClients />
            </>
          }
        />
        <Route
          path="/appointments"
          element={
            <>
              <PageTitle title="Citas" />
              <Appoinments />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendario" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/auth/reception/signin"
          element={
            <>
              <PageTitle title="Inicia Sesión a la Recepción" />
              <SignInReception />
            </>
          }
        />
        <Route
          path="/service/logs"
          element={
            <>
              <PageTitle title="Service Logs" />
              <ServiceLogs />
            </>
          }
        />
        <Route
          path="/providers"
          element={
            <>
              <PageTitle title="Servicios de Proveedores" />
              <Providers />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Inicia Sesión al Dashboard" />
              <SignIn />
            </>
          }
        />
      </Routes>
  );
}

export default App;
