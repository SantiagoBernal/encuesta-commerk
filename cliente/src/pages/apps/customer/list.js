import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment, useRef } from 'react';

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

import SaveIcon from '@mui/icons-material/Save';
// import SyntaxHighlight from 'utils/SyntaxHighlight';
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Card from '@mui/material/Card';
import * as XLSX from 'xlsx/xlsx.mjs';
//import axios from 'axios';

const EXTENSIONS = ['xlsx', 'xls', 'csv']

import {
  dispatch,
  useSelector
} from 'store';
// import { getClientesHeinsohn } from 'store/reducers/clientesheisohn';
import { getClientes } from 'store/reducers/cliente';
import { getClientesAntioquia } from 'store/reducers/cliente';
import { getClientesValle } from 'store/reducers/cliente';
import { createdCliente } from 'store/reducers/cliente';
//import { deleteCliente } from 'store/reducers/cliente';
import { getEncuesta } from 'store/reducers/encuesta';
//import { setEmail } from 'store/reducers/email';
// import Loader from 'components/Loader';



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
  CSVExport,
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
import { openSnackbar } from 'store/reducers/snackbar';

// import { UseAuth } from 'hooks/useAuth';
import useAuth from 'hooks/useAuth';
// import  clientesAntioquia from 'data/clientesAntioquia';
// import  clientesValle from 'data/clientesValle';
// import dataClientesAntioquiaNueva from 'data/clientesAntioquiaNueva';
// import dataClientesAntioquiaNueva2 from 'data/clientesAntioquiaNueva2';

import {
  // Add,
  Edit,
  //  Eye,
  // Trash 
} from 'iconsax-react';
import { ThemeMode } from 'config';
// import dataClientesAntioquia from 'data/clientesAntioquia';
// import dataClientesPrueba from 'data/clientesPrueba';
import { setEmail } from 'store/reducers/email';


