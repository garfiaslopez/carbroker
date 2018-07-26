import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import GeneralStyles from './QuotationsStyles';
import QuotationsForm from './QuotationsForm/QuotationsForm';
import QuotationTable from './QuotationTable';

//Components
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

class QuotationsList extends Component {

    constructor(props) {
        super(props);

        this.collection = 'quotation';
        
        this.clickCell = this.clickCell.bind(this);
        this.add = this.add.bind(this);
        this.close = this.close.bind(this);
        this.handleSearchText = this.handleSearchText.bind(this);
        this.clickedFooter = this.clickedFooter.bind(this);

        this.tableModel = [
            {
                title: 'No.',
                key: '_id'
            },
            {
                title: 'Fecha',
                key: 'date'
            },
            {
                title: 'Cliente',
                key: 'finalClient'
            },
            {
                title: 'Kilometros',
                key: 'kilometers'
            },
            {
                title: 'Precio',
                key: 'totalPrice'
            },
        ];

        this.state = {
            openModal: false,
            selectedIndex: undefined,
            selectedModel: {},
            dataArray: this.props.data,
            actualPage: 1,
            maxPerPage: 2,
            docCount: 0
        }
    }

    componentDidMount() {
        Meteor.call('quotation_count', this.state.maxPerPage, (err, res) => {
            if (err) {
                console.log(err);
                this.openAlert(err.message)
            } else {
                console.log(res);
                this.setState({
                    docCount: res.total
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS LIST");
        this.setState({
            dataArray: nextProps.data
        });
    }

    clickCell(index, data){
        console.log("clicked Cell");
        console.log(index, data);
        this.setState({
            openModal: true,
            selectedIndex: index,
            selectedModel: data
        });
    }

    clickedFooter(page) {
        console.log("ClickedFooter");
        console.log(page);
        this.setState({
            actualPage: page,
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
        console.log(searchText);
        this.setState({
            searchText: searchText,
        });
    }
    renderModal() {
        if (this.state.openModal) {
            return(
                <QuotationsForm
                    selectedIndex={this.state.selectedIndex}
                    quotation={this.state.selectedModel}
                    close={this.close}
                />
            );
        }
        return (<div></div>);
    }
    render() {
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
                              title="Lista de Cotizaciones"
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
                                <QuotationTable
                                    searchText={this.state.searchText}
                                    model={this.tableModel}
                                    total={this.state.docCount}
                                    offset={this.state.actualPage}
                                    limit={this.state.maxPerPage}
                                    clickedCell={this.clickCell}
                                    onChangeFooter={this.clickedFooter}
                                    collection={this.collection}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

QuotationsList.propTypes = propTypes;

export default QuotationsList;
