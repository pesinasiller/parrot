import { render } from '@testing-library/react';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './app';
import reducer from './reducers/';

const store = createStore(reducer);

describe('App', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    axios.get = jest.fn().mockResolvedValue({test: 1});
    useSelectorMock.mockReturnValue(() => Promise.resolve({token: "test", authenticated: true }));
  })
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display login form', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText('Username')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });
});
