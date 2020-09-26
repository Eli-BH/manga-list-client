import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthPage from "./components/AuthPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const App = () => {
  const [isLogged, setIsLogged] = useStickyState(false, "logged");

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <AuthPage isLogged={isLogged} />}
        />
        <Route
          path="/login"
          component={() => (
            <Login isLogged={isLogged} setIsLogged={setIsLogged} />
          )}
        />
        <Route
          path="/signup"
          component={() => (
            <Signup isLogged={isLogged} setIsLogged={setIsLogged} />
          )}
        />
        <Route
          path="/home"
          component={() => (
            <HomePage isLogged={isLogged} setIsLogged={setIsLogged} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
