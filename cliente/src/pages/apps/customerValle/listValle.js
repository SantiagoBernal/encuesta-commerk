import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useMemo, useState, Fragment
  , useRef
} from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// import SaveIcon from '@mui/icons-material/Save';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// // import Alert from '@mui/material/Alert';
// // import AlertTitle from '@mui/material/AlertTitle';
import CardActions from '@mui/material/CardActions';
// // import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
// import * as XLSX from 'xlsx/xlsx.mjs';
// //import axios from 'axios';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

// const EXTENSIONS = ['xlsx', 'xls', 'csv']

import { dispatch, useSelector } from 'store';
import { getClientesHeinsohn } from 'store/reducers/clientesheisohn';
import { getClientesValle } from 'store/reducers/cliente';
// import { createdCliente } from 'store/reducers/cliente';
//import { deleteCliente } from 'store/reducers/cliente';


// import axios from 'utils/axios';

// third-party
// import { PatternFormat } from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project-imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
// import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  // CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import AddCustomer from 'sections/apps/customer/AddCustomer';
//import AddEncuesta from 'sections/apps/customer/AddEncuesta';
import CustomerView from 'sections/apps/customer/CustomerView';
// import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
// import { openSnackbar } from 'store/reducers/snackbar';

// assets
import {
  // Add,
  Edit,
  //  Eye,
  // Trash 
} from 'iconsax-react';
import { ThemeMode } from 'config';

// import dataClientesPrueba from 'data/clientesPrueba';
import { setEmail } from 'store/reducers/email';
import { openSnackbar } from 'store/reducers/snackbar';

