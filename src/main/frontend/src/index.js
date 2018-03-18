import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './reducers.jsx';
import {Provider} from 'react-redux';
import Table from './Table/index.jsx'
import ReduxToastr from 'react-redux-toastr'


ReactDOM.render(
    <Provider store={store}>
        <div>
            <Table/>
            <ReduxToastr
                timeOut={3000}
                newestOnTop={false}
                showCloseButton={true}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"/>
        </div>
    </Provider>
    , document.getElementById('app'));