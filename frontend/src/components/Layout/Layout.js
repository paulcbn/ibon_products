import Box from '@material-ui/core/Box';
import React from 'react';


const Layout = ({ children }) => {
  return <Box>
    this view is layouted
    { children }
  </Box>;
};

export const withLayout = (PageComponent) => {
  return (props) => {
    return <Layout>
      <PageComponent { ...props }/>
    </Layout>;
  };
};
