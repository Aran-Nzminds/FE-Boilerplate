import About from "@pages/about";
import Home from "@pages/home";
import Login from "@pages/login";
import NotFound from "@pages/not-found";
import { PrivateRoute } from "@routes/private-routes";
import { PublicRoute } from "@routes/public-routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )}
        />
        <Route
          path="/about"
          element={(
            <PrivateRoute>
              <About />
            </PrivateRoute>
          )}
        />
        <Route
          path="/login"
          element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )}
        />
        <Route
          path="*"
          element={(
            <PublicRoute>
              <NotFound />
            </PublicRoute>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
