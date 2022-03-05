const initialState = {
  edit: 'EDITTEXT',
  movies: [],
};
const reducer = (state = initialState, action, text) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return {...state, movies: action.payload};
    default: {
      return state;
    }
  }
};
export default reducer;
