import * as api from "./api.jsx"
import {Comparator} from "react-bootstrap-table2-filter";

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
                } else if(filterType === 'SELECT') {
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
                    o.pzn = o.pzn != null ? o.pzn.pzn : "";
                    o.rgn = o.rgn != null ? o.rgn.rgn : "";
                    o.tnp = o.tnp != null ? o.tnp.tnp : "";
                    o.uer = o.uer != null ? o.uer.uer : "";
                    o.dt_izm = o.dt_izm != null ? (new Date(o.dt_izm)).toLocaleDateString() : "";
                    o.date_in = o.date_in != null ? (new Date(o.date_in)).toLocaleDateString() : "";
                    o.date_ch = o.date_ch != null ? (new Date(o.date_ch)).toLocaleDateString() : "";
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
                            'pzn': response.data.pzn.reduce((obj, item) => {obj[item['pzn']] = item['name']; return obj;}, {}),
                            'uer': response.data.uer.reduce((obj, item) => {obj[item['uer']] = item['uername']; return obj;}, {}),
                            'tnp': response.data.tnp.reduce((obj, item) => {obj[item['tnp']] = item['fullname']; return obj;}, {}),
                            'rgn': response.data.reg.reduce((obj, item) => {obj[item['rgn']] = item['name']; return obj;}, {})
                        },
                        viewData: viewData
                    }))
                    .catch((error) => dispatch({
                        type: 'INIT_ADDITIONAL_DATA_FAILURE',
                        error: error
                    }));
            })
            .catch((error) => dispatch({
                type: 'INIT_DATA_FAILURE',
                error: error
            }));
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
            .catch((error) => dispatch({
                type: 'DELETE_ITEM_FAILURE',
                error: error
            }));
    }
};

export const changeItem = () => {
    return (dispatch, getState) => {
        const id = getState().tableReducer.rowSelected.itemId;
        dispatch({
            type: 'OPEN_ITEM_MODAL_EDITOR',
            modalType: 'EDITOR'
        });
    }
};

export const createItem = () => {
    return (dispatch) => {
        dispatch({
            type: 'OPEN_ITEM_MODAL_EDITOR',
            modalType: 'CREATOR'
        });
    }
};

export const closeModal = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLOSE_ITEM_MODAL_EDITOR',
        });
    }
};