import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ProtectedRoute } from './components/ProtectedRoute'
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import { PublicRoutes } from './components/PublicRoute';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route index element={ <Navigate to={"/auth/signin"}/> }/>
        <Route path="/auth/signin" element={
            <PublicRoutes to={"/dashboard"}>
              <SignIn />
            </PublicRoutes>
          }
        />
        <Route path="/auth/signup" element={
            <PublicRoutes to={"/dashboard"}>
              <SignUp />
            </PublicRoutes>
          } 
        />
        <Route element={<DefaultLayout />}>
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute to={"/auth/signin"}>
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
