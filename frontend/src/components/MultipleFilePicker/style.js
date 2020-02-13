import { makeStyles } from '@material-ui/core/styles';

export const useStyle = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  uploadButtonBox: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));