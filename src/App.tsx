import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';


const App: FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container pt-4">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/profile/:name" component={Profile} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;