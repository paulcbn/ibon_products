import { TableBody } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import React, { useMemo } from 'react';
import { deepGet } from '../../lib/utils';
import { StyledTableCell, StyledTableRow } from './StyledComponents';

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


const TableDataRow = ({ item, headers, actions }) => {
  const hasActions = useMemo(() => +deepGet(actions, 'length', 0) > 0, [ actions ]);

  return <StyledTableRow>
    { (headers || []).map(header => <TableDataCell key={ header.id } item={ item } header={ header }/>) }
    { hasActions && <StyledTableCell align={ 'right' }>
      { actions.map(({ id, Icon, onClick }) => <IconButton key={ id } size={ 'small' } onClick={ () => onClick(item) }>
        <Icon/>
      </IconButton>) }
    </StyledTableCell> }
  </StyledTableRow>;
};

const TableData = ({ data, headers, actions }) => {
  return <TableBody>
    { (data || []).map(item => <TableDataRow
      key={ item.id }
      item={ item }
      headers={ headers }
      actions={ actions }
    />) }
  </TableBody>;
};

export default TableData;
