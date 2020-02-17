import TableHead from '@material-ui/core/TableHead';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { deepGet } from '../../lib/utils';
import { StyledTableCell, StyledTableRow, StyledTableSortLabel } from './StyledComponents';
import { useHeaderCellStyle, useHeaderStyle } from './styles';

const TableWidgetHeaderCell = ({ header, sortedHeaderId, sortDirection, onSort }) => {
  const classes = useHeaderCellStyle();

  const { numeric, label, isSorted, sortable } = useMemo(() => ({
    numeric: deepGet(header, 'numeric', false),
    label: deepGet(header, 'label', ''),
    sortable: deepGet(header, 'sortable', false),
    isSorted: sortedHeaderId === deepGet(header, 'id'),
  }), [ header, sortedHeaderId ]);

  const handleSort = useCallback(() => {
    onSort && onSort();
  }, [ onSort ]);

  if (!sortable)
    return (
      <StyledTableCell
        align={ numeric ? 'right' : 'left' }
      >
        { label }
      </StyledTableCell>
    );

  return (
    <StyledTableCell
      align={ numeric ? 'right' : 'left' }
    >
      <StyledTableSortLabel
        active={ isSorted }
        direction={ sortDirection }
        onClick={ handleSort }
      >
        { label }
      </StyledTableSortLabel>
    </StyledTableCell>
  );
};

export const TableWidgetHeader = ({ headers, onSort }) => {
  const classes = useHeaderStyle();

  const [ sortingStatus, setSortingStatus ] = useState({ header: null, direction: 'asc' });

  const { sortedHeaderId, sortDirection } = useMemo(() => ({
    sortedHeaderId: deepGet(sortingStatus, 'header.id', null),
    sortDirection: deepGet(sortingStatus, 'direction', ''),
  }), [ sortingStatus ]);

  const handleSort = (clickedHeader) => {
    const clickedId = deepGet(clickedHeader, 'id', null);
    const oldId = deepGet(sortingStatus, 'header.id', null);
    const oldDirection = deepGet(sortingStatus, 'direction', null);
    const shouldDesc = clickedId !== null && clickedId === oldId && oldDirection === 'asc';
    const shouldReset = clickedId !== null && clickedId === oldId && oldDirection === 'desc';
    if (shouldDesc)
      setSortingStatus({ header: clickedHeader, direction: 'desc' });
    else if (shouldReset)
      setSortingStatus({ header: null, direction: 'asc' });
    else
      setSortingStatus({ header: clickedHeader, direction: 'asc' });
  };

  useEffect(() => {
    onSort && onSort(sortingStatus);
  }, [ onSort, sortingStatus ]);

  return (
    <TableHead>
      <StyledTableRow>

        { headers.map(header => <TableWidgetHeaderCell
          key={ header.id }
          header={ header }
          sortedHeaderId={ sortedHeaderId }
          sortDirection={ sortDirection }
          onSort={ () => handleSort(header) }
        />) }
      </StyledTableRow>
    </TableHead>
  );
};