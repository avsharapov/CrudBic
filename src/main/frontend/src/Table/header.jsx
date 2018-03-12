import React, {Component} from 'react';
import styles from '../style.css';


export default class Header extends Component {
    state = {rowSelected: {rowIndex: null, itemId: null}};

    componentWillReceiveProps(nextProps) {
        this.setState({rowSelected: nextProps.rowSelected});
    }

    render() {
        return (
            <div className="row">
                <div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className={styles["tool-btn-group"]}>
                            <div className="btn-group btn-group-lg" role="group">
                                <button type="button" className="btn btn-success react-bs-table-add-btn " onClick={this.props.createHandler}>
                            <span>
                                <i className="glyphicon glyphicon-plus"></i>New</span>
                                </button>
                                <button type="button" className="btn btn-warning react-bs-table-add-btn "
                                        disabled={this.state.rowSelected.rowIndex == null}
                                        onClick={() => this.props.editHandler(this.state.rowSelected.itemId)}>
                            <span>
                                <i className="glyphicon glyphicon-edit"></i>Edit</span>
                                </button>
                                <button type="button" className="btn btn-danger react-bs-table-add-btn "
                                        disabled={this.state.rowSelected.rowIndex == null}
                                        onClick={() => this.props.deleteHandler(this.state.rowSelected.itemId)}>
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