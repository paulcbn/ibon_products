import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import { withLayout } from '../../components/Layout';
import ProductsSearchWidget from '../../components/ProductsSearchWidget/ProductsSearchWidget';


const Dashboard = () => {
  return <Box>
    <Container>
      <ProductsSearchWidget/>
    </Container>
  </Box>;
};


export default withLayout(Dashboard);