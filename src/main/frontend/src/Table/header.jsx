import React, {Component} from 'react';
import styles from '../style.css';
import {connect} from "react-redux";
import {deleteItem, createItem, changeItem} from "../actions.jsx";


class Header extends Component {
    render() {
        const {createHandler, editHandler, deleteHandler, rowSelected} = this.props;
        return (
            <div className="row">
                <div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className={styles["tool-btn-group"]}>
                            <div className="btn-group btn-group-lg" role="group">
                                <button type="button" className="btn btn-success react-bs-table-add-btn "
                                        onClick={() => createHandler()}>
                            <span>
                                <i className="glyphicon glyphicon-plus"></i>New</span>
                                </button>
                                <button type="button" className="btn btn-warning react-bs-table-add-btn "
                                        disabled={rowSelected.rowIndex == null}
                                        onClick={() => editHandler()}>
                            <span>
                                <i className="glyphicon glyphicon-edit"></i>Edit</span>
                                </button>
                                <button type="button" className="btn btn-danger react-bs-table-add-btn "
                                        disabled={rowSelected.rowIndex == null}
                                        onClick={() => deleteHandler()}>
                            <span>
                                <i className="glyphicon glyphicon-trash"></i>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10"><h3 className={styles.caption}>Справочник
                        БИК
                        (Банковский идентификационный код) Банка
                        России</h3></div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state.tableReducer
};

const mapDispatchToProps = dispatch => {
    return {
        createHandler: () => dispatch(createItem()),
        editHandler: () => dispatch(changeItem()),
        deleteHandler: () => dispatch(deleteItem()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)