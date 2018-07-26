import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import GeneralStyles from '../BudgetsStyles';
import { Budget } from '../../../../../../collections/Budget';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class BudgetsForm extends Component {

    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChangeProperty = this.handleChangeProperty.bind(this);

        this.state = {
            selectedModel: this.props.budget
        }
    }
    close(){
        this.props.closeModal();
    }
    save() {
        if (this.state.selectedModel.towNumber &&
            this.state.selectedModel.plates) {
                if(this.state.selectedModel._id === undefined){
                    Tow.insert(this.state.selectedModel);
                }else{
                    Tow.update(this.state.selectedModel._id,this.state.selectedModel);
                }
        }
        this.close();
    }
    delete() {
        if(this.state.selectedModel._id !== undefined) {
            Tow.remove(this.state.selectedModel._id);
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

    render() {
        let label = "Grúas";
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
            label = "Editar Grúa";
        } else {
            label = "Agregar Grúa";
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
                      value={this.state.selectedModel.towNumber}
                      onChange={this.handleChangeProperty}
                      id="towNumber"
                      hintText="Numero de grúa"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Numero de grúa"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.plates}
                      onChange={this.handleChangeProperty}
                      id="plates"
                      hintText="Placas"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Placas"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.folioNumber}
                      onChange={this.handleChangeProperty}
                      id="folioNumber"
                      hintText="Numero Poliza"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Numero Poliza"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.initialKm}
                      onChange={this.handleChangeProperty}
                      id="initialKm"
                      hintText="KM Inicial"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="KM Inicial"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.finalKm}
                      onChange={this.handleChangeProperty}
                      id="finalKm"
                      hintText="KM Final"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="KM Final"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                </div>
            </Dialog>
        );
    }
}

export default BudgetsForm;
