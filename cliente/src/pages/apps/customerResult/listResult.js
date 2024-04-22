import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  // Chip,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';


import {
  dispatch,
  useSelector
} from 'store';

import { getResultado } from 'store/reducers/encuesta';
import { getResultadoValle } from 'store/reducers/encuesta';
import { getResultadoAntioquia } from 'store/reducers/encuesta';




import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project-imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import { PopupTransition } from 'components/@extended/Transitions';
import {
  CSVExport,
  HeaderSort,
  // IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import AddCustomer from 'sections/apps/customer/AddCustomer';
import CustomerView from 'sections/apps/customer/CustomerView';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

import useAuth from 'hooks/useAuth';

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
            <SortingSelect sortBy={sortBy.id_cliente} setSortBy={setSortBy} allColumns={allColumns} />
            <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'resultados.csv'} />
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
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);


  const resultados = useSelector((state) => state.encuesta.resultados);
  const resultadosAntioquia = useSelector((state) => state.encuesta.resultadosAntioquia);
  const resultadosValle = useSelector((state) => state.encuesta.resultadosValle);
  const sinRespuesta = useSelector((state) => state.encuesta.sinRespuesta);


  // console.log("resultados", resultados)
  console.log("resultadosAntioquia", resultadosAntioquia)
  // console.log("resultadosValle", resultadosValle)


  console.log("sinRespuesta", sinRespuesta)

  const { user } = useAuth();

  //console.log("user", user)

  let antioquia = user && user.useremail === 'encuesta.antioquia@commerk.com.co';
  let valle = user && user.useremail === 'encuesta.valle@commerk.com.co';
  let todos = user && user.useremail === 'encuesta@commerk.com.co';




  useEffect(() => {
    dispatch(getResultadoValle());
    dispatch(getResultadoAntioquia());
    dispatch(getResultado());
  }, [])

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add)
      setCustomer(null);
  };

  const data = antioquia ? resultadosAntioquia : valle ? resultadosValle : todos ? resultados : [];

  const columns = useMemo(
    () => [
      {
        Header: 'Id Cliente',
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
        Header: 'Grupo',
        accessor: 'nombre_grupo',
        className: 'cell-center'
      },
      {
        Header: 'Pregunta 1',
        accessor: 'pregunta_1',
        className: 'cell-center'
      },
      {
        Header: 'Pregunta 2',
        accessor: 'pregunta_2',
        className: 'cell-center'
      },
      {
        Header: 'Pregunta 3',
        accessor: 'pregunta_3',
        className: 'cell-center'
      },
      {
        Header: 'Pregunta 4',
        accessor: 'pregunta_4',
        className: 'cell-center'
      },
      {
        Header: 'Comentario',
        accessor: 'comentario',
        className: 'cell-center'
      },
      {
        Header: 'Encuestador',
        accessor: 'encuestador',
        className: 'cell-center'
      },
      {
        Header: 'Fecha',
        accessor: 'fecha_creacion',
        className: 'cell-center'
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
