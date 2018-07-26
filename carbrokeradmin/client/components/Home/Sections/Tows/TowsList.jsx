import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Tow } from '../../../../../collections/Tow';
import { TowIndex } from '../../../../../collections/Tow';

import GeneralStyles from './TowsStyles';
import TowsForm from './TowsForm/TowsForm';

//Components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
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

class TowsList extends Component {

    constructor(props) {
        super(props);

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
    handleSearchText(event) {
        let searchText = event.target.value;
        this.setState({
            searchText: searchText,
            dataArray: UserIndex.search(searchText).fetch()
        });
    }
    renderModal() {
        if (this.state.openModal) {
            return(
                <TowsForm
                    tow={this.state.selectedModel}
                    closeModal={this.close}
                />
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
                      <TableRowColumn>{object.towNumber}</TableRowColumn>
                      <TableRowColumn>{object.plates}</TableRowColumn>
                      <TableRowColumn>{object.folioNumber}</TableRowColumn>
                      <TableRowColumn>{object.initialKm}</TableRowColumn>
                      <TableRowColumn>{object.finalKm}</TableRowColumn>
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
                              title="Lista de grúas"
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
                                        <TableHeaderColumn>No. Grúa</TableHeaderColumn>
                                        <TableHeaderColumn>Placas</TableHeaderColumn>
                                        <TableHeaderColumn>No. Folio</TableHeaderColumn>
                                        <TableHeaderColumn>Km Inicial</TableHeaderColumn>
                                        <TableHeaderColumn>Km Final</TableHeaderColumn>
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

TowsList.propTypes = propTypes;

export default createContainer(() => {
    return {
        data: Tow.find().fetch()
    };
}, TowsList);
