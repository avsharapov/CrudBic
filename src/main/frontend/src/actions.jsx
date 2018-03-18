import * as api from "./api.jsx"
import {Comparator} from "react-bootstrap-table2-filter";
import {actions as toastrActions} from 'react-redux-toastr'
import {initialState} from './initialState.jsx'

export const setSelectedRow = (rowIndex, itemId) => {
    return {
        type: 'SET_SELECTED_ROW',
        rowSelected: {
            rowIndex: rowIndex,
            itemId: itemId
        }
    }
};

export const handleTableChange = (type, page, sizePerPage, filters) => {
    return (dispatch, getState) => {
        const currentIndex = (page - 1) * sizePerPage;
        const result = getState().tableReducer.data.filter((row) => {
            let valid = true;
            for (const dataField in filters) {
                const {filterVal, filterType, comparator} = filters[dataField];
                if (filterType === 'TEXT') {
                    if (comparator === Comparator.LIKE) {
                        valid = row[dataField].toString().indexOf(filterVal) > -1;
                    } else {
                        valid = row[dataField] === filterVal;
                    }
                } else if (filterType === 'SELECT') {
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
        dispatch({
            type: 'HANDLE_TABLE_CHANGE',
            typeChange: type,
            page,
            viewData: result.slice(currentIndex, currentIndex + sizePerPage),
            totalSize: result.length,
            sizePerPage
        });
    }
};

export const initData = () => {
    return (dispatch, getState) => {
        api.initData()
            .then((response) => {
                const data = response.data.map(o => {
                    o.pzn = o.pzn != null ? o.pzn.pzn : null;
                    o.rgn = o.rgn != null ? o.rgn.rgn : null;
                    o.tnp = o.tnp != null ? o.tnp.tnp : null;
                    o.uer = o.uer != null ? o.uer.uer : null;
                    o.dt_izm = o.dt_izm != null ? (new Date(o.dt_izm)).toLocaleDateString() : null;
                    o.date_in = o.date_in != null ? (new Date(o.date_in)).toLocaleDateString() : null;
                    o.date_ch = o.date_ch != null ? (new Date(o.date_ch)).toLocaleDateString() : null;
                    return o;
                });
                const {page, sizePerPage} = getState().tableReducer;
                const currentIndex = (page - 1) * sizePerPage;
                const viewData = data.slice(currentIndex, currentIndex + sizePerPage);
                api.initAdditional()
                    .then((response) => dispatch({
                        type: 'INIT_ALL_DATA_SUCCESS',
                        data: data,
                        additionalData: {
                            'pzn': response.data.pzn.reduce((obj, item) => {
                                obj[item['pzn']] = item['name'];
                                return obj;
                            }, {}),
                            'uer': response.data.uer.reduce((obj, item) => {
                                obj[item['uer']] = item['uername'];
                                return obj;
                            }, {}),
                            'tnp': response.data.tnp.reduce((obj, item) => {
                                obj[item['tnp']] = item['fullname'];
                                return obj;
                            }, {}),
                            'rgn': response.data.reg.reduce((obj, item) => {
                                obj[item['rgn']] = item['name'];
                                return obj;
                            }, {})
                        },
                        viewData: viewData
                    }))
                    .catch((error) => dispatch(showMeToast('error', 'Произошла ошибка', error)));
            })
            .catch((error) => dispatch(showMeToast('error', 'Произошла ошибка', error)));
    }
};

export const deleteItem = () => {
    return (dispatch, getState) => {
        const id = getState().tableReducer.rowSelected.itemId;
        api.deleteItem(id)
            .then(() => {
                dispatch({
                    type: 'DELETE_ITEM_SUCCESS',
                });
                dispatch(initData());
            })
            .catch((error) => dispatch(showMeToast('error', 'Произошла ошибка', error)));
    }
};

export const changeItem = () => {
    return (dispatch, getState) => {
        const id = getState().tableReducer.rowSelected.itemId;
        const index = getState().tableReducer.rowSelected.rowIndex;
        const data = getState().tableReducer.data.find(x => x.id === id);
        const row = getState().tableReducer.columnConfigs.map((item) => {
            item['value'] = data[item.dataField];
            return item;
        });
        dispatch({
            type: 'OPEN_ITEM_MODAL_EDITOR',
            modalTypeCreator: false,
            row,
            rowSelected: {
                rowIndex: index,
                itemId: id
            }
        });
    }
};

export const createItem = () => {
    return (dispatch, getState) => {
        const row = getState().tableReducer.columnConfigs.map((item) => {
            item['value'] = '';
            return item;
        });
        dispatch({
            type: 'OPEN_ITEM_MODAL_EDITOR',
            modalTypeCreator: true,
            row,
            rowSelected: {
                rowIndex: null,
                itemId: null
            }
        });
    }
};

export const closeModal = () => {
    return {
        type: 'CLOSE_ITEM_MODAL_EDITOR',
    }
};

export const chengeInputForm = (fieldName, fieldvalue) => {
    return (dispatch, getState) => {
        const column = getState().tableReducer.columnConfigs.map(item => {
            item.dataField === fieldName ? item.value = fieldvalue : null;
            return item;
        });
        dispatch({
            type: 'CHANGE_ROW_FIELD',
            column: column
        });
    }
};

export const validateUniqueBic = (fieldvalue) => {
    return (dispatch, getState) => {
        if(fieldvalue !== '') {
            const idField = getState().tableReducer.columnConfigs.find(x => x.dataField === 'id');
            let row = null;
            if (idField && idField.value !== "") {
                row = getState().tableReducer.data.find(x => x.id === idField.value);
            }
            if (getState().tableReducer.modalTypeCreator || (row && row.newnum !== fieldvalue)) {
                api.findByNewnum(fieldvalue)
                    .then((response) => {
                        dispatch({
                            type: 'FIND_NEWNUM_SUCCESS',
                        });
                        if ("" !== response.data) {
                            const column = getState().tableReducer.columnConfigs.map(item => {
                                if (item.dataField === "newnum") {
                                    item.notUnique = true;
                                    item.value = fieldvalue;
                                }
                                return item;
                            });
                            dispatch({
                                type: 'NEWNUM_ALREADY_EXIST',
                                column: column
                            });
                        } else {
                            const column = getState().tableReducer.columnConfigs.map(item => {
                                if (item.dataField === "newnum") {
                                    item.notUnique = false;
                                    item.value = fieldvalue;
                                }
                                return item;
                            });
                            dispatch({
                                type: 'NEWNUM_NOT_EXIST',
                                column: column
                            });
                        }
                    })
                    .catch((error) => dispatch(showMeToast('error', 'Произошла ошибка', error)));
            } else {
                const column = getState().tableReducer.columnConfigs.map(item => {
                    if (item.dataField === "newnum") {
                        item.notUnique = false;
                        item.value = fieldvalue;
                    }
                    return item;
                });
                dispatch({
                    type: 'NEWNUM_NOT_CHANGED',
                    column: column
                });
            }
        } else {
            const column = getState().tableReducer.columnConfigs.map(item => {
                if (item.dataField === "newnum") {
                    item.value = fieldvalue;
                }
                return item;
            });
            dispatch({
                type: 'NEWNUM_IS_EMPTY',
                column: column
            });
        }
    }
};

export const showMeToast = (type, title, message) => {
    return toastrActions.add({id: 'bictoast', type: type, title: title, message: message});
}

export const submitEditorForm = () => {
    return (dispatch, getState) => {
        const type = getState().tableReducer.modalTypeCreator;
        const validateResult = getState().tableReducer.columnConfigs.every(item => !((item.required && (!item.value || item.value === '')) || item.notUnique));
        if (validateResult) {
            const data = getState().tableReducer.columnConfigs.reduce((obj, item) => {
                obj[item['dataField']] = item['value'];
                return obj;
            }, {});
            if (type) {
                api.addItem(data)
                    .then(() => {
                        dispatch({
                            type: 'CREATE_NEW_FIELD_SUCCESS',
                        });
                        dispatch(showMeToast('success', 'Успех!', 'Добавление поля прошло успешно.'));
                        dispatch(closeModal());
                        dispatch(initData());
                    })
                    .catch((error) => dispatch(showMeToast('error', 'Произошла ошибка', error)));
            } else {
                const id = getState().tableReducer.rowSelected.itemId;
                api.updateItem(id, data)
                    .then(() => {
                        dispatch({
                            type: 'UPDATE_FIELD_SUCCESS',
                        });
                        dispatch(showMeToast('success', 'Успех!', 'Обновление поля прошло успешно.'));
                        dispatch(closeModal());
                        dispatch(initData());
                    })
                    .catch((error) => dispatch(showMeToast('error', 'Произошла ошибка', error)));
            }
        } else {
            dispatch(showMeToast('error', 'Форма не прошла валидацию', 'Пожалуйста проверьте все поля ещё раз'));
        }
    }
};

