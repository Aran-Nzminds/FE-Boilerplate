import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/home';
import NotFound from '@pages/not-found';
import About from '@pages/about';
import Login from '@pages/login';
import { PrivateRoute } from '@routes/private-routes';
import { PublicRoute } from '@routes/public-routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {' '}
              <Home />{' '}
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              {' '}
              <About />{' '}
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="*"
          element={
            <PublicRoute>
              <NotFound />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
