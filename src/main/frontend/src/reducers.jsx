import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware } from 'redux';
import { initialState } from './initialState.jsx'


const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ROW':
            return {
                ...state,
                rowSelected: action.rowSelected
            };
        case 'HANDLE_TABLE_CHANGE':
            return {
                ...state,
                page: action.page,
                viewData: action.viewData,
                totalSize: action.totalSize,
                sizePerPage: action.sizePerPage,
                rowSelected: {rowIndex: null, itemId: null}
            };
        case 'INIT_ALL_DATA_SUCCESS':
            return {
                ...state,
                data: action.data,
                additionalData: action.additionalData,
                viewData: action.viewData,
                totalSize: action.data.length,
                rowSelected: {rowIndex: null, itemId: null}
            };
        case 'CLOSE_ITEM_MODAL_EDITOR':
            return {
                ...state,
                modalIsVisible: !state.modalIsVisible
            };

        case 'OPEN_ITEM_MODAL_EDITOR':
            return {
                ...state,
                modalIsVisible: !state.modalIsVisible,
                modalType: action.modalType
            };
        case 'DELETE_ITEM_SUCCESS':
        case 'DELETE_ITEM_FAILURE':
        case 'INIT_DATA_FAILURE':
        case 'INIT_ADDITIONAL_DATA_FAILURE':
        default:
            return state
    }
};

export const reducers = combineReducers({
    tableReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));