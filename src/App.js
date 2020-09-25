import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import axios from "axios";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [value, setValue] = useState(null);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={{ value, setValue }}>
          <Route
            path="/"
            exact
            component={() => (
              <AuthPage setUserInfo={setUserInfo} setIsLogged={setIsLogged} />
            )}
          />
          <Route
            path="/home"
            component={() => (
              <HomePage isLogged={isLogged} setIsLogged={setIsLogged} />
            )}
          />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
