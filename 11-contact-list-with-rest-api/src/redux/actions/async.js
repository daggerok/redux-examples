export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_RESPONSE = 'FETCH_DATA_RESPONSE';

export const fetchInitialData = () => {
  return dispatch => {
    dispatch({
      type: FETCH_DATA_REQUEST,
      fetchingAt: Date.now(),
    });
    // // CORS Webflux Filter must be configured or use FQDN API:
    fetch('https://daggerok.github.io/redux-examples/api/all.json')
    // fetch('http://localhost:8080/all', {mode: 'cors'}) // see api project: CorsWebfluxFilter.java
      .then(resp => resp.text())
      .then(text => !!text ? JSON.parse(text) : null)
      .then(obj => dispatch({
        type: FETCH_DATA_RESPONSE,
        payload: obj,
        fetchedAt: Date.now(),
      }));
  }
};
