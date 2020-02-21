import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useCallback, useMemo } from 'react';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import { deepGet } from '../../lib/utils';

const NecessaryProductListItem = ({ necessaryProduct, onClick, onDelete }) => {
  const { name, unit, quantity } = useMemo(() => ({
    name: deepGet(necessaryProduct, 'product.name', ''),
    unit: deepGet(necessaryProduct, 'product.unit.name', ''),
    quantity: deepGet(necessaryProduct, 'quantity', 0),
  }), [ necessaryProduct ]);

  const handleDelete = useCallback(() => onDelete && onDelete(necessaryProduct), [ necessaryProduct, onDelete ]);
  const handleClick = useCallback(() => onClick && onClick(necessaryProduct), [ necessaryProduct, onClick ]);

  return <ListItem button={ true } onClick={ handleClick }>
    <ListItemText
      primary={ name }
      secondary={ `${ quantity } ${ unit }` }
    />
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete" onClick={ handleDelete }>
        <DeleteIcon/>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>;
};

const NecessaryProductsList = ({ necessaryProducts, onDelete, onClick }) => {
  return <Box>
    <List>
      { necessaryProducts.map(prod => <NecessaryProductListItem
        key={ prod.id }
        necessaryProduct={ prod }
        onClick={ onClick }
        onDelete={ onDelete }
      />) }
    </List>
  </Box>;
};

export default NecessaryProductsList;