import React, { Component, PropTypes} from 'react';
import {
    TableFooter,
    TableRow,
    TableRowColumn,
    FontIcon,
    IconButton
} from 'material-ui';

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

const propTypes = {
    offset: PropTypes.number.isRequired, // current offset
    total: PropTypes.number.isRequired, // total number of rows
    limit: PropTypes.number.isRequired, // num of rows in each page
    onPageClick: PropTypes.func // what to do after clicking page number
};

class Footer extends Component {
    constructor(props) {
        super(props);
        this.onPageClick = this.onPageClick.bind(this);
    }
    onPageClick(event) {
        this.props.onPageClick(event);
    }
    render() {
        let offset = this.props.offset;
        let total = this.props.total;
        let limit = this.props.limit;
        return (
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn style={styles.footerContent}>
                <IconButton disabled={offset === 0} onClick={this.props.onPageClick.bind(null, offset - limit)}>
                  <FontIcon className="material-icons">Atras</FontIcon>
                </IconButton>
                <IconButton disabled={offset + limit >= total} onClick={this.props.onPageClick.bind(null, offset + limit)}>
                  <FontIcon className="material-icons">Adelante</FontIcon>
                </IconButton>
              </TableRowColumn>
              <TableRowColumn style={styles.footerText}>
                {Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' De ' + total}
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        );
    }
}

Footer.propTypes = propTypes;

export default Footer;
