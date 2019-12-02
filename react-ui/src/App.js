import React, { createContext } from "react";
import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import { Route, Switch } from "react-router-dom";
import HomeComponent from "./components/homepage/HomePage";
import PageNotFound from "./components/common/error-page/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={["/", "/login"]} component={SignIn}></Route>
        <Route path="/home" component={HomeComponent}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
