import { prettyDOM, screen, render } from '@testing-library/react';
import * as redux from 'react-redux';
import ProductDescription from './product-description';

const productMock = {
  uuid: "9d1e3446-f536-4842-8adf-8a06e96ab0a9",
  name: "Combo Amigos - COPIA",
  description: "2 Subs de 15 cm (elige entre Jamón de Pavo, Sub de Pollo o Atún) + 2 bebidas embotelladas de 600 ml + 2 Bolsas de papas Sabritas o 2 galletas.",
  imageUrl: "https://d1ralsognjng37.cloudfront.net/b49451f6-4f81-404e-bb97-2e486100b2b8.jpeg",
  legacyId: "1",
  price: "189.00",
  alcoholCount: 0,
  soldAlone: true,
  availability: "AVAILABLE",
  providerAvailability: null,
  category: {
      uuid: "bbc22898-7bd3-4512-8b09-64c4e19d7a9b",
      name: "Combos Especiales",
      sortPosition: 99
  }
};

describe('ProductDescription', () => {
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
    const { baseElement } = render(<ProductDescription product={productMock} />);
    console.log(prettyDOM(baseElement))
    expect(baseElement).toBeTruthy();

    const nameDiv = screen.queryAllByText(productMock.name);
    expect(nameDiv).toHaveLength(1)
  });
});


