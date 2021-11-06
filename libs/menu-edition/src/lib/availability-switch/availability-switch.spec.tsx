import { prettyDOM, render } from '@testing-library/react';
import * as redux from 'react-redux';
import AvailabilitySwitch from './availability-switch';

describe('AvailabilitySwitch', () => {
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
    useSelectorMock.mockReturnValue(() => Promise.resolve({token: JSON.stringify("test")}))
    const { baseElement } = render(<AvailabilitySwitch availability={true} productId={'1'} />);
    console.log(prettyDOM(baseElement))
    expect(baseElement).toBeTruthy();
  });
});