// const avatarImage = require.context('assets/images/users', true);

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, renderRowSubComponent,
  //  handleAdd
}) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // const clientesValle = useSelector((state) => state.cliente.clientesValle);

  // useEffect(() => {
  //   dispatch(getClientesValle());
  // }, [])

  //console.log("clientes arriba", clientes)

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'nombre_sn', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 5, hiddenColumns: ['avatar', 'email'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );



  useEffect(() => {
    if (matchDownSM) {
      (['age', 'contact', 'visits', 'correo_recepcion', 'status', 'avatar']);
    } else {
      setHiddenColumns(['avatar', 'email']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const tableRef = useRef(null)

  const clearSelection = () => {
    // console.log("tableRef.current", tableRef.current)
    // console.log("tableRef", tableRef)
    if (tableRef.current) {
      // console.log("tableRef.current", tableRef.current)
      tableRef.current.onAllSelected(false)
    }
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (selectedFlatRows.length > 0) {
      for (let i = 0; i < selectedFlatRows.length; i++) {
        dispatch(setEmail(selectedFlatRows[i].original));
        console.log("selectedFlatRows[i].original", selectedFlatRows[i].original)
        dispatch(
          openSnackbar({
            open: true,
            message: 'Correo enviado con èxito!.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
      clearSelection(selectedFlatRows);
    }
    // return <Loader />;
  };

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>

        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={2}>

            <Card sx={{ maxWidth: 345, maxHeight: 200, direction: "column", alignItems: "center", display: "flex" }}>
              <CardActions>

                <Stack
                  alignContent="contained" direction="row" spacing={2}>
                  <Button
                    disabled={selectedFlatRows.length === 0}
                    onClick={handleSubmitEmail}
                    variant="contained" size="large" endIcon={<MarkEmailReadIcon />}>
                    Enviar correos
                  </Button>
                </Stack>

              </CardActions>
            </Card>

            <SortingSelect sortBy={sortBy.id_cliente} setSortBy={setSortBy} allColumns={allColumns} />

            {/* <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'customer-list.csv'} /> */}
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={column} {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell) => (
                      <TableCell key={cell} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  handleAdd: PropTypes.func,
  handleGuardar: PropTypes.func,
  renderRowSubComponent: PropTypes.any
};

// ==============================|| CUSTOMER - LIST ||============================== //

const CustomerListPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  // const data = useMemo(() => makeData(200), []);
  //console.log("data", data)
  // const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  //console.log("customer", customer)
  // const [rows, setRowse] = useState([]);
  // const [customerDeleteId, setCustomerDeleteId] = useState('');
  const [add, setAdd] = useState(false);

  const clientesValle = useSelector((state) => state.cliente.clientesValle);
  //const clientesHeinsohn = useSelector((state) => state.cliente.clientesHeinsohn);
  // console.log("clientesValle", clientesValle)
  // console.log("dataClientesPrueba", dataClientesPrueba)

  // const [listaclientesPrueba, setListaclientesPrueba] = useState([]);

  // useEffect(() => {
  //   if (dataClientesPrueba.length > 0) {
  //     setListaclientesPrueba(dataClientesPrueba);
  //   }
  // }, [])
  // console.log("listaclientesPrueba", listaclientesPrueba)

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add)
      setCustomer(null);
  };

  useEffect(() => {
    dispatch(getClientesValle());
  }, [])

  useEffect(() => {
    dispatch(getClientesHeinsohn());
  }, [])

  //console.log("clientesHeinsohn", clientesHeinsohn)
  //console.log("clientes", clientes)
  // console.log("rows", rows)

  const data = clientesValle;

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: ({ getToggleAllPageRowsSelectedProps }) => <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />,
        accessor: 'selection',
        Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        disableSortBy: true
      },
      {
        Header: 'Id',
        accessor: 'id_cliente',
        className: 'cell-center'
      },
      {
        Header: 'SN',
        accessor: 'codigo_sn',
        className: 'cell-center'
      },
      {
        Header: 'Cliente',
        accessor: 'nombre_sn',
        Cell: ({ row }) => {
          const { values } = row;
          //const { valuesData } = rows;
          //console.log("values", values)
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${!values.avatar ? 1 : values.avatar}.png`)} /> */}
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.nombre_sn}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Correo Electronico',
        accessor: 'correo_electronico',
        // disableSortBy: true
      },
      {
        Header: 'Correo Recepcion',
        accessor: 'correo_recepcion'
      },
      {
        Header: 'Movil',
        accessor: 'telefono_movil',
        // Cell: ({ value }) => <PatternFormat displayType="text" format="+57 (###) ###-####" mask="_" defaultValue={value} />
      },
      {
        Header: 'Teléfono 1',
        accessor: 'telefono_',
        // Cell: ({ value }) => <PatternFormat displayType="text" format="+57 (###) ###-####" mask="_" defaultValue={value != "0" ? value : ""} />
      },
      {
        Header: 'Teléfono 2',
        accessor: 'telefono_2',
        // Cell: ({ value }) => <PatternFormat displayType="text" format="+57 (###) ###-####" mask="_" defaultValue={value != "0" ? value : ""} />
      },
      {
        Header: 'Grupo',
        accessor: 'nombre_grupo',
        className: 'cell-right'
      },
      {
        Header: 'Proyecto',
        accessor: 'codigo_proyecto'
      },
      {
        Header: 'Estado',
        accessor: 'estado_encuesta',
        Cell: ({ value }) => {
          switch (value) {
            case false:
              return <Chip color="error" label="Sin encuesta" size="small" variant="light" />;
            case true:
            default:
              return <Chip color="info" label="Con encuesta" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Encuesta',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => {
          //const collapseIcon = row.isExpanded ? <Add style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} /> : <Eye />;
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>

              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="Encuesta"
              >
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomer(row.values);
                    handleAdd();
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>

              {/* <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="Delete"
              >
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    setCustomerDeleteId(row.values.id);
                  }}
                >
                  <Trash />
                </IconButton>
              </Tooltip> */}

            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[Number(row.id_cliente)]} />, [data]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} handleAdd={handleAdd} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
      {/* <AlertCustomerDelete title={customerDeleteId} open={open} handleClose={handleClose} /> */}
      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <AddCustomer customer={customer} onCancel={handleAdd} />
      </Dialog>
    </MainCard>
  );
};

CustomerListPage.propTypes = {
  row: PropTypes.object,
  values: PropTypes.object,
  avatar: PropTypes.object,
  message: PropTypes.string,
  nombre_sn: PropTypes.string,
  correo_electronico: PropTypes.string,
  value: PropTypes.object,
  isExpanded: PropTypes.bool,
  toggleRowExpanded: PropTypes.func,
  getToggleAllPageRowsSelectedProps: PropTypes.func,
  id_cliente: PropTypes.number
};

export default CustomerListPage;
