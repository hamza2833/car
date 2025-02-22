import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);


// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './reducers';
// import store from './store';



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//       <Provider store={store}>
//           <App />
//       </Provider>
//   );
  
  // import { createStore, applyMiddleware, compose } from 'redux';
  // import thunk from 'redux-thunk';
  // import rootReducer, { RootState } from './reducers';
  
  // // Proper typing for the Redux store
  // const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  // const store = createStore(
  //   rootReducer,
  //   composeEnhancers(applyMiddleware(thunk))
  // );
  
  // export type AppDispatch = typeof store.dispatch;
  // export default store;
  