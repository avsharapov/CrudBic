import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {closeModal} from "../actions.jsx";
import {connect} from "react-redux";

class EditorModal extends Component {
    handleSaveBtnClick = () => {
        const {columns, onSave} = this.props;
        const newRow = {};
        columns.forEach((column, i) => {
            newRow[column.dataField] = this.refs[column.dataField].value;
        }, this);
        // You should call onSave function and give the new row
        onSave(newRow);
    };

    render() {
        const {modalIsVisible, onCloseModal, modalType, rowSelected, columnConfigs} = this.props;
        const title = modalType === 'CREATOR' ? 'Создание новой записи' : 'Редактирование записи id=' + rowSelected.itemId;
        return (
            <div>
                <Modal open={modalIsVisible} onClose={onCloseModal}>
                    <div className="row modalRow">
                        <div className="col-lg-12">
                            <div className="panel modalPanel">
                                <div className="panel-heading">
                                    <h3>{title}</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTables-example">
                                            <thead>
                                            {columnConfigs.map((column, i) => {
                                                const {
                                                    dataField,
                                                    text,
                                                    hidden
                                                } = column;

                                                if (hidden) {
                                                    return null;
                                                }
                                                return (
                                                    <tr key={dataField}>
                                                        <td>{text}</td>
                                                        <td><input ref={dataField} type='text'
                                                                   defaultValue={dataField.length}/></td>
                                                    </tr>
                                                );
                                            })
                                            }
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.tableReducer
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseModal: () => dispatch(closeModal()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorModal)