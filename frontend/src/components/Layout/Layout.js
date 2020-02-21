import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';


const Layout = ({ children }) => {
  return <Box>
    this view is layouted
    <Container>
      { children }
    </Container>
  </Box>;
};

export const withLayout = (PageComponent) => {
  return (props) => {
    return <Layout>
      <PageComponent { ...props }/>
    </Layout>;
  };
};
