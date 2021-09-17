import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ReposPage } from "./components/ReposPage";
import { UserPage } from "./components/UserPage";
import { ContentPage } from "./components/ContentPage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/repos" component={ReposPage} />
          <Route path="/content" component={ContentPage} />
          <Route path="/" component={UserPage} />
        </Switch>
      </div>
    </Router>
  );
}
