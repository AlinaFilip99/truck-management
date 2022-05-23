import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./m/pages/login";
import Home from "./m/pages/home";
import Register from "./m/pages/register";
import TruckDetails from "./m/pages/truckDetails";
import Trips from "./m/pages/trips";
import Profile from "./m/pages/profile";
import TripsTruck from "./m/pages/tripsTruck";
import AboutPage from "./m/pages/about";
import ContactPage from "./m/pages/contact";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/trucks",
    component: Home,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/truck-details/:_userid",
    component: TruckDetails,
  },
  {
    path: "/trips",
    component: Trips,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/trips-truck/:_userid",
    component: TripsTruck,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
];

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route, key) => {
            return (
              <Route
                key={key}
                path={route.path}
                exact
                component={route.component}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
