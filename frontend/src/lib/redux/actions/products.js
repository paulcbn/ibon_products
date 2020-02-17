import API, { keysToCamel } from '../../api';
import { deepGet } from '../../utils';

export const loadFirstPage = () => async (dispatch, getState) => {
  dispatch({ type: 'CURRENT_PAGE_LOADING' });
  const pageSize = deepGet(getState(), 'products.pageSize', 10);
  const ordering = deepGet(getState(), 'products.ordering', '');
  try {
    const { status, data } = await API.get(`/api/product-management/products/?page_size=${ pageSize }&ordering=${ ordering }`);
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
  try {
    const { status, data } = await API.get(`/api/product-management/products/?page=${ +n }&page_size=${ pageSize }&ordering=${ ordering }`);
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
