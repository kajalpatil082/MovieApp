import axios from 'axios';
import {API_KEY, API_URL} from '../../utills/constants';
// Define action types
export const GET_MOVIES = 'FETCH_MOVIES';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

const PARAMS = 'page=1';
const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;

const getMovies = () => {
  try {
    return async dispatch => {
      const res = await axios.get(`${BASE_URL}`);
      if (res.data) {
        dispatch({
          type: 'GET_MOVIES',
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    // Add custom logic to handle errors
  }
};
export {getMovies};
