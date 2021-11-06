import { AUTHENTICATED, UNAUTHENTICATED } from '../actions';

export default function(state={}, action: any) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true, token: action.payload };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
  }
  return state;
}
