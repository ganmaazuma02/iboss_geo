import React from 'react';
import './App.css';
import Header from './components/Header'
import ManagerLayout from './components/ManagerLayout'

import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
        <ManagerLayout></ManagerLayout>
      </div>
    </Provider>

  );
}

export default App;
