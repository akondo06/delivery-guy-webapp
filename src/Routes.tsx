import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

import LoadingPage from 'components/LoadingPage';
import MainNavAside from 'components/MainNavAside';
import PageDividedLayout from 'components/PageDividedLayout';

import Login from 'pages/Login';
import Register from 'pages/Register';
import Recover from 'pages/Recover';
import PasswordUpdate from 'pages/PasswordUpdate';
import Activate from 'pages/Activate';
import EmailUpdate from 'pages/EmailUpdate';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import Account from 'pages/Account';
import AccountUpdate from 'pages/AccountUpdate';
import AccountAvatarUpdate from 'pages/AccountAvatarUpdate';
import AccountEmailUpdate from 'pages/AccountEmailUpdate';
import AccountPasswordUpdate from 'pages/AccountPasswordUpdate';

import Dashboard from 'pages/Dashboard';
import MapOverview from 'pages/MapOverview';
import Vehicles from 'pages/Vehicles';
import RoutesPage from 'pages/Routes';

import Properties from 'pages/Properties';
import Property from 'pages/Property';
import PropertyCreate from 'pages/PropertyCreate';
import PropertyUpdate from 'pages/PropertyUpdate';
import NotFound from 'pages/NotFound';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if(!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

let prevPath = '';

function ScrollToTop() { // should apply only to the main nav stuff ...
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname === '/' ? '/home' : location.pathname;

    if (path === prevPath) {
      return;
    }

    const count = (path.match(/\//g) || []).length;

    const isTopLevel = count === 1;
    const isFromOwnSub = prevPath.indexOf(path) === 0;

    if (isTopLevel && !isFromOwnSub) {
      window.scrollTo(0, 0);
    }

    prevPath = path;

  }, [location.pathname]);

  return null;
}

function RoutesList() {
  const { loading } = useAuth();

  if (loading) {
    return (<LoadingPage />);
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <>
                <PageDividedLayout
                  aside={
                    <>
                      <MainNavAside />
                    </>
                  }
                >
                  <Outlet />
                </PageDividedLayout>
              </>
            </RequireAuth>
          }
        >
{/*          <Route
            index
            element={<Navigate to="/dashboard" replace />}
          />*/}
          <Route
            index
            element={<Dashboard />}
          />
          <Route
            path="map-overview"
            element={<MapOverview />}
          />
          <Route
            path="vehicles"
            element={<Vehicles />}
          />
          <Route
            path="routes"
            element={<RoutesPage />}
          />
          <Route
            path="properties"
            element={<Properties />}
          >
            <Route
              path="create"
              element={<PropertyCreate />}
            />
          </Route>
          <Route
            path="properties/:id"
            element={<Property />}
          >
            <Route
              path="update"
              element={<PropertyUpdate />}
            />
          </Route>
          <Route
            path="account"
            element={<Account />}
          >
            <Route
              path="update"
              element={<AccountUpdate />}
            />
            <Route
              path="avatar-update"
              element={<AccountAvatarUpdate />}
            />
            <Route
              path="email-update"
              element={<AccountEmailUpdate />}
            />
            <Route
              path="password-update"
              element={<AccountPasswordUpdate />}
            />
          </Route>
        </Route>

        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />
        <Route
          path="recover"
          element={<Recover />}
        />
        <Route
          path="password-update/:token"
          element={<PasswordUpdate />}
        />
        <Route
          path="activate/:token"
          element={<Activate />}
        />
        <Route
          path="email-update/:token"
          element={<EmailUpdate />}
        />
        <Route
          path="privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}

export default RoutesList;
