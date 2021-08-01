import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import List from "./screens/list";
import Single from "./screens/single";
import NoMatch from "./screens/noMatch";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/perfil/:login" component={Single} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
