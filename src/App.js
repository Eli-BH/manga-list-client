import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import testProfile from "./components/testProfile";

const App = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState("");

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/test" component={testProfile} />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                {...props}
                setEmail={setEmail}
                email={email}
                setPassword={setPassword}
                password={password}
                username={username}
                setUsername={setUsername}
                auth={auth}
                setAuth={setAuth}
                token={token}
                setToken={setToken}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                setEmail={setEmail}
                email={email}
                setPassword={setPassword}
                password={password}
                auth={auth}
                setAuth={setAuth}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
