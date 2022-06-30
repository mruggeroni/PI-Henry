import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import About from './components/About';
import GameDetails from './components/GameDetails';
import Nav from './components/Nav';
import GameCreation from './components/GameCreation';


export default function App() {
  return (
    <div className="App">
      <Route path="/home" component={Nav} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/about" component={About} />
        <Route 
          path="/home/game/:id" 
          render={(match) => <GameDetails id={match.params.id} />}
        />
        <Route path="/home/creategame" component={GameCreation} />
        {/* <Route path="/home/edit/:id" >
          <GameCreation id={id} />
        </Route> */}
      </Switch>
    </div>
  );
};