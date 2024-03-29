import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPageNavBar from "./components/LandingPageNavBar"
import LandingPageHome from './components/LandingPageHome';
import { authenticate } from './store/session';
import "./stylesheets/reset.css";
import "./stylesheets/global.css";
import AppHome from './components/AppHome';
import AppMessagesIndex from './components/Messages/AppMessagesIndex';
import NetworkPage from './components/Network/NetworkPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <LandingPageNavBar />
          <LandingPageHome />
        </Route>
        <ProtectedRoute path="/feed" exact>
          <AppHome/>
        </ProtectedRoute>
        <ProtectedRoute path="/mynetwork" exact>
          <NetworkPage />
        </ProtectedRoute>
        <ProtectedRoute path="/messaging" exact>
          <AppMessagesIndex />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
