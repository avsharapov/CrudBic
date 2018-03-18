import React, {Component} from 'react';
import {chengeInputForm, closeModal, validateUniqueBic, submitEditorForm} from "../actions.jsx";
import {connect} from "react-redux";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import DatePicker from 'react-date-picker';

class EditorModal extends Component {
    render() {
        const {
            additionalData,
            modalIsVisible,
            onCloseModal,
            modalTypeCreator,
            rowSelected,
            columnConfigs,
            onChangeInputForm,
            onChangeInputFormDIzm,
            onChangeInputFormDIn,
            onChangeInputFormDCh,
            onChangeBicInput,
            submitEditorModalForm
        } = this.props;

        const title = modalTypeCreator ? 'Создание новой записи' : 'Редактирование записи id=' + rowSelected.itemId;
        const validationState = columnConfigs.every(item => !((item.required && (!item.value || item.value === '')) || item.notUnique))
        return (
            <div>
                <Modal show={modalIsVisible} onHide={onCloseModal} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            {columnConfigs.map((column, i) => {
                                const {
                                    dataField,
                                    title,
                                    hidden,
                                    value,
                                    type,
                                    required,
                                    notUnique
                                } = column;

                                if (hidden) {
                                    return null;
                                }
                                const classFormGroup = 'has-' + ((required && (!value || value === '')) || notUnique ? 'error' : 'success');
                                const helpText = "Это поле обязательно к заполнению" + (dataField === "newnum" ? " и значение должно быть уникальным" : "");
                                return (
                                    <FormGroup controlId={dataField} bsSize="small" key={i} className={classFormGroup}
                                               role="form">
                                        <Col componentClass={ControlLabel} sm={4}>
                                            {title() + (required ? "*" : "")}
                                        </Col>
                                        <Col sm={8}>
                                            {type === "s" ?
                                                <FormControl type="text" defaultValue={modalTypeCreator ? "" : value}
                                                             placeholder="..."
                                                             onChange={dataField === 'newnum' ? onChangeBicInput : onChangeInputForm}
                                                /> :
                                                type === "d" ?
                                                    <DatePicker
                                                        value={!value || value === '' ? null : new Date(value.split('.').reverse().join("."))}
                                                        onChange={dataField === "dt_izm" ? onChangeInputFormDIzm : (dataField === "date_in" ? onChangeInputFormDIn : onChangeInputFormDCh)}/> :
                                                    type === "o" ?
                                                        <FormControl componentClass="select"
                                                                     defaultValue={modalTypeCreator ? -1 : value}
                                                                     onChange={onChangeInputForm}>
                                                            <option disabled value={-1} key={-1}>...</option>
                                                            {Object.keys(additionalData[dataField]).map((key) => {
                                                                return (<option value={key}
                                                                                key={key}>{additionalData[dataField][key]}</option>)
                                                            })}
                                                        </FormControl>
                                                        : ""
                                            }
                                            {required ? <HelpBlock>{helpText}</HelpBlock> : null}

                                        </Col>
                                    </FormGroup>
                                );
                            })
                            }

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button className="pull-right" disabled={!validationState}
                                            onClick={submitEditorModalForm}>Сохранить</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
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
        onChangeInputForm: (e) => dispatch(chengeInputForm(e.target.id, e.target.value)),
        onChangeInputFormDIzm: (value) => dispatch(chengeInputForm("dt_izm", value ? new Date(value).toLocaleDateString() : value)),
        onChangeInputFormDIn: (value) => dispatch(chengeInputForm("date_in", value ? new Date(value).toLocaleDateString() : value)),
        onChangeInputFormDCh: (value) => dispatch(chengeInputForm("date_ch", value ? new Date(value).toLocaleDateString() : value)),
        onChangeBicInput: (e) => dispatch(validateUniqueBic(e.target.value)),
        submitEditorModalForm: () => dispatch(submitEditorForm()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorModal)