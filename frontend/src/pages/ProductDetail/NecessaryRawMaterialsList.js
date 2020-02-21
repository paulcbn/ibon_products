import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useCallback, useMemo } from 'react';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import { deepGet } from '../../lib/utils';

const NecessaryRawMaterialListItem = ({ necessaryRawMaterial, onClick, onDelete }) => {
  const { name, unit, quantity } = useMemo(() => ({
    name: deepGet(necessaryRawMaterial, 'rawMaterial.name', ''),
    unit: deepGet(necessaryRawMaterial, 'rawMaterial.unit.name', ''),
    quantity: deepGet(necessaryRawMaterial, 'quantity', 0),
  }), [ necessaryRawMaterial ]);

  const handleDelete = useCallback(() => onDelete && onDelete(necessaryRawMaterial), [ necessaryRawMaterial, onDelete ]);
  const handleClick = useCallback(() => onClick && onClick(necessaryRawMaterial), [ necessaryRawMaterial, onClick ]);

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

const NecessaryRawMaterialsList = ({ necessaryRawMaterials, onDelete, onClick }) => {
  return <Box>
    <List>
      { necessaryRawMaterials.map(prod => <NecessaryRawMaterialListItem
        key={ prod.id }
        necessaryRawMaterial={ prod }
        onClick={ onClick }
        onDelete={ onDelete }
      />) }
    </List>
  </Box>;
};

export default NecessaryRawMaterialsList;