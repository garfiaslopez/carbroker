import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

import GeneralStyles from '../FaresStyles';

import { Fare } from '../../../../../../imports/api/fare';
import { FareIndex } from '../../../../../../imports/api/fare';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class FaresForm extends Component {
    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChangeProperty = this.handleChangeProperty.bind(this);

        this.openAlert = this.openAlert.bind(this);
        this.renderErrorModal = this.renderErrorModal.bind(this);

        this.state = {
            selectedModel: this.props.fare,
            openError: false,
            errorMessage: '',
        }
    }
    save() {
        if (this.state.selectedModel.price && this.state.selectedModel.description) {
            if(this.state.selectedModel._id === undefined){
                Meteor.call('fare_insert', this.state.selectedModel, (err, res) => {
                    if (err) {
                        console.log(err);
                        this.openAlert(err.message)
                    } else {
                        console.log(res);
                        this.props.close();
                    }
                });
            }else{
                Meteor.call('fare_update', this.state.selectedModel, this.state.selectedModel._id, (err, res) => {
                    if (err) {
                        console.log(err);
                        this.openAlert(err.message)
                    } else {
                        console.log(res);
                        this.props.close();
                    }
                });
            }
        } else {
            this.openAlert('Favor de ingresar todos los datos correctamente.');
        }
    }
    delete() {
        if(this.state.selectedModel._id !== undefined) {
            Meteor.call('fare_delete', this.state.selectedModel._id, (err, res) => {
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
        return (
            <div>
                <div style={GeneralStyles.CenterContainer}>
                    <TextField
                      value={this.state.selectedModel.description}
                      onChange={this.handleChangeProperty}
                      id="description"
                      hintText="Descripción"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Descripción"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.price}
                      onChange={this.handleChangeProperty}
                      id="price"
                      hintText="Precio"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Precios"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                </div>
                {this.renderErrorModal()}
            </div>
        );
    }
}

export default FaresForm;
