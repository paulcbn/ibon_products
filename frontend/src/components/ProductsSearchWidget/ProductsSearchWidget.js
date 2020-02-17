import Box from '@material-ui/core/Box';
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { products } from '../../lib/redux/actions';
import { deepGet } from '../../lib/utils';
import { TableWidget } from '../TableWidget';

const headers = [
  {
    id: 'name',
    field: 'name',
    sortable: true,
    label: 'Nume',
  },
  {
    id: 'description',
    field: 'description',
    sortable: true,
    label: 'Descriere',
  },
  {
    id: 'unit',
    field: 'unit.name',
    label: 'Unitate',
  },
  {
    id: 'type',
    label: 'Tipuri',
    render: item => deepGet(item, 'types', []).reduce((prev, current, index) => `${ prev }${ index > 0 ? ',' : '' } ${ deepGet(current, 'name', '') }`, ''),
  },
];

const ProductsSearchWidget = ({ actions, state }) => {
  useEffect(() => {
    actions.loadFirstPage();
  }, [ actions ]);

  const defaultRowsPerPageOptions = [ 3, 5, 10, 20, 30, 40 ];
  const actualRowsPerPageOptions = useMemo(() => {
    if (defaultRowsPerPageOptions.indexOf(state.pageSize) === -1)
      return [ ...defaultRowsPerPageOptions, state.pageSize ];
    else
      return defaultRowsPerPageOptions;
  }, [ defaultRowsPerPageOptions, state ]);


  const handleSort = useCallback(({ header, direction }) => {
    console.log({ header, direction });

    if (!header) {
      actions.changeOrdering('');
      return;
    }

    const prefix = direction === 'desc' ? '-' : '';
    const field = deepGet(header, 'field');
    if (field === undefined)
      return;
    actions.changeOrdering(`${ prefix }${ field }`);
  }, [ actions ]);

  return <Box>
    <TableWidget
      headers={ headers }
      data={ state.results }
      title={ 'Produse' }
      count={ state.count }
      onChangePage={ (_, page) => actions.loadNthPage(page + 1) }
      onChangeRowsPerPage={ (event) => actions.changePageSize(event.target.value) }
      page={ state.currentPage - 1 }
      rowsPerPage={ state.pageSize }
      rowsPerPageOptions={ actualRowsPerPageOptions }
      onSort={ handleSort }
      loading={ state.loading }
    />
  </Box>;
};


const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadFirstPage: () => dispatch(products.loadFirstPage()),
    loadNextPage: () => dispatch(products.loadNextPage()),
    loadPreviousPage: () => dispatch(products.loadPreviousPage()),
    loadNthPage: (n) => dispatch(products.loadNthPage(n)),
    changePageSize: (n) => dispatch(products.changePageSize(n)),
    changeOrdering: (ordering) => dispatch(products.changeOrdering(ordering)),
  },
});

const mapStateToProps = (state) => ({
  state: {
    pageCount: state.products.pageCount,
    count: state.products.count,
    pageSize: state.products.pageSize,
    currentPage: state.products.currentPage,
    results: state.products.results,
    loading: state.products.pageLoading,
    error: state.products.pageError,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSearchWidget);