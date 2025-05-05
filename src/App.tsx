import './App.css'
import { Route, Navigate, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Home';
import MoviePage from './Movie';
import LoginPage from './Login';
import RegisterPage from './Register';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { ReactNode } from 'react';


const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <AuthProvider>

          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/movie/:id" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
            </Route>
          </Routes>
        </AuthProvider>

      </Router>
    </>
  );
}

export default App;