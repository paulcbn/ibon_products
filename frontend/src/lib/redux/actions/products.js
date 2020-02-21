import API, { keysToCamel } from '../../api';
import { deepGet } from '../../utils';

export const loadFirstPage = () => async (dispatch, getState) => {
  dispatch({ type: 'CURRENT_PAGE_LOADING' });
  const pageSize = deepGet(getState(), 'products.pageSize', 10);
  const ordering = deepGet(getState(), 'products.ordering', '');
  const search = deepGet(getState(), 'products.search', '');
  try {
    const { status, data } = await API.get(`/api/product-management/products/?page_size=${ pageSize }&ordering=${ ordering }&search=${ search }`);
    if (status >= 200 && status < 300)
      dispatch({ type: 'CURRENT_PAGE_LOADED', data: keysToCamel(data) });
    else
      dispatch({ type: 'CURRENT_PAGE_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'CURRENT_PAGE_ERROR', data: { message: 'Connection error.' } });
  }
};

export const loadNextPage = () => async (dispatch, getState) => {
  dispatch({ type: 'CURRENT_PAGE_LOADING' });
  const nextUrl = deepGet(getState(), 'products.next', null);
  if (nextUrl === null)
    dispatch('CURRENT_PAGE_ERROR', { message: 'Previous page does not exist.' });
  else
    try {
      const { status, data } = await API.get(nextUrl);
      if (status >= 200 && status < 300)
        dispatch({ type: 'CURRENT_PAGE_LOADED', data: keysToCamel(data) });
      else
        dispatch({ type: 'CURRENT_PAGE_ERROR', data: keysToCamel(data) });
    } catch (e) {
      dispatch({ type: 'CURRENT_PAGE_ERROR', data: { message: 'Connection error.' } });
    }
};

export const loadPreviousPage = () => async (dispatch, getState) => {
  dispatch({ type: 'CURRENT_PAGE_LOADING' });
  const previousUrl = deepGet(getState(), 'products.previous', null);
  if (previousUrl === null)
    dispatch('CURRENT_PAGE_ERROR', { message: 'Previous page does not exist.' });
  else
    try {
      const { status, data } = await API.get(previousUrl);
      if (status >= 200 && status < 300)
        dispatch({ type: 'CURRENT_PAGE_LOADED', data: keysToCamel(data) });
      else
        dispatch({ type: 'CURRENT_PAGE_ERROR', data: keysToCamel(data) });
    } catch (e) {
      dispatch({ type: 'CURRENT_PAGE_ERROR', data: { message: 'Connection error.' } });
    }
};

export const loadNthPage = (n) => async (dispatch, getState) => {
  dispatch({ type: 'CURRENT_PAGE_LOADING' });
  const pageSize = deepGet(getState(), 'products.pageSize', 20);
  const ordering = deepGet(getState(), 'products.ordering', '');
  const search = deepGet(getState(), 'products.search', '');
  try {
    const { status, data } = await API.get(`/api/product-management/products/?page=${ +n }&page_size=${ pageSize }&ordering=${ ordering }&search=${ search }`);
    if (status >= 200 && status < 300)
      dispatch({ type: 'CURRENT_PAGE_LOADED', data: keysToCamel(data) });
    else
      dispatch({ type: 'CURRENT_PAGE_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'CURRENT_PAGE_ERROR', data: { message: 'Connection error.' } });
  }
};

export const loadCurrentPage = () => async (dispatch, getState) => {
  dispatch({ type: 'CURRENT_PAGE_LOADING' });
  const ordering = deepGet(getState(), 'products.ordering', '');
  const pageSize = deepGet(getState(), 'products.pageSize', 20);
  const search = deepGet(getState(), 'products.search', '');
  const page = deepGet(getState(), 'products.currentPage', 1);
  try {
    const { status, data } = await API.get(`/api/product-management/products/?page=${ +page }&page_size=${ pageSize }&ordering=${ ordering }&search=${ search }`);
    if (status >= 200 && status < 300)
      dispatch({ type: 'CURRENT_PAGE_LOADED', data: keysToCamel(data) });
    else
      dispatch({ type: 'CURRENT_PAGE_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'CURRENT_PAGE_ERROR', data: { message: 'Connection error.' } });
  }
};

export const changePageSize = (n) => async (dispatch, getState) => {
  dispatch({ type: 'CHANGE_PAGE_SIZE', data: n });
  await dispatch(loadFirstPage());
};

export const changeOrdering = (ordering) => async (dispatch, getState) => {
  dispatch({ type: 'CHANGE_ORDERING', data: ordering });
  await dispatch(loadFirstPage());
};

export const changeSearchString = (searchString) => async (dispatch, getState) => {
  dispatch({ type: 'CHANGE_SEARCH', data: searchString });
  await dispatch(loadFirstPage());
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_PRODUCT_LOADING' });
  try {
    const { status, data } = await API.delete(`/api/product-management/products/${ id }/`);
    if (status >= 200 && status < 300) {
      dispatch({ type: 'DELETE_PRODUCT_LOADED', data: keysToCamel(data) });
      await dispatch(loadCurrentPage());
    } else
      dispatch({ type: 'DELETE_PRODUCT_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'DELETE_PRODUCT_ERROR', data: { message: 'Connection error.' } });
  }
};

export const loadProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: 'PRODUCT_LOADING' });
  try {
    const { status, data } = await API.get(`/api/product-management/products/${ id }/`);
    if (status >= 200 && status < 300)
      dispatch({ type: 'PRODUCT_LOADED', data: keysToCamel(data) });
    else
      dispatch({ type: 'PRODUCT_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'PRODUCT_ERROR', data: { message: 'Connection error.' } });
  }
};

export const deleteNecessaryProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_NECESSARY_PRODUCT_LOADING' });
  try {
    const { status, data } = await API.delete(`/api/product-management/necessary-products/${ id }/`);
    if (status >= 200 && status < 300) {
      dispatch({ type: 'DELETE_NECESSARY_PRODUCT_LOADED', data: keysToCamel(data) });

      const currentProductId = deepGet(getState(), 'products.product.id');
      if (currentProductId !== undefined)
        await dispatch(loadProduct(currentProductId));
    } else
      dispatch({ type: 'DELETE_NECESSARY_PRODUCT_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'DELETE_NECESSARY_PRODUCT_ERROR', data: { message: 'Connection error.' } });
  }
};

export const deleteNecessaryRawMaterial = (id) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_NECESSARY_RAW_MATERIAL_LOADING' });
  try {
    const { status, data } = await API.delete(`/api/product-management/necessary-raw-materials/${ id }/`);
    if (status >= 200 && status < 300) {
      dispatch({ type: 'DELETE_NECESSARY_RAW_MATERIAL_LOADED', data: keysToCamel(data) });

      const currentProductId = deepGet(getState(), 'products.product.id');
      if (currentProductId !== undefined)
        await dispatch(loadProduct(currentProductId));
    } else
      dispatch({ type: 'DELETE_NECESSARY_RAW_MATERIAL_ERROR', data: keysToCamel(data) });
  } catch (e) {
    dispatch({ type: 'DELETE_NECESSARY_RAW_MATERIAL_ERROR', data: { message: 'Connection error.' } });
  }
};
