import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { withLayout } from '../../components/Layout';
import { useModal } from '../../lib/hooks';
import { products } from '../../lib/redux/actions';
import { deepGet } from '../../lib/utils';
import CreateNecessaryProductModal from './CreateNecessaryProductModal';
import NecessaryProductsList from './NecessaryProductsList';
import NecessaryRawMaterialsList from './NecessaryRawMaterialsList';


const ProductDetail = ({ product, productLoading, productError, actions }) => {
  const { productId } = useParams();
  const history = useHistory();
  useEffect(() => {
    actions.loadProduct(productId);
  }, [ productId, actions ]);

  const { productName, productDescription, unit, types, necessaryProducts, necessaryRawMaterials } = useMemo(() => ({
    productName: deepGet(product, 'name', ''),
    productDescription: deepGet(product, 'description', ''),
    unit: `${ deepGet(product, 'unit.type.name', '') }(${ deepGet(product, 'unit.name', '') })`,
    types: deepGet(product, 'types', []),
    necessaryRawMaterials: deepGet(product, 'necessaryRawMaterials', []),
    necessaryProducts: deepGet(product, 'necessaryProducts', []),
  }), [ product ]);

  const { isOpen: isDeleteNecessaryProductModalOpen, open: openDeleteNecessaryProductModal, close: closeDeleteNecessaryProductModal, data: deleteNecessaryProductData } = useModal();
  const { isOpen: isCreateNecessaryProductModalOpen, open: openCreateNecessaryProductModal, close: closeCreateNecessaryProductModal } = useModal();
  const { isOpen: isDeleteNecessaryRawMaterialModalOpen, open: openDeleteNecessaryRawMaterialModal, close: closeDeleteNecessaryRawMaterialModal, data: deleteNecessaryRawMaterialData } = useModal();


  const handleConfirmDeleteNecessaryProduct = useCallback((necessaryProduct) => {
    const id = deepGet(necessaryProduct, 'id');
    if (id !== undefined)
      actions.deleteNecessaryProduct(id);
  }, [ actions ]);

  const handleConfirmDeleteNecessaryRawMaterial = useCallback((necessaryMaterial) => {
    const id = deepGet(necessaryMaterial, 'id');
    if (id !== undefined)
      actions.deleteNecessaryRawMaterial(id);
  }, [ actions ]);


  const handleNavigateToProductDetail = useCallback(necessaryProduct => history.push(`/products/${ deepGet(necessaryProduct, 'product.id', 0) }`), [ history ]);
  const handleNavigateToMaterialDetail = useCallback(necessaryProduct => history.push(`/raw-materials/${ deepGet(necessaryProduct, 'material.id', 0) }`), [ history ]);

  if (productError)
    return <Box>
      <Typography variant={ 'h4' }>Error: { deepGet(productError, 'detail', '') }</Typography>
    </Box>;

  return <Box>
    <Typography variant={ 'h4' }>
      { productName }
    </Typography>
    <Divider/>
    <Box>
      <Typography>Descriere:</Typography>
      <Typography>{ productDescription }</Typography>
    </Box>
    <Box>
      <Typography>Unitate:</Typography>
      <Typography>{ unit }</Typography>
    </Box>
    <Box>
      <Typography>Produse necesare:</Typography>
      <NecessaryProductsList
        necessaryProducts={ necessaryProducts }
        onDelete={ openDeleteNecessaryProductModal }
        onClick={ handleNavigateToProductDetail }
      />
      <Button onClick={ openCreateNecessaryProductModal } variant={'contained'}>
        Adauga produs
      </Button>
    </Box>
    <Box>
      <Typography>Materiale necesare:</Typography>
      <NecessaryRawMaterialsList
        necessaryRawMaterials={ necessaryRawMaterials }
        onDelete={ openDeleteNecessaryRawMaterialModal }
        onClick={ handleNavigateToMaterialDetail }
      />
    </Box>

    <CreateNecessaryProductModal
      isOpen={ isCreateNecessaryProductModalOpen }
      onClose={ closeCreateNecessaryProductModal }
      onCreate={ console.log }
    />

    <ConfirmationModal
      isOpen={ isDeleteNecessaryProductModalOpen }
      onClose={ closeDeleteNecessaryProductModal }
      data={ deleteNecessaryProductData }
      onConfirm={ handleConfirmDeleteNecessaryProduct }
      title={ 'Confirmare necesara' }
      text={ `Sigur doriti sa stergeti produsul (${ deepGet(deleteNecessaryProductData, 'product.name') }) din lista de necesitati?` }
    />

    <ConfirmationModal
      isOpen={ isDeleteNecessaryRawMaterialModalOpen }
      onClose={ closeDeleteNecessaryRawMaterialModal }
      data={ deleteNecessaryRawMaterialData }
      onConfirm={ handleConfirmDeleteNecessaryRawMaterial }
      title={ 'Confirmare necesara' }
      text={ `Sigur doriti sa stergeti materialul (${ deepGet(deleteNecessaryRawMaterialData, 'rawMaterial.name') }) din lista de necesitati?` }
    />
  </Box>;
};

const mapStateToProps = state => ({
  product: state.products.product,
  productLoading: state.products.productLoading,
  productError: state.products.productError,

});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadProduct: id => dispatch(products.loadProduct(id)),
    deleteNecessaryProduct: id => dispatch(products.deleteNecessaryProduct(id)),
    deleteNecessaryRawMaterial: id => dispatch(products.deleteNecessaryRawMaterial(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withLayout(ProductDetail));
