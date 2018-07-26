import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import TextField from 'material-ui/TextField';

import GeneralStyles from '../ClientsStyles';

import { Client } from '../../../../../../collections/Client';
import { Fare } from '../../../../../../imports/api/fare';
import { ClientIndex } from '../../../../../../collections/Client';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';


class ClientsForm extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);

        this.handleChangeProperty = this.handleChangeProperty.bind(this);
        this.handleChangeFare = this.handleChangeFare.bind(this);

        this.state = {
            selectedModel: this.props.client
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextPropsClientsForm");
        console.log(nextProps);
        if (nextProps.fares && nextProps.fares.length > 0) {
            if(this.state.selectedModel._id === undefined) {
                const newModel = this.state.selectedModel;
                newModel.fare = nextProps.fares[0];
                this.setState({
                    selectedModel: newModel
                });
            }
        }
    }
    close(){
        this.props.closeModal();
    }
    save() {
        console.log("Saving");
        console.log(this.state.selectedModel);
        if (this.state.selectedModel.fare &&
            this.state.selectedModel.name) {
                if(this.state.selectedModel._id === undefined){
                    Client.insert(this.state.selectedModel);
                }else{
                    Client.update(this.state.selectedModel._id,this.state.selectedModel);
                }
        }
        this.close();
    }
    delete() {
        if(this.state.selectedModel._id !== undefined) {
            Client.remove(this.state.selectedModel._id);
        }
        this.close();
    }
    handleChangeProperty(event) {
        let newModel = this.state.selectedModel;
        newModel[event.target.id] = event.target.value;
        this.setState({
            selectedModel: newModel
        });
    }
    handleChangeFare(event, index, value) {
        let newModel = this.state.selectedModel;
        newModel.fare = value;
        this.setState({
            selectedModel: newModel
        });
    }

    render() {
        let DropdownItems = [];
        if (this.props.fares) {
            DropdownItems = this.props.fares.map((C, index)=>{
                return(
                    <MenuItem key={index} value={C._id} primaryText={`${C.description} - $${C.price}`} />
                );
            });
        }
        let label = "Clientes";
        const actions = [
            <FlatButton
              label="Cancelar"
              primary={false}
              onTouchTap={this.close}
            />,
            <FlatButton
              label="Guardar"
              primary={true}
              onTouchTap={this.save}
            />,
        ];
        if (this.state.selectedIndex !== undefined) {
            actions.unshift(
                <FlatButton
                  label="Eliminar"
                  primary={false}
                  disabled={false}
                  style={GeneralStyles.CancelButton}
                  onTouchTap={this.delete}
                />
            );
            label = "Editar Cliente";
        } else {
            label = "Agregar Cliente";
        }
        return (
            <Dialog
              title={label}
              actions={actions}
              modal={true}
              open={true}
              contentStyle={GeneralStyles.Modal}
              autoScrollBodyContent={true}
            >
                <div style={GeneralStyles.CenterContainer}>
                    <DropDownMenu
                      value={this.state.selectedModel.fare || ''}
                      onChange={this.handleChangeFare}
                      style={GeneralStyles.ChildContainer}
                      autoWidth={false}
                    >
                      {DropdownItems}
                    </DropDownMenu>
                    <TextField
                      value={this.state.selectedModel.name}
                      onChange={this.handleChangeProperty}
                      id="name"
                      hintText="Nombre"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Nombre"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.denomination}
                      onChange={this.handleChangeProperty}
                      id="denomination"
                      hintText="Denominacion"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Denominacion"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.phone}
                      onChange={this.handleChangeProperty}
                      id="phone"
                      hintText="Telefono"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Telefono"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.address}
                      onChange={this.handleChangeProperty}
                      id="address"
                      hintText="Direccion"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Direccion"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.email}
                      onChange={this.handleChangeProperty}
                      id="email"
                      hintText="Email"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Email"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                </div>
            </Dialog>
        );
    }
}

export default createContainer((props) => {
    return {
        fares: Fare.find().fetch(),
    };
}, ClientsForm);
