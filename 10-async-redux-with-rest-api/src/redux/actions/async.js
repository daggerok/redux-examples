export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_RESPONSE = 'FETCH_TODOS_RESPONSE';

export const fetchTodoList = () => {
  return dispatch => {
    dispatch({
      type: FETCH_TODOS,
      fetchingAt: Date.now(),
    });
    // // CORS Webflux Filter must be configured or use FQDN API:
    fetch('https://daggerok.github.io/redux-examples/api/all.json')
    // fetch('http://localhost:8080/all', {mode: 'cors'}) // see api project: CorsWebfluxFilter.java
      .then(resp => resp.text())
      .then(text => !!text ? JSON.parse(text) : null)
      .then(obj => dispatch({
        type: FETCH_TODOS_RESPONSE,
        payload: obj,
        fetchedAt: Date.now(),
      }));
  }
};
