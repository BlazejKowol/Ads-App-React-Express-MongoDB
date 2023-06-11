//selectors
export const getAds = ({ads}) => ads.data;
export const getAdById = ({ads}, id) => ads.find(ad => ad._id === id);

// actions
const createActionName = actionName => `app/ads/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });
export const editAd = payload => ({ payload, type: EDIT_AD });
export const removeAd = payload => ({ payload, type: REMOVE_AD });

/* INITIAL STATE */
const initialState = {
  data: [],
  requests: {},
};

// action creators
const adsRedux = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS: 
      return { ...statePart, data: [...action.payload] };
    case ADD_AD: 
      return { ...statePart, data: [...statePart.data, action.payload] }
    case EDIT_AD: 
      return { ...statePart, data: statePart.map(ad => (ad.id === action.payload.id ? {...ad, ...action.payload} : ad)) }
    case REMOVE_AD: 
      return { ...statePart, data: statePart.filter(ad => (ad.id !== action.payload.id)) }
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  };
};

// thunk


export default adsRedux;