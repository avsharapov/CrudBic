import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {initialState} from './initialState.jsx'
import {reducer as toastrReducer} from 'react-redux-toastr'

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ROW':
            return {
                ...state,
                rowSelected: action.rowSelected,
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
                modalTypeCreator: action.modalTypeCreator,
                columnConfigs: action.row,
                rowSelected: action.rowSelected,
            };
        case 'NEWNUM_ALREADY_EXIST':
        case 'NEWNUM_NOT_CHANGED':
        case 'NEWNUM_NOT_EXIST':
        case 'NEWNUM_IS_EMPTY':
        case 'CHANGE_ROW_FIELD':
            return {
                ...state,
                columnConfigs: action.column
            };
        case 'FIND_NEWNUM_SUCCESS':
        case 'UPDATE_FIELD_SUCCESS':
        case 'CREATE_NEW_FIELD_SUCCESS':
        case 'DELETE_ITEM_SUCCESS':
        default:
            return state
    }
};

export const reducers = combineReducers({
    tableReducer, toastr: toastrReducer
});


const middlewares = [];
middlewares.push(thunkMiddleware);

if (process.env.NODE_ENV === `development`) {
    const {logger} = require(`redux-logger`);
    middlewares.push(logger);
}

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: 'CrudBic',
        }) : compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));