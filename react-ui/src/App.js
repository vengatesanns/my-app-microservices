import React, { useState } from "react";
import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import { Route, Switch } from "react-router-dom";
import HomeComponent from "./components/homepage/HomePage";
import PageNotFound from "./components/common/error-page/PageNotFound";
import Spinner from "./components/common/spinner/spinner";

function App() {
  const [spinner, setSpinner] = useState(false);
  const Loader = status => setSpinner(status);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={["/", "/login"]}
          render={() => <SignIn loader={Loader} />}
        ></Route>
        <Route path="/home" component={HomeComponent}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      {spinner && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
