import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import HomeStyles from './HomeStyles';
import Mapper from './Sections/MenuMapper';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
import { createContainer } from 'meteor/react-meteor-data';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {open: true};
        this.handleToggle = this.handleToggle.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.closeSession = this.closeSession.bind(this);
        this.changeMenu = this.changeMenu.bind(this);
        this.mapper = new Mapper();

        if(props.session !== undefined) {
            this.mapper.setSession(props.session);
            this.state = {
                sizeScreen: 0,
                selectedMenuIndex: 0,
                renderComponent: this.mapper.getElement(0).component,
                title: this.mapper.getElement(0).title
            }
        } else {
            this.state = {
                sizeScreen: 0,
                selectedMenuIndex: 0
            }
        }

    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleToggle(){
        this.setState({open: !this.state.open});
    }
    handleResize() {
        var SizeScreen = window.innerWidth;
        if (SizeScreen < 640) {
            this.setState({
                sizeScreen: SizeScreen,
                open: false,
                isDocked: false,
                paddingLeft: 0
            });
        }else {
            this.setState({
                sizeScreen: SizeScreen,
                open: true,
                isDocked: true,
                paddingLeft: 256
            });
        }
    }
    closeSession() {
        cookies.remove('CarbrokerApp', { path: '/' });
        this.props.history.push('/Login');
    }
    changeMenu(index){
        this.setState({
            selectedMenuIndex: index,
            renderComponent: this.mapper.getElement(index).component,
            title: this.mapper.getElement(index).title
        });
    }
    render() {
        const MenuItems = this.mapper.getMenus().map((el,index) => {
            let styleSelected = {};
            if (index == this.state.selectedMenuIndex) {
                styleSelected = HomeStyles.MenuSelected;
            }
            return (
                <MenuItem
                  key={index}
                  onClick={() => this.changeMenu(index)}
                  style={styleSelected}
                >
                    {el.title}
                </MenuItem>
            );
        });
        let name = "";
        if(this.props.session) {
            name = this.props.session.name;
        }
        return (
            <div>
                <div style={HomeStyles.ContainerStyle}>
                    <AppBar
                      style = {HomeStyles.AppBarStyle}
                      titleStyle = {HomeStyles.TitleMainTab}
                      title={this.state.title}
                      onLeftIconButtonTouchTap={this.handleToggle}
                      iconElementRight={
                        <IconMenu
                          iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                          }
                          targetOrigin={{horizontal: 'right', vertical: 'top'}}
                          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <MenuItem onClick={this.closeSession} primaryText="Cerrar Sesión" />
                        </IconMenu>
                      }
                    />
                    <div style={{paddingLeft: this.state.paddingLeft}}>
                        <div style={HomeStyles.SubContainer}>
                            {(() => {
                                if (this.state.renderComponent) {
                                    return (
                                        <this.state.renderComponent
                                            sizeScreen={this.state.sizeScreen}
                                            session={this.props.session}
                                        />
                                    );
                                }
                                return '';
                            })()}
                        </div>
                    </div>
                </div>
                <Drawer
                  open={this.state.open}
                  docked={this.state.isDocked}
                  onRequestChange={this.handleToggle}
                >
                    <div style={HomeStyles.Profile}>
                        <Avatar
                          src="images/Profile.png"
                          size={80}
                          style={HomeStyles.Avatar}
                        />
                        <div style={HomeStyles.ChildContainer}>
                            <p style={HomeStyles.Name} > {name} </p>
                        </div>
                    </div>
                    {MenuItems}
                </Drawer>
            </div>
        );
    }
}

export default Home;
