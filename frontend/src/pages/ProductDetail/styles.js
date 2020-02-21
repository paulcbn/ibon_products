import { makeStyles } from '@material-ui/core/styles';

export const useCreateNecessaryProductModalStyle = makeStyles(theme => ({
  fieldBox: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  selectedProductTypography: {
    fontWeight: 'bold',
  },
}));