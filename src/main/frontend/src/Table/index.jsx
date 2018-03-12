import React, {Component} from 'react';
import filterFactory, {Comparator} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import styles from '../style.css';
import Header from './header.jsx';
import Overlay from './overlay.jsx';
import {ColumnsConfig} from './columns.jsx'


export default class Table extends Component {
    state = {
        page: 1,
        sizePerPage: 25,
        data: [],
        viewData: [],
        totalSize: 0,
        rowSelected: {rowIndex: null, itemId: null},
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.page ? nextProps.page : this.state.page,
            sizePerPage: nextProps.sizePerPage ? nextProps.sizePerPage : this.state.sizePerPage,
            data: nextProps.data ? nextProps.data : this.state.data,
            viewData: nextProps.data ? nextProps.data.slice(0, nextProps.sizePerPage ? nextProps.sizePerPage : this.state.sizePerPage) : this.state.viewData,
            totalSize: nextProps.data ? nextProps.data.length : this.state.totalSize,
        });
    }

    rowStyle = (row, rowIndex) => {
        const style = {};
        if (rowIndex === this.state.rowSelected.rowIndex) {
            style.backgroundColor = '#4a464b';
            style.color = '#ffffff';
        } else {
            style.backgroundColor = '#ffffff';
            style.color = '#4a464b';
        }

        return style;
    };

    rowOnClick = (e, row, rowIndex) => {
        this.setState(() => ({rowSelected: {rowIndex: rowIndex, itemId: row.id}}));
    };

    handleTableChange = (type, {page, sizePerPage, filters}) => {
        const currentIndex = (page - 1) * sizePerPage;
        setTimeout(() => {
            const result = this.state.data.filter((row) => {
                let valid = true;
                for (const dataField in filters) {
                    const {filterVal, filterType, comparator} = filters[dataField];
                    if (filterType === 'TEXT') {
                        if (comparator === Comparator.LIKE) {
                            valid = row[dataField].toString().indexOf(filterVal) > -1;
                        } else {
                            valid = row[dataField] === filterVal;
                        }
                    }
                    if (!valid) break;
                }
                return valid;
            });
            this.setState(() => ({
                page,
                viewData: result.slice(currentIndex, currentIndex + sizePerPage),
                totalSize: result.length,
                sizePerPage,
                rowSelected: {rowIndex: null, itemId: null}
            }));
        }, 2);
        this.setState(() => ({viewData: []}));
    }

    render() {
        const {viewData, page, sizePerPage, totalSize, rowSelected} = this.state;
        return (
            <div className={styles.wrapper}>
                <BootstrapTable
                    insertRow={true}
                    remote={{pagination: true}}
                    keyField="id"
                    data={viewData}
                    columns={ColumnsConfig}
                    filter={filterFactory()}
                    pagination={paginationFactory({ page, sizePerPage, totalSize })}
                    onTableChange={this.handleTableChange}
                    caption={<Header rowSelected={rowSelected} {...this.props}/>}
                    noDataIndication={() => <Overlay/>}
                    rowEvents={{onClick: this.rowOnClick}}
                    rowStyle={this.rowStyle}
                />
            </div>
        );
    }
};