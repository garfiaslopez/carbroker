import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cloudinary from 'cloudinary';
import { Cookies } from 'react-cookie';

injectTapEventPlugin();

// COLORS:
// RED: #E01B22
// BLACK: #231F20


import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NotFound from './helpers/NotFound';

const history = createBrowserHistory();


function wrapper(Component) {
    return React.createClass({
        render: function() {
            const cookies = new Cookies();
            const Cookie = cookies.get('CarbrokerApp');
            if(Cookie){
                return (
                    <Component {...this.props} session={Cookie}/>
                );
            }else{
                return (
                    <Login {...this.props}/>
                );
            }
        }
    });
}

class MainApp extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <MuiThemeProvider>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/Login" component={wrapper(Login)}/>
                        <Route path="/Home" component={wrapper(Home)}/>
                        <Route path="/*" component={NotFound}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

Meteor.startup(()=>{
    Cloudinary.config({cloud_name: 'carbroker'});
    render(<MainApp />, document.getElementById('render-target'));
});
