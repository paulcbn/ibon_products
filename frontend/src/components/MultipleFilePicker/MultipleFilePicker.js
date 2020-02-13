import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Delete';
import React, { useCallback, useMemo } from 'react';
import { deepGet } from '../../lib/utils';
import { useStyle } from './style';


const MultipleFilePicker = ({ files, setFiles }) => {
  const classes = useStyle();

  const handleUpload = useCallback(file => {
    setFiles(old => [ ...old, file ]);
  }, [ setFiles ]);

  const handleDelete = useCallback(index => {
    setFiles(old => {
      old.splice(index, 1);
      return [ ...old ];
    });
  }, [ setFiles ]);

  return <TableContainer component={ Paper }>
    <Table className={ classes.table } size="small">
      <TableHeader/>
      <TableBody>
        { files.map((file, index) => <FileRow key={ index } file={ file } onDelete={ () => handleDelete(index) }/>) }
      </TableBody>
    </Table>
    <UploadButtonBox onUpload={ handleUpload }/>
  </TableContainer>;
};

const UploadButtonBox = ({ onUpload }) => {
  const classes = useStyle();

  const handleChange = useCallback((event) => {
    const file = deepGet(event, 'target.files.0');
    if (file !== undefined || true)
      onUpload(file);
  }, [ onUpload ]);

  return <Box className={ classes.uploadButtonBox }>
    <input
      accept="image/*"
      id="outlined-button-file"
      className={ classes.input }
      type="file"
      onChange={ handleChange }
    />
    <label htmlFor="outlined-button-file">
      <Button variant="outlined" component="span" className={ classes.button }>
        Upload
      </Button>
    </label>
  </Box>;
};

const FileRow = ({ file, onDelete }) => {

  const { fileName, fileSize } = useMemo(() => ({
    fileName: deepGet(file, 'name'),
    fileSize: (deepGet(file, 'size', 0) / (1024 * 1024)).toFixed(3),
  }), [ file ]);

  return <TableRow>
    <TableCell component="th" scope="row">{ fileName }</TableCell>
    <TableCell align="right">{ fileSize }MB</TableCell>
    <TableCell align="right">
      <IconButton
        onClick={ () => onDelete() }>
        <RemoveIcon/>
      </IconButton>
    </TableCell>
  </TableRow>;
};

const TableHeader = () => <TableHead>
  <TableRow>
    <TableCell>Filename</TableCell>
    <TableCell align="right">File size</TableCell>
    <TableCell align="right">Remove</TableCell>
  </TableRow>
</TableHead>;

export default MultipleFilePicker;