import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  // FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  // Switch,
  TextField,
  // Tooltip,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
// import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project-imports
import AlertCustomerDelete from './AlertCustomerDelete';
// import Avatar from 'components/@extended/Avatar';
// import IconButton from 'components/@extended/IconButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { ThemeMode } from 'config';

import { createdEncuesta } from 'store/reducers/encuesta';
import { getClientes } from 'store/reducers/cliente';

// assets
import {
  Camera,
  //  Trash 
} from 'iconsax-react';

// const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = () => {
  const newCustomer = {
    pregunta1: "",
    pregunta2: "",
    pregunta3: "",
    pregunta4: "",
    comentario: "",
    encuestador: "",
    // id_cliente: location.state.val ? location.state.val.id_cliente : "",
  };

  //console.log("customer getInitialValues", encuesta)
  // if (customer) {
  //   newCustomer.name = customer.fatherName;
  //   newCustomer.location = customer.address;
  //   return _.merge({}, newCustomer, customer);
  // }

  return newCustomer;
};

//const allStatus = ['Complicated', 'Single', 'Relationship'];
const pregunta1 =
  [
    'a. Altamente satisfecho: me visitan o hacen seguimiento frecuente para atender mis pedidos.',
    'b. Satisfecho: atienden mis solicitudes de pedido cuando lo requiero.',
    'c. Insatisfecho: debo insistir varias veces para que tengan en cuenta mis solicitudes de producto.',
    'd. Muy insatisfecho: mis pedidos no eran atendidos, las compras ya no las realizo con COMMERK S.A.S..'
  ];
const pregunta2 = [
  'a. Antes de lo acordado.',
  'b. En los tiempos acordados.',
  'c. Ocasionalmente se retrasan.',
  'd. Siempre se retrasan.'
];
const pregunta3 = [
  'a. Excelente: Siempre la información es clara y concisa; me permite tener mayor conocimiento.',
  'b. Buena: En la mayor parte es clara y concisa.',
  'c. Regular: En ocasiones es ambigua la información.',
  'd. Mala: No tiene calidad la información.'
];
const pregunta4 = [
  'a. Excelente.',
  'b. Buena.',
  'c. Regular.',
  'd. Mala.'
];

// ==============================|| CUSTOMER - ADD / EDIT ||============================== //

const AddCustomer = ({ customer, encuesta, onCancel, onGuardar }) => {
  const theme = useTheme();
  const isCreating = !customer;


  // console.log("encuesta", encuesta)
  // console.log("onCancel", onCancel)
  // console.log("onGuardar", onGuardar)

  const [selectedImage, setSelectedImage] = useState(undefined);
  // const [avatar, setAvatar] = useState(avatarImage(`./avatar-${isCreating && !customer?.avatar ? 1 : customer.avatar}.png`));

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    encuestador: Yup.string().max(255).required('Escriba su nombre'),
    // orderStatus: Yup.string().required('Seleccione una'),
    pregunta1: Yup.string().required('Seleccione una'),
    pregunta2: Yup.string().required('Seleccione una'),
    pregunta3: Yup.string().required('Seleccione una'),
    pregunta4: Yup.string().required('Seleccione una'),
    // email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    // location: Yup.string().max(500)
  });

  const [openAlert, setOpenAlert] = useState(false);
  // const [encuestado, setEncuestado] = useState([]);



  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(encuesta),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      //console.log(values)
      try {
        const newCustomer = {
          pregunta_1: values.pregunta1,
          pregunta_2: values.pregunta2,
          pregunta_3: values.pregunta3,
          pregunta_4: values.pregunta4,
          comentario: values.comentario,
          encuestador: values.encuestador,
          id_cliente: customer.id_cliente

        };
        //console.log("newCustomer",newCustomer)
        if (newCustomer) {

          // setEncuestado(newCustomer)
          // handleSubmitEncuesta(encuestado)
          dispatch(createdEncuesta(newCustomer));
          dispatch(getClientes());
          dispatch(
            openSnackbar({
              open: true,
              message: 'Encuesta guardada con èxito!.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        
        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  //console.log("encuestado", encuestado)
  //console.log("customer",customer)

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
  //console.log("getFieldProps",getFieldProps)
  //console.log("setFieldValue",setFieldValue)
  //console.log("customer",customer)




  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{customer ? `${customer.nombre_sn} - ${customer.codigo_sn} - ${customer.telefono_movil}  ` : 'New Customer'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      {/* <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} /> */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={3}>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-orderStatus">1. Su nivel de satisfacción frente a la atención del vendedor para dar respuesta a sus necesidades es:</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('pregunta1')}
                            onChange={(event) => setFieldValue('pregunta1', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Selecciona una</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {pregunta1.map((column) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.orderStatus && errors.orderStatus && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.orderStatus}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-orderStatus">2. La entrega del producto se hace generalmente:</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('pregunta2')}
                            onChange={(event) => setFieldValue('pregunta2', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Selecciona una</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {pregunta2.map((column) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.orderStatus && errors.orderStatus && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.orderStatus}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-orderStatus">3. ¿Considera usted que la calidad de la información sobre nuestros productos es?</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('pregunta3')}
                            onChange={(event) => setFieldValue('pregunta3', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Selecciona una</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {pregunta3.map((column) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.orderStatus && errors.orderStatus && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.orderStatus}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-orderStatus">
                          4. De manera general califique su experiencia durante el tiempo que ha sido cliente de Commerk:
                        </InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('pregunta4')}
                            onChange={(event) => setFieldValue('pregunta4', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Selecciona una</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {pregunta4.map((column) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.orderStatus && errors.orderStatus && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.orderStatus}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-location">Comentarios u observaciones.</InputLabel>
                        <TextField
                          fullWidth
                          id="comentario"
                          multiline
                          rows={2}
                          placeholder="En este espacio permítenos conocer tus observaciones, recomendaciones para la mejora o felicitaciones."
                          {...getFieldProps('comentario')}
                          error={Boolean(touched.comentario && errors.comentario)}
                          helperText={touched.comentario && errors.comentario}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-name">Nombre del encuestador</InputLabel>
                        <TextField
                          fullWidth
                          id="encuestador"
                          placeholder="Ingrese su nombre"
                          {...getFieldProps('encuestador')}
                          error={Boolean(touched.encuestador && errors.encuestador)}
                          helperText={touched.encuestador && errors.encuestador}
                        />
                      </Stack>
                    </Grid>

                    {/* <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Make Contact Info Public</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Means that anyone viewing your profile will be able to see your contacts details
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch defaultChecked sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Available to hire</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Toggling this will let your teammates know that you are available for acquiring new projects
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                    </Grid> */}

                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />

            <DialogActions sx={{ p: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center">

                {/* <Grid item>
                  {!isCreating && (
                    <Tooltip title="Delete Customer" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <Trash variant="Bold" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid> */}

                <Grid item>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancelar encuesta
                    </Button>
                    <Button
                      onClick={onGuardar}
                      type="submit" variant="contained" disabled={isSubmitting}>
                      {customer ? 'Guardar Encuesta' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>

              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {!isCreating && <AlertCustomerDelete title={customer.nombre_sn} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

AddCustomer.propTypes = {
  customer: PropTypes.any,
  onCancel: PropTypes.func,
  onGuardar: PropTypes.func
};

export default AddCustomer;
