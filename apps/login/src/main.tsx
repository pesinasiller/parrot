import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './app/reducers/';
import App from './app/app';
import { AUTHENTICATED, UNAUTHENTICATED } from './app/actions';
import { createInterceptors } from './app/utils/interceptors';

const store = createStore(reducer);

const accessToken = localStorage.getItem('accessToken');
if(accessToken) {
  store.dispatch({ type: AUTHENTICATED, payload: accessToken });
}
else {
  store.dispatch({ type: UNAUTHENTICATED });
}

createInterceptors();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
