import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Preferences from './components/preferences';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
            <Signin setToken={setToken} />
          } />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
    )
  }

  return (
    <>
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
