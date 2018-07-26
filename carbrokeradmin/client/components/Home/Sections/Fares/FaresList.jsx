import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Fare } from '../../../../../imports/api/fare';
import { FareIndex } from '../../../../../imports/api/fare';

import GeneralStyles from './FaresStyles';
import FaresForm from './FaresForm/FaresForm';

//Components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

//ICons
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';

//Buttons
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const propTypes = {
    data: PropTypes.array
};

class FaresList extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);

        this.clickCell = this.clickCell.bind(this);
        this.add = this.add.bind(this);
        this.close = this.close.bind(this);
        this.handleSearchText = this.handleSearchText.bind(this);

        this.state = {
            openModal: false,
            selectedIndex: undefined,
            selectedModel: {},
            dataArray: this.props.data
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataArray: nextProps.data
        });
    }
    clickCell(index){
        console.log("ON CELL CLICK");
        console.log(index);
        this.setState({
            openModal: true,
            selectedIndex: index,
            selectedModel: this.state.dataArray[index]
        });
    }
    add() {
        this.setState({
            openModal: true
        });
    }
    close() {
        this.setState({
            openModal: false,
            selectedIndex: undefined,
            selectedModel: {}
        });
    }
    save() {
        this.form.save();
    }
    delete() {
        this.form.delete();
    }
    handleSearchText(event) {
        let searchText = event.target.value;
        const results = FareIndex.search(searchText).fetch();
        this.setState({
            searchText: searchText,
            dataArray: results
        });
    }
    renderModal() {
        let label = "Tarifas";
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
            label = "Editar Tarifa";
        } else {
            label = "Agregar Tarifa";
        }
        if (this.state.openModal) {
            return(
                <Dialog
                  title={label}
                  actions={actions}
                  modal={true}
                  open={this.state.openModal}
                >
                    <FaresForm
                        close={this.close}
                        fare={this.state.selectedModel}
                        ref={(c) => { this.form = c; }}
                    />
                </Dialog>
            );
        }
        return (<div></div>);
    }
    render() {
        let Objects = [];
        if (this.state.dataArray) {
            Objects = this.state.dataArray.map((object, index) => {
                return (
                    <TableRow key={object._id}>
                      <TableRowColumn>{object.description}</TableRowColumn>
                      <TableRowColumn>{object.price}</TableRowColumn>
                    </TableRow>
                );
            });
        }
        return (
            <div>
                <div style={GeneralStyles.ContainerStyle}>
                    <div style={GeneralStyles.CardContainer}>
                        <div style={GeneralStyles.SearchBar}>
                            <TextField
                              value={this.state.searchText}
                              onChange={this.handleSearchText}
                              ref="search"
                              hintText="Busqueda"
                              hintStyle={GeneralStyles.HintStyle}
                              floatingLabelText="Busqueda"
                              floatingLabelStyle={GeneralStyles.FloatingLabelStyle}
                              underlineFocusStyle={GeneralStyles.UnderlineStyle}
                              style={{width: '100%'}}
                            />
                        </div>
                        <Card style={GeneralStyles.Card}>
                            <CardHeader
                              title="Lista de tarifas"
                            />
                            <Divider />
                            <div style={GeneralStyles.ContainerActionButton}>
                                <FloatingActionButton
                                  style={GeneralStyles.FloatingButton}
                                  mini={true}
                                  onClick={this.add}
                                >
                                    <ContentAdd />
                                </FloatingActionButton>
                            </div>
                            <div style={GeneralStyles.TableContainer}>
                                <Table
                                    onCellClick={this.clickCell}
                                >
                                    <TableHeader
                                        displaySelectAll={false}
                                        adjustForCheckbox={false}
                                    >
                                    <TableRow>
                                        <TableHeaderColumn>Descripción</TableHeaderColumn>
                                        <TableHeaderColumn>Total</TableHeaderColumn>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        displayRowCheckbox={false}
                                        showRowHover={true}
                                        stripedRows={true}
                                    >
                                    {Objects}
                                    </TableBody>
                                  </Table>
                            </div>
                        </Card>
                    </div>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

FaresList.propTypes = propTypes;

export default createContainer(() => {
    Meteor.subscribe('allFares');
    return {
        data: Fare.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, FaresList);
