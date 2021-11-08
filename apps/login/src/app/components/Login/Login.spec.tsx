import { render, prettyDOM } from '@testing-library/react';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './index';
import reducer from '../../reducers';

const store = createStore(reducer);

describe('Login', () => {
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
          <Login setToken={()=>{return}} />
        </BrowserRouter>
      </Provider>
    );
    console.log(prettyDOM(baseElement))
    expect(baseElement).toBeTruthy();
  });
});
