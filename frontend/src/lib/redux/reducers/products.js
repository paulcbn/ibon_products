const initialState = {
  pageCount: 0,
  pageSize: 20,
  count: 0,
  currentPage: 1,
  next: null,
  previous: null,
  results: [],
  search: '',
  ordering: '',


  pageLoading: false,
  pageError: null,


  deleteLoading: false,
  deleteError: null,
  deleteDone: false,


  deleteNecessaryProductLoading: false,
  deleteNecessaryProductError: null,
  deleteNecessaryProductDone: false,


  deleteNecessaryRawMaterialLoading: false,
  deleteNecessaryRawMaterialError: null,
  deleteNecessaryRawMaterialDone: false,


  productLoading: false,
  productError: null,
  product: null,
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

    case 'CHANGE_SEARCH':
      return {
        ...state,
        search: action.data,
      };


    case 'DELETE_PRODUCT_LOADING':
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
        deleteDone: false,
      };
    case 'DELETE_PRODUCT_ERROR':
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.data,
        deleteDone: null,
      };
    case 'DELETE_PRODUCT_LOADED':
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        deleteDone: action.data,
      };

    case 'DELETE_NECESSARY_PRODUCT_LOADING':
      return {
        ...state,
        deleteNecessaryProductLoading: true,
        deleteNecessaryProductError: null,
        deleteNecessaryProductDone: false,
      };
    case 'DELETE_NECESSARY_PRODUCT_ERROR':
      return {
        ...state,
        deleteNecessaryProductLoading: false,
        deleteNecessaryProductError: action.data,
        deleteNecessaryProductDone: null,
      };
    case 'DELETE_NECESSARY_PRODUCT_LOADED':
      return {
        ...state,
        deleteNecessaryProductLoading: false,
        deleteNecessaryProductError: null,
        deleteNecessaryProductDone: action.data,
      };


    case 'DELETE_NECESSARY_RAW_MATERIAL_LOADING':
      return {
        ...state,
        deleteNecessaryRawMaterialLoading: true,
        deleteNecessaryRawMaterialError: null,
        deleteNecessaryRawMaterialDone: false,
      };
    case 'DELETE_NECESSARY_RAW_MATERIAL_ERROR':
      return {
        ...state,
        deleteNecessaryRawMaterialLoading: false,
        deleteNecessaryRawMaterialError: action.data,
        deleteNecessaryRawMaterialDone: null,
      };
    case 'DELETE_NECESSARY_RAW_MATERIAL_LOADED':
      return {
        ...state,
        deleteNecessaryRawMaterialLoading: false,
        deleteNecessaryRawMaterialError: null,
        deleteNecessaryRawMaterialDone: action.data,
      };


    case 'PRODUCT_LOADED':
      return {
        ...state,
        productError: null,
        productLoading: false,
        product: action.data,
      };
    case 'PRODUCT_LOADING':
      return {
        ...state,
        productError: null,
        productLoading: true,
      };
    case 'PRODUCT_ERROR':
      return {
        ...state,
        productError: action.data,
        productLoading: false,
      };


    default:
      return state;
  }
}
