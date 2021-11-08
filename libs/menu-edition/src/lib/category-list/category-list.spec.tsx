import { prettyDOM, render } from '@testing-library/react';
import * as redux from 'react-redux';
import axios from 'axios';
import CategoryList from './category-list';

describe('CategoryList', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  })
  it('should render successfully', () => {
    axios.get = jest.fn().mockResolvedValue({test: 1});
    useSelectorMock.mockReturnValue(() => Promise.resolve({token: JSON.stringify("test")}));
    const { baseElement } = render(<CategoryList storeId={'1'} />);
    console.log(prettyDOM(baseElement))
    expect(baseElement).toBeTruthy();
  });
});
