import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import DashbordLayout from './layout/DashbordLayout';

import { thunk } from 'redux-thunk';
import { applyMiddleware } from 'redux';
import Login from './pages/Form/Login';
import DashboardCar from './pages/Car/Dashboard';
import EntitiesPage from './pages/Car/Fleet/EntitiesPage';
import Scene from './pages/Car/migrations/Scene';
import Data from './pages/Car/migrations/Data';
import HeaderDetails from './pages/Car/migrations/HeaderDetails';
import ProtectedRoute from './route/ProtectedRoute';
import Conducteur from './pages/Car/migrations/Conducteur';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    console.log(typeof thunk);
    console.log(typeof applyMiddleware);

    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    // <DefaultLayout>
      <Routes>
        <Route element={<DefaultLayout/>}>
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin" />
                  <Login />
                </>
              }
            />
            {/* <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup" />
                  <SignUp />
                </>
              }
            /> */}
        </Route>


        <Route
          element={<DashbordLayout />}> 
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <DashboardCar />
            </>
          }
        />
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route
          path="/Fleet"
          element={
            <>
              <PageTitle title="Fleet" />
              <EntitiesPage />
            </>
          }
        />
        </Route>

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
          <Route
          path="/scene"
          element={
            <>
              <PageTitle title="Car details" />
              <Scene />
            </>
          }
        />

    <Route
          path="/data"
          element={
            <>
              <PageTitle title="Car details" />
              <Data />
            </>
          }
        />

     <Route
          path="/conducteur"
          element={
            <>
              <PageTitle title="conducteur details" />
              <Conducteur />
            </>
          }
        />

        
    <Route
          path="/driver"
          element={
            <>
              <PageTitle title="Car details" />
              <HeaderDetails />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        </Route>
      </Routes>
   
  );
}

export default App;
