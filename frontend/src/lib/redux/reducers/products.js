const initialState = {
  pageCount: 0,
  pageSize: 20,
  count: 0,
  currentPage: 1,
  next: null,
  previous: null,
  results: [],

  ordering: '',

  pageLoading: false,
  pageError: null,
};


export default function products(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_PAGE_LOADING':
      return {
        ...state,
        pageLoading: true,
        pageError: null,
      };
    case 'CURRENT_PAGE_ERROR':
      return {
        ...state,
        pageLoading: false,
        pageError: action.data,
      };
    case 'CURRENT_PAGE_LOADED':
      return {
        ...state,
        pageLoading: false,
        pageError: null,
        ...action.data, //this gives: count, next, previous, results
      };
    case 'CHANGE_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.data,
      };

    case 'CHANGE_ORDERING':
      return {
        ...state,
        ordering: action.data,
      };
    default:
      return state;
  }
}
