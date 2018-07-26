import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { MongoCollection } from '../../../../../imports/api/quotation';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
    IconButton
} from 'material-ui';

import FontIcon from 'material-ui/FontIcon';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';
import FrontIcon from 'material-ui/svg-icons/navigation/chevron-right';

const propTypes = {
    dataArray: PropTypes.array
};

const styles = {
    footerContent: {
        float: 'right'
    },
    footerText: {
        float: 'right',
        paddingTop: 16,
        height: 16
    }
};

class CategoryTable extends Component {

    constructor(props) {
        super(props);

        this.clickCell = this.clickCell.bind(this);
        this.clickedFooter = this.clickedFooter.bind(this);

        console.log("INIT PROPS:");
        console.log(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS");
        console.log(nextProps);
    }

    clickCell(index){
        this.props.clickedCell(index, this.props.dataArray[index])
    }

    clickedFooter(event){
        this.props.onChangeFooter(event);
    }
    render() {
        let Objects = [];
        if (this.props.dataArray) {
            Objects = this.props.dataArray.map((object, index) => {
                let rows = [];
                if (this.props.model) {
                    rows = this.props.model.map((m,index) => {
                        return (
                            <TableRowColumn key={index}>{String(object[m.key])}</TableRowColumn>
                        );
                    });
                }
                return (
                    <TableRow key={object._id}>
                        {rows}
                    </TableRow>
                );
            });
        }

        const headers = this.props.model.map((m, index) => {
            return (
                <TableHeaderColumn key={index} >{m.title}</TableHeaderColumn>
            );
        });

        let offset = this.props.offset;
        let total = this.props.total;
        let limit = this.props.limit;

        return (
            <div>
                <Table
                    onCellClick={this.clickCell}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                    <TableRow>
                        {headers}
                      </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        stripedRows={true}
                    >
                    {Objects}
                    </TableBody>
                    <TableFooter adjustForCheckbox={false}>
                        <TableRow>
                            <TableRowColumn style={styles.footerContent}>
                                <IconButton disabled={offset <= 1} onClick={this.clickedFooter.bind(null, offset - 1)}>
                                    <BackIcon />
                                </IconButton>
                                <IconButton disabled={offset + limit > total} onClick={this.clickedFooter.bind(null, offset + 1)}>
                                    <FrontIcon />
                                </IconButton>
                            </TableRowColumn>
                            <TableRowColumn style={styles.footerText}>
                                {Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' De ' + total}
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                  </Table>
            </div>
        );
    }
}

CategoryTable.propTypes = propTypes;

export default createContainer((ownProps) => {
    Meteor.subscribe('get_' + ownProps.collection, {
        searchText: ownProps.searchText,
        page: ownProps.offset,
        perPage: ownProps.limit,
        total: ownProps.total
    });
    return {
        dataArray: MongoCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, CategoryTable);
