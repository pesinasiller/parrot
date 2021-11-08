import { prettyDOM, render } from '@testing-library/react';
import * as redux from 'react-redux';
import MenuEdition from './menu-edition';
import axios from 'axios';
import { createStore } from 'redux';

const store = createStore(()=>{return});

jest.mock('axios');

const mockData = {
  result: {
    uuid: "c85c8719-8c14-478d-bab0-ffd55a0632e0",
    email: "android-challenge@parrotsoftware.io",
    stores: [
        {
            uuid: "e7f46731-1654-4ba3-be83-408ac5255838",
            name: "Store Android Challenge",
            availabilityState: "OPEN",
            providers: [],
            config: {
                "brandColor": "#FF0000"
            }
        }
    ],
    username: "android-challenge@parrotsoftware.io"
  }
}
describe('MenuEdition', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  })

  it('should render successfully', async () => {
    axios.get = jest.fn().mockResolvedValue(mockData);
    useSelectorMock.mockReturnValue(() => Promise.resolve({token: JSON.stringify("test")}));
    const { baseElement } = render(<MenuEdition />);
    console.log(prettyDOM(baseElement))
    expect(baseElement).toBeTruthy();
  });
});
