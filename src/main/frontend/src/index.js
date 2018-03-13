import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './reducers.jsx';
import {Provider} from 'react-redux';
import Table from './Table/index.jsx'



ReactDOM.render(
    <Provider store={store}>
        <Table/>
    </Provider>
    , document.getElementById('app'));