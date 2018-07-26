import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import GeneralStyles from '../QuotationsStyles';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class CategoryForm extends Component {

    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChangeProperty = this.handleChangeProperty.bind(this);

        this.state = {
            selectedIndex: this.props.selectedIndex,
            selectedModel: this.props.quotation,
            openError: false,
            errorMessage: ''
        }
    }

    save() {
        if (this.state.selectedModel.finalClient &&
            this.state.selectedModel.contact) {
                if(this.state.selectedModel._id === undefined){
                    Meteor.call('quotation_insert', this.state.selectedModel, (err, res) => {
                        if (err) {
                            console.log(err);
                            this.openAlert(err.message)
                        } else {
                            console.log(res);
                            this.props.close();
                        }
                    });
                } else {
                    Meteor.call('quotation_update', this.state.selectedModel, this.state.selectedModel._id, (err, res) => {
                        if (err) {
                            console.log(err);
                            this.openAlert(err.message)
                        } else {
                            console.log(res);
                            this.props.close();
                        }
                    });
                }
        }
    }

    delete() {
        if(this.state.selectedModel._id !== undefined) {
            Meteor.call('quotation_delete', this.state.selectedModel._id, (err, res) => {
                if (err) {
                    console.log(err);
                    this.openAlert(err.message)
                } else {
                    console.log(res);
                    this.props.close();
                }
            });
        }
    }

    handleChangeProperty(event) {
        let newModel = this.state.selectedModel;
        newModel[event.target.id] = event.target.value;
        this.setState({
            selectedModel: newModel
        });
    }
    openAlert(message) {
        this.setState({
            openError: true,
            errorMessage: message
        });
    }
    renderErrorModal() {
        const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              onTouchTap={() => {
                  this.setState({
                      openError: false
                  })
              }}
            />,
        ];
        if (this.state.openError) {
            return(
                <Dialog
                  title={"Aviso"}
                  actions={actions}
                  modal={true}
                  open={this.state.openError}
                >
                    <p>{this.state.errorMessage}</p>
                </Dialog>
            );
        }
        return (<div></div>);
    }

    render() {
        let label = "Cotizaciones";
        const actions = [
            <FlatButton
              label="Cancelar"
              primary={false}
              onTouchTap={()=>{
                  this.props.close()
              }}
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
            label = "Editar Cotización";
        } else {
            label = "Agregar Cotización";
        }
        return (
            <Dialog
              title={label}
              actions={actions}
              modal={true}
              open={true}
              autoScrollBodyContent={true}
            >
                <div style={GeneralStyles.CenterContainer}>
                    <TextField
                      value={this.state.selectedModel.finalClient}
                      onChange={this.handleChangeProperty}
                      id="finalClient"
                      hintText="Nombre De Cliente"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Nombre De Cliente"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.contact}
                      onChange={this.handleChangeProperty}
                      id="contact"
                      hintText="Contacto"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Contacto"
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
                      value={this.state.selectedModel.origin}
                      onChange={this.handleChangeProperty}
                      id="origin"
                      hintText="Origen"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Origen"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.destiny}
                      onChange={this.handleChangeProperty}
                      id="destiny"
                      hintText="Destino"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Destino"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.carBrand}
                      onChange={this.handleChangeProperty}
                      id="carBrand"
                      hintText="Marca de auto"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Marca de auto"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.carModel}
                      onChange={this.handleChangeProperty}
                      id="carModel"
                      hintText="Modelo de auto"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Modelo de auto"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.kilometers}
                      onChange={this.handleChangeProperty}
                      id="kilometers"
                      hintText="Kilometros"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Kilometros"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.basePrice}
                      onChange={this.handleChangeProperty}
                      id="basePrice"
                      hintText="Precio Traslado ($)"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Precio Traslado ($)"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.tollboothPrice}
                      onChange={this.handleChangeProperty}
                      id="tollboothPrice"
                      hintText="Precio Casetas ($)"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Precio Casetas ($)"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.observations}
                      onChange={this.handleChangeProperty}
                      id="observations"
                      hintText="Observaciones"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Observaciones"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                </div>
            </Dialog>
        );
    }
}

export default CategoryForm;
