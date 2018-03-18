import React, {Component} from 'react';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux';
import {handleTableChange, initData, setSelectedRow} from '../actions.jsx'
import styles from '../style.css';
import Header from './header.jsx';
import Overlay from './overlay.jsx';
import EditorModal from "./modal.jsx";

class Table extends Component {
    componentDidMount() {
        this.props.initData();
    }

    render() {
        const {additionalData, viewData, page, sizePerPage, totalSize, handleTableChange, setSelectedRow, rowStyle, columnConfigs} = this.props;
        const headerOnFilterFormatter = (column, colIndex, {sortElement, filterElement}) => (
            <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                {filterElement}
                {column.text}
                {sortElement}
            </div>
        );

        const ColumnConfigs = columnConfigs.map((column) => {
            switch (column.dataField) {
                case 'pzn': {
                    column.headerFormatter = headerOnFilterFormatter;
                    column.formatter = cell => additionalData['pzn'][cell];
                    column.filter = selectFilter({options: additionalData['pzn']});
                    break;
                }
                case 'uer': {
                    column.headerFormatter = headerOnFilterFormatter;
                    column.formatter = cell => additionalData['uer'][cell];
                    column.filter = selectFilter({options: additionalData['uer']});
                    break;
                }
                case 'tnp': {
                    column.headerFormatter = headerOnFilterFormatter;
                    column.formatter = cell => additionalData['tnp'][cell];
                    column.filter = selectFilter({options: additionalData['tnp']});
                    break;
                }
                case 'rgn': {
                    column.headerFormatter = headerOnFilterFormatter;
                    column.formatter = cell => additionalData['rgn'][cell];
                    column.filter = selectFilter({options: additionalData['rgn']});
                    break;
                }
                case 'newnum': {
                    column.headerFormatter = headerOnFilterFormatter;
                    column.filter = textFilter({placeholder: '...'});
                    break;
                }
                default:
                    column.headerFormatter = headerOnFilterFormatter;
            }
            return column;
        });
        return (
            <div className={styles.wrapper}>
                <BootstrapTable
                    remote
                    keyField="id"
                    data={viewData}
                    columns={ColumnConfigs}
                    filter={filterFactory()}
                    pagination={paginationFactory({page, sizePerPage, totalSize})}
                    onTableChange={handleTableChange}
                    caption={<Header/>}
                    noDataIndication={() => <Overlay/>}
                    rowEvents={{onClick: setSelectedRow}}
                    rowStyle={rowStyle}
                />
                <EditorModal/>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state.tableReducer
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedRow: (e, row, rowIndex) => {
            dispatch(setSelectedRow(rowIndex, row.id))
        },
        handleTableChange: (type, {page, sizePerPage, filters}) => dispatch(handleTableChange(type, page, sizePerPage, filters)),
        initData: () => dispatch(initData()),
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        rowStyle: (row, rowIndex) => {
            return rowIndex === stateProps.rowSelected.rowIndex ?
                {backgroundColor: '#4a464b', color: '#ffffff'} :
                {backgroundColor: '#ffffff', color: '#4a464b'}
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Table)

