import Box from '@material-ui/core/Box';
import DetailIcon from '@material-ui/icons/Info';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { DeleteIcon } from '../../components/Icons';
import { withLayout } from '../../components/Layout';
import { useHistory } from 'react-router-dom';
import { ProductsSearchWidget } from '../../components/ProductsSearchWidget';
import { useModal } from '../../lib/hooks';
import { products } from '../../lib/redux/actions';
import { deepGet } from '../../lib/utils';


const ProductsMaster = ({ actions, deleteLoading, deleteError, deleteData }) => {

  const { isOpen: isDeleteConfirmationOpen, close: closeDeleteConfirmation, open: openDeleteConfirmation, data: deleteConfirmationData } = useModal();

  const history = useHistory();

  const handleTryDelete = useCallback(product => openDeleteConfirmation(product), [ openDeleteConfirmation ]);
  const handleConfirmDelete = useCallback(product => actions.deleteProduct(deepGet(product, 'id')), [ actions ]);
  const handleNavigateToDetail = useCallback(({ id }) => history.push(`/products/${ id }`), [ history ]);

  const tableActions = useMemo(() => [
    {
      id: 'detail',
      Icon: DetailIcon,
      onClick: handleNavigateToDetail,
    },
    {
      id: 'delete',
      Icon: DeleteIcon,
      onClick: handleTryDelete,
    },
  ], [ handleTryDelete, handleNavigateToDetail ]);


  return <Box>
    <ProductsSearchWidget tableActions={ tableActions }/>
    <ConfirmationModal
      isOpen={ isDeleteConfirmationOpen }
      onClose={ closeDeleteConfirmation }
      data={ deleteConfirmationData }
      onConfirm={ handleConfirmDelete }
      title={ 'Confirmare necesara' }
      text={ 'Esti sigur ca vrei sa stergi produsul? actiunea este ireversibila. Acesta va disparea din listele tuturor produselor care il necesita.' }
    />
  </Box>;
};

const mapStateToProps = state => ({
  deleteLoading: state.products.deleteLoading,
  deleteError: state.products.deleteError,
  deleteData: state.products.deleteData,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    deleteProduct: id => dispatch(products.deleteProduct(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withLayout(ProductsMaster));
