import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import GameDetails from './components/GameDetails/GameDetails.jsx';
import Nav from './components/Nav/Nav.jsx';
import GameCreation from './components/GameCreation/GameCreation.jsx';
import Page404 from './components/Page404/Page404.jsx';
import './App.css';
import './BackgroundVideo.css';


export default function App() {
  return (
    <div className="App">
      <Route path="/home" component={Nav} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/about" component={About} />
        <Route exact path="/home/creategame" component={GameCreation} />
        <Route exact path="/home/game/edit/:id" component={GameCreation} />
        <Route exact path="/home/game/:id" component={GameDetails} />
        <Route path="/*" component={Page404} />
      </Switch>
    </div>
  );
};