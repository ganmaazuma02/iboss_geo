import React, { Component } from 'react';
import './App.css';
import AppLayout from './components/layouts/AppLayout'

import store from './store'
import { Provider } from 'react-redux'

import { loadUser } from './actions/authActions'



class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppLayout></AppLayout>
        </div>
      </Provider>

    );
  }

}

export default App;
