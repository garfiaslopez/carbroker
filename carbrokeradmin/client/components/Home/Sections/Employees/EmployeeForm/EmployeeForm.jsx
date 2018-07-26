import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import GeneralStyles from '../EmployeesStyles';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';


class EmployeeForm extends Component {

    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);

        this.handleChangeProperty = this.handleChangeProperty.bind(this);
        this.onClickUploadPhoto = this.onClickUploadPhoto.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);

        this.onDrop = this.onDrop.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);

        this.handleAlert = this.handleAlert.bind(this);

        this.state = {
            selectedModel: this.props.employee,
            openAlert: false,
            message: ''
        }
    }
    handleAlert(msg) {
        this.setState({ openAlert: true, message: msg });
    }
    save() {
        if (this.state.selectedModel.name &&
            this.state.selectedModel.lastname &&
            this.state.selectedModel.email) {
                if(this.state.selectedModel._id === undefined){
                    Meteor.call('user_insert', this.state.selectedModel, (err, res) => {
                        if (err) {
                            console.log(err);
                            this.handleAlert(err.message);
                        } else {
                            console.log(res);
                        }
                    });
                }else{
                    Meteor.call('user_update', this.state.selectedModel._id, this.state.selectedModel, (err, res) => {
                        if (err) {
                            console.log(err);
                            this.handleAlert(err.message);
                        } else {
                            console.log(res);
                        }
                    });
                }
        }
    }
    delete() {
        if(this.state.selectedModel._id !== undefined) {
            Meteor.call('user_delete', this.state.selectedModel._id, (err, res) => {
                if (err) {
                    console.log(err);
                    this.handleAlert(err.message);
                } else {
                    console.log(res);
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
    handleChangeImage(url, file){
        let newModel = this.state.selectedModel;
        newModel.profilePhoto = url;
        this.setState({
            selectedModel: newModel,
            imagePrev: file
        });
    }
    handleChangeDate(event, date) {
        let newModel = this.state.selectedModel;
        newModel.birthdate = date;
        this.setState({
            selectedModel: newModel
        });
    }
    handleChangeType(event, index, value) {
        let newModel = this.state.selectedModel;
        newModel.type = value;
        this.setState({
            selectedModel: newModel
        });
    }
    onClickUploadPhoto() {
        this.refs.dropzone.open();
    }
    onDrop(files){
        if(files.length > 0){
            Cloudinary.upload(files, {}, function(err, res) {
                this.handleChangeImage(res.url, files[0]);
            }.bind(this));
        }
    }


    render() {
        let EmployeeTypes = ["operador","cabinista"];
        const DropdownItems = EmployeeTypes.map((C, index)=>{
            return(
                <MenuItem key={index} value={C} primaryText={C} />
            );
        });
        const modalActions = [
          <FlatButton
            label="Entendido"
            primary={true}
            onClick={() => {
                this.setState({
                    openAlert: false,
                    message: ''
                });
            }}
          />,
        ];
        return (
            <div>
                <div style={GeneralStyles.CenterContainer}>
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
                      value={this.state.selectedModel.lastname}
                      onChange={this.handleChangeProperty}
                      id="lastname"
                      hintText="Apellidos"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelText="Apellidos"
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.email}
                      onChange={this.handleChangeProperty}
                      id="email"
                      ref="email"
                      hintText="Correo Electrónico"
                      floatingLabelText="Correo Electrónico"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.phone}
                      onChange={this.handleChangeProperty}
                      id="phone"
                      hintText="Telefono"
                      floatingLabelText="Telefono"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <TextField
                      value={this.state.selectedModel.address}
                      onChange={this.handleChangeProperty}
                      id="address"
                      hintText="Direccion"
                      floatingLabelText="Direccion"
                      hintStyle={GeneralStyles.HintStyle}
                      floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                      underlineFocusStyle={GeneralStyles.UnderlineStyle}
                      style={GeneralStyles.ChildContainer}
                    />
                    <DropDownMenu
                      value={this.state.selectedModel.type || ''}
                      onChange={this.handleChangeType}
                      style={GeneralStyles.ChildContainer}
                      autoWidth={false}
                    >
                      {DropdownItems}
                    </DropDownMenu>
                    <DatePicker
                        id="birthdate"
                        value={this.state.selectedModel.birthdate}
                        hintText="Fecha nacimiento"
                        mode="landscape"
                        cancelLabel="Cancelar"
                        onChange={this.handleChangeDate}
                        style={GeneralStyles.DatePicker}
                        textFieldStyle={GeneralStyles.ChildContainer}
                    />
                    <div style={GeneralStyles.ChildContainerRow}>
                        <Dropzone
                          onDrop={this.onDrop}
                          multiple={false}
                          accept="image/*"
                          ref="dropzone"
                          style={GeneralStyles.DropzoneBox}
                        >
                        </Dropzone>
                        <RaisedButton
                          label="Subir fotografia "
                          secondary={true}
                          style={GeneralStyles.ButtonPhoto}
                          onClick={this.onClickUploadPhoto}
                          icon={<AddAPhoto />}
                        />
                    </div>
                    {this.state.imagePrev ?
                        <div style={GeneralStyles.ContainerPhoto}>
                            <img
                              style={GeneralStyles.ImagePreview}
                              src={this.state.imagePrev.preview}
                            />
                        </div>
                    :null}
                </div>
                <Dialog
                  actions={modalActions}
                  modal={false}
                  open={this.state.openAlert}
                  onRequestClose={() => {
                      this.setState({
                          openAlert: false,
                          message: ''
                      })
                  }}
                >
                    {this.state.message}
                </Dialog>
            </div>
        );
    }
}

export default EmployeeForm;
