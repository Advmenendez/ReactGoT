import "./App.css";
import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Home, Login, Profile, Register,Gots } from "./pages";
import { Nav, } from "./layouts";
import AuthRoute from "./components/AuthRoute/AuthRoute";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  
  const saveUser = (user) => {
    setUser(user);
    
  };
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, saveUser }}>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AuthRoute
              authenticated={authenticated}
              path="/profile"
              render={(props) => <Profile user={user} {...props} />}
            />
            { <AuthRoute
              authenticated={authenticated}
              path="/gots"
              render={(props) => <Gots user={user} {...props} />}
            /> }
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
