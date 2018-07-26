/**
 * LOGIN COMPONENT
 */
import React, { Component, PropTypes } from 'react';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LoginStyles from './LoginStyles';

const contextTypes = {
    router: PropTypes.object.isRequired
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
                open: false
        };
        this.doLogin = this.doLogin.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount() {

    }
    handleOpen(msg) {
      this.setState({open: true,MsgToShow:msg});
    };
    handleClose() {
      this.setState({open: false});
    };
    doLogin() {
        if(this.refs.email.input.value !== '' && this.refs.password.input.value !== '') {
            const SearchUser = { email: this.refs.email.input.value, password: this.refs.password.input.value};
            Meteor.call('login', SearchUser, (err, res) => {
                if (err) {
                    console.log(err);
                    this.handleOpen('Usuario o Contraseña incorrectos');
                } else {
                    const expirationDate = moment().add(7, 'days').toDate();
                    cookies.set('CarbrokerApp', JSON.stringify(res), { path: '/' , expires: expirationDate});
                    this.props.history.push('/Home');
                }
            });
        }else{
            this.handleOpen('Favor de rellenar todos los datos');
        }
    }
    render() {
        const actions = [
          <FlatButton
            label="Entendido"
            primary={true}
            onClick={this.handleClose}
          />,
        ];
        return (
            <div style={LoginStyles.ContainerStyle}>
                <div style={LoginStyles.CenterContainer}>
                    <img src="images/MainLogo.png" style={LoginStyles.MainLogo}/>
                    <TextField
                      ref="email"
                      hintText="Email"
                      hintStyle={LoginStyles.HintStyle}
                      floatingLabelText="Email"
                      floatingLabelStyle={LoginStyles.FloatingLabelStyle}
                      underlineFocusStyle={LoginStyles.UnderlineStyle}
                      style={LoginStyles.ChildContainer}
                    />
                    <TextField
                      ref="password"
                      hintText="********"
                      floatingLabelText="Password"
                      hintStyle={LoginStyles.HintStyle}
                      floatingLabelStyle={LoginStyles.FloatingLabelStyle}
                      underlineFocusStyle={LoginStyles.UnderlineStyle}
                      style={LoginStyles.ChildContainer}
                    />
                    <br/>
                    <br/>
                    <RaisedButton
                      label="Iniciar Sesión"
                      secondary={true}
                      style={LoginStyles.ChildContainer}
                      onClick={this.doLogin}
                    />

                </div>
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
                {this.state.MsgToShow}
            </Dialog>
            </div>
        );
    }
}

Login.contextTypes = contextTypes;


export default Login;
