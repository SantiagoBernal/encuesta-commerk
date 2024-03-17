// import {
//   Card, CardBody,
//   CardSubtitle, Table,
//   Pagination,
//   PaginationItem,
//   PaginationLink
// } from "reactstrap";
import React, {
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularLoading from "./CircularLoading";
import PollIcon from '@mui/icons-material/Poll';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import { Link } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: '',
    numeric: false,
    disablePadding: false,
    label: 'Encuestar',
  },
  {
    id: 'codigo_sn',
    numeric: false,
    disablePadding: false,
    label: 'Codigo',
  },
  {
    id: 'nombre_sn',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'correo_electronico',
    numeric: false,
    disablePadding: false,
    label: 'Correo',
  },
  {
    id: 'correo_recepcion',
    numeric: false,
    disablePadding: false,
    label: 'Correo Recepcion',
  },
  {
    id: 'Telefono_movil',
    numeric: false,
    disablePadding: true,
    label: 'Movil',
  }, {
    id: 'telefono_1',
    numeric: false,
    disablePadding: true,
    label: 'Telefono1',
  },
  {
    id: 'telefono_2',
    numeric: false,
    disablePadding: true,
    label: 'Telefono2',
  },
  {
    id: 'estado_encuesta',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'nombre_grupo',
    numeric: false,
    disablePadding: false,
    label: 'Grupo',
  },
  {
    id: 'codigo_proyecto',
    numeric: false,
    disablePadding: false,
    label: 'Proyecto',
  },
 
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Clientes sin encuesta
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};





const ProjectTables = (props) => {

  // const [clientes, setClientes] = useState();
  const navigate = useNavigate();
  // const pageSize = 5;
  // const [currentState, setCurrentState] = useState(0);
  // const [pageState, setPageState] = useState(0);


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [rowsNew, setRowsNew] = React.useState(list);

  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRowse] = React.useState([]);
 



  const handleShowPopover = (event) => {
    navigate('/encuesta', { state: { val: event } });
    //console.log("event", event)
  };

  //console.log("anchorEl", anchorEl)

  const fetchUserData = async () => {
    setIsLoading(true);
    await axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/cliente/listaF`,
    }).then((res) => {
      setRowse(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [])

  //console.log("rows", rows)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && rows.length > 0) {
      const newSelected = rows?.map((n) => n.id_cliente);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  //console.log("selected", selected)
  //console.log("selectedcliente", selectedcliente)

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );




  return (
    isLoading ? <CircularLoading /> :
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows?.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id_cliente);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (

                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id_cliente)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id_cliente}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                        options={{
                          exportButton: true,
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" padding='normal'>
                          <PollIcon
                            cursor="pointer"
                            onClick={(event) => handleShowPopover(row)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.codigo_sn}
                        </TableCell>
                        <TableCell align="center" padding='none' >{row.nombre_sn}</TableCell>
                        <TableCell align="center" padding='normal'>{row.correo_electronico}</TableCell>
                        <TableCell align="center" padding='normal'>{row.correo_recepcion}</TableCell>
                        <TableCell align="center" padding='normal'>{row.telefono_movil}</TableCell>
                        <TableCell align="center" padding='normal'>{row.telefono_1}</TableCell>
                        <TableCell align="center" padding='normal'>{row.telefono_2}</TableCell>
                        <TableCell align="center" padding='normal'>
                          {row.estado_encuesta === true ? "OK" : "NO"}
                        </TableCell>
                        <TableCell align="center" padding='normal'>{row.nombre_grupo}</TableCell>
                        <TableCell align="center" padding='normal'>{row.codigo_proyecto}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 33) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage=" Filas por página"
              // labelDisplayedRows={({ from, to, count }) => `Displaying pages ${from}-${to} of total ${count} pages`}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
        </Box>
      </div>
  );

};

export default ProjectTables;
