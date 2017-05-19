/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/bootstrap-3/css/bootstrap.css';

import LayoutComponent from './components/layout';
import initStore, { history } from './store';

import Centrifuge from 'centrifuge';

(function () {
    var data = document.querySelector('#centrifuge').dataset || {};
    var centrifuge = new Centrifuge({
        url: data.url,
        user: data.user,
        timestamp: data.timestamp,
        token: data.token,
    });

    centrifuge.subscribe("news", function (message) {
        console.log(message);
        const popup = `
    <div style="width: 100%; background: rgba(0, 0, 0, 0.5); padding: 0.5em; border-radius: 2px">
        ${message.data.msg}
    </div>`;
        const el = document.createElement('div');
        el.innerHTML = popup;
        debugger;
        document.querySelector('.msg_list').append(el);
        setTimeout(function () {
            el.remove();
        }, 10000);
    })

    centrifuge.connect();
})();

class Page extends Component {
  render() {
    // console.log('Rendering page');
    return (
      <MuiThemeProvider>
        <LayoutComponent />

      </MuiThemeProvider>
    );
  }
}

const mainPage = <Page />;

ReactDOM.render(
  <Provider store={initStore()}>
    <ConnectedRouter history={history}>
      <Page />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
