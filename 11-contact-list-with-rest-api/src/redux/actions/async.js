export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_RESPONSE = 'FETCH_DATA_RESPONSE';

export const fetchInitialData = () => {
  return dispatch => {
    dispatch({
      type: FETCH_DATA_REQUEST,
      fetchingAt: Date.now(),
    });
    // CORS Filter must be configured or use FQDN API (see api: CorsWebfluxFilter.java)
    fetch('https://daggerok.github.io/redux-examples/api/contactList.json', {mode: 'cors'})
      .then(resp => resp.text())
      .then(text => !!text ? JSON.parse(text) : null)
      .then(obj => dispatch({
        type: FETCH_DATA_RESPONSE,
        payload: obj,
        fetchedAt: Date.now(),
      }));
  }
};