// const avatarImage = require.context('assets/images/users', true);

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, renderRowSubComponent,
  //  handleAdd
}) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

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
      initialState: {
        pageIndex: 0, pageSize: 5, hiddenColumns: [
          'id_cliente',
          'codigo_sn',
          'nombre_sn',
          'codigo_sn',
          'correo_electronico',
          'correo_recepcion',
          'telefono_movil',
          'telefono_1',
          'telefono_2',
          'nombre_grupo',
          'codigo_proyecto',
        ], sortBy: [sortBy]
      }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // console.log("setSortBy", setSortBy)
  // console.log("rows", rows)
  // console.log("setSortBy", setSortBy)
  // console.log("selectedRowIds", selectedRowIds)


  useEffect(() => {
    if (matchDownSM) {
      (['id_cliente',
        'codigo_sn',
        'nombre_sn',
        'codigo_sn',
        'correo_electronico',
        'correo_recepcion',
        'telefono_movil',
        'telefono_1',
        'telefono_2',
        'nombre_grupo',
        'codigo_proyecto',]);
    } else {
      setHiddenColumns(['avatar', 'email']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);


  const [clientesCargados, setClientesCargados] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  // const [total, setTotal] = useState(0);



  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)
    });
    return rows
  }

  const hiddenFileInput = useRef(null);
  const tableRef = useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const clearSelection = () => {
    // console.log("tableRef.current", tableRef.current)
    // console.log("tableRef", tableRef)
    if (tableRef.current) {
      // console.log("tableRef.current", tableRef.current)
      tableRef.current.onAllSelected(false)
    }
  }

  const importExcel = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      //console.log(fileData)
      const headers = fileData[0]
      fileData.splice(0, 1)
      const dataUsers = convertToJson(headers, fileData)
      const users = [];
      if (dataUsers.length > 0) {

        for (let i = 0; i < dataUsers.length; i++) {
          if (dataUsers[i].telefono_1) {
            dataUsers[i].telefono_1 = (dataUsers[i].telefono_1).toString();
          }
          if (dataUsers[i].telefono_2) {
            dataUsers[i].telefono_2 = (dataUsers[i].telefono_2).toString();
          }

          if (dataUsers[i].telefono_movil) {
            dataUsers[i].telefono_movil = (dataUsers[i].telefono_movil).toString();
          }

          if (!dataUsers[i].correo_recepcion) {
            dataUsers[i].telefono_1 = "0";
          }
          if (!dataUsers[i].correo_electronico) {
            dataUsers[i].telefono_1 = "0";
          }
          if (!dataUsers[i].telefono_1) {
            dataUsers[i].telefono_1 = "0";
          }
          if (!dataUsers[i].telefono_2) {
            dataUsers[i].telefono_2 = "0";
          }
          const estado_encuesta = false;
          dataUsers[i].estado_encuesta = estado_encuesta;
          users.push(dataUsers[i])
        }
        setClientesCargados(dataUsers)
      }
    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < clientesCargados.length; i++) {
      console.log(clientesCargados[i])
      dispatch(createdCliente(clientesCargados[i]));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Clientes cargados con èxito!.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      // setLoading(false);
    }
  };



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
      <TableRowSelection selected={Object.keys(selectedRowIds).length}
        defaultRef={tableRef}
      // onClick={handleClickSelect(selectedFlatRows)} 
      />
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
                    onClick={handleSubmitEmail}
                    variant="contained" size="large" endIcon={<MarkEmailReadIcon />}>
                    Enviar correos
                  </Button>
                </Stack>

              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, maxHeight: 200, direction: "column", alignItems: "center", display: "flex" }}>
              <CardActions>
                <div className="button-group">
                  <label>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={importExcel}
                      ref={hiddenFileInput}
                    />
                    <Stack alignContent="contained" direction="row" spacing={2}>
                      <Button
                        onClick={handleClick}
                        variant="outlined" size="large" startIcon={<FileUploadIcon />}>
                        Cargar
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        variant="contained" size="large" endIcon={<SaveIcon />}>
                        Guardar
                      </Button>
                    </Stack>
                  </label>
                </div>
              </CardActions>
            </Card>

            <SortingSelect sortBy={sortBy.id_cliente} setSortBy={setSortBy} allColumns={allColumns} />
            <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'customer-list.csv'} />
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
      </Stack >
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
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);

  // console.log("dataClientesAntioquia2", dataClientesAntioquiaNueva2)
  // console.log("dataClientesPrueba", dataClientesPrueba)

  // const [listaclientesPrueba, setListaclientesPrueba] = useState([]);
  //const [listaclientesantioquia, setListaclientesantioquia] = useState([]);

  const { user } = useAuth();

  let antioquia = user && user.useremail === 'encuesta.antioquia@commerk.com.co';
  let valle = user && user.useremail === 'encuesta.valle@commerk.com.co';
  let todos = user && user.useremail === 'encuesta@commerk.com.co';
  // const [clientesNuevos, setClientesNuevos] = useState([]);


  const clientes = useSelector((state) => state.cliente.clientes);
  const clientesAntioquia = useSelector((state) => state.cliente.clientesAntioquia);
  const clientesValle = useSelector((state) => state.cliente.clientesValle);


  useEffect(() => {
    dispatch(getEncuesta());
  }, [])


  // useEffect(() => {
  //   if (dataClientesAntioquiaNueva2.length > 0) {
  //     setListaclientesPrueba(dataClientesAntioquiaNueva2);
  //   }
  // }, [])
  // console.log("listaclientesPrueba", listaclientesPrueba)

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add)
      setCustomer(null);
  };

  // useEffect(() => {
  //   dispatch(getAddresses()).then(() => setLoading(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      if (antioquia) {
        dispatch(getClientesAntioquia());
      } else if (valle) {
        dispatch(getClientesValle());
      } else if (todos) {
        dispatch(getClientes());
      }
    }, 1000);
  }, [])

  // useEffect(() => {
  //   dispatch(getClientesHeinsohn());
  // }, [])

  //console.log("clientesHeinsohn", clientesHeinsohn)
  // console.log("encuesta", encuesta)
  console.log("clientes", clientes)

  // const data = clientes;

  const data = antioquia ? clientesAntioquia : valle ? clientesValle : clientes;

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
        Header: 'Código SN',
        accessor: 'codigo_sn',
        className: 'cell-center'
      },
      {
        Header: 'Cliente',
        accessor: 'nombre_sn',
        Cell: ({ row }) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
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
        className: 'cell-center'
      },
      {
        Header: 'Correo Recepcion',
        accessor: 'correo_recepcion',
        className: 'cell-center'
      },
      {
        Header: 'Movil',
        accessor: 'telefono_movil',
        className: 'cell-center'
      },
      {
        Header: 'Teléfono 1',
        accessor: 'telefono_1',
        className: 'cell-center'
      },
      {
        Header: 'Teléfono 2',
        accessor: 'telefono_2',
        className: 'cell-center'
      },
      {
        Header: 'Grupo',
        accessor: 'nombre_grupo',
        className: 'cell-center'
      },
      {
        Header: 'Proyecto',
        accessor: 'codigo_proyecto',
        className: 'cell-center'
      },
      {
        Header: 'Estado',
        accessor: 'estado_encuesta',
        className: 'cell-center',
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
