import { Dialog, DialogContent, DialogTitle, Input, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import React, { useMemo, useState } from 'react';
import { ProductsSearchWidget } from '../../components/ProductsSearchWidget';
import SelectIcon from '@material-ui/icons/Done';
import { deepGet } from '../../lib/utils';
import { useCreateNecessaryProductModalStyle } from './styles.js';


const CreateNecessaryProductModal = ({ onCreate, isOpen, onClose }) => {
  const classes = useCreateNecessaryProductModalStyle();

  const [ selectedProduct, setSelectedProduct ] = useState();

  const { isSelected, name, unit } = useMemo(() => ({
    isSelected: !!selectedProduct,
    name: deepGet(selectedProduct, 'name', '-'),
    unit: deepGet(selectedProduct, 'unit.name', '-'),
  }), [ selectedProduct ]);

  const tableActions = useMemo(() => [
    {
      id: 'select',
      Icon: SelectIcon,
      onClick: setSelectedProduct,
    } ], [ setSelectedProduct ]);

  return <Dialog
    fullWidth={ true }
    maxWidth='lg'
    open={ isOpen }
    onClose={ onClose }
  >
    <DialogTitle>
      <Typography component="span" variant='h4'>Adauga produs necesar</Typography>
    </DialogTitle>
    <DialogContent>
      <ProductsSearchWidget tableActions={ tableActions }/>
      <Box className={ classes.fieldBox }>
        <Typography variant={ 'h5' }>Produs selectat:&nbsp;</Typography>
        {
          isSelected ?
            <Typography
              variant={ 'h5' }
              className={ classes.selectedProductTypography }>
              { name } ({ unit })
            </Typography>
            :
            <Typography variant={ 'h5' } color={ 'textSecondary' }>
              Nu ati selectat niciun produs
            </Typography>
        }
      </Box>
      <Divider/>
      <Input type={"number"}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={ onClose } variant={ 'outlined' }>Anuleaza</Button>
      <Button variant={ 'contained' } color={ 'primary' }>Confirma</Button>
    </DialogActions>
  </Dialog>;
};

export default CreateNecessaryProductModal;