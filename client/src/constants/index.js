export const REACT_APP_API_ROOT = process.env.REACT_APP_API_ROOT 
export const WS_ROOT=`ws://${REACT_APP_API_ROOT}/cable`
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

