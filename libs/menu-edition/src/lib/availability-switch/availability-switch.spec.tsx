import { prettyDOM, render, screen } from '@testing-library/react';
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
  it('should be unchecked if product is unavailable', () => {
    useSelectorMock.mockReturnValue(() => Promise.resolve({token: JSON.stringify("test")}))
    const { baseElement } = render(<AvailabilitySwitch availability={false} productId={'1'} />);
    const checkboxEl = screen.getByLabelText('Available') as HTMLInputElement
    expect(checkboxEl.checked).toEqual(false);
  });

  it('should be checked if product is available', () => {
    useSelectorMock.mockReturnValue(() => Promise.resolve({token: JSON.stringify("test")}))
    const { baseElement } = render(<AvailabilitySwitch availability={true} productId={'1'} />);
    const checkboxEl = screen.getByLabelText('Available') as HTMLInputElement
    expect(checkboxEl.checked).toEqual(true);
  });

});
