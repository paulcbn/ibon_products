import { TableBody } from '@material-ui/core';
import React, { useMemo } from 'react';
import { deepGet } from '../../lib/utils';
import { StyledTableCell, StyledTableRow } from './StyledComponents';
import { useTableDataStyle } from './styles';

const TableDataCell = ({ item, header }) => {
  const { numeric, field, render } = useMemo(() => ({
    numeric: deepGet(header, 'numeric', false),
    field: deepGet(header, 'field'),
    render: deepGet(header, 'render'),
  }), [ header ]);

  const value = useMemo(() => {
    if (render !== undefined)
      return render(item);

    return deepGet(item, field);
  }, [ item, field, render ]);


  return <StyledTableCell
    align={ numeric ? 'right' : 'left' }
  >
    { value }
  </StyledTableCell>;
};

const TableDataRow = ({ item, headers }) => {
  return <StyledTableRow>
    { (headers || []).map(header => <TableDataCell key={ header.id } item={ item } header={ header }/>) }
  </StyledTableRow>;
};

const TableData = ({ data, headers }) => {
  const classes = useTableDataStyle();
  return <TableBody>
    { (data || []).map(item => <TableDataRow
      key={ item.id }
      item={ item }
      headers={ headers }
    />) }
  </TableBody>;
};

export default TableData;
