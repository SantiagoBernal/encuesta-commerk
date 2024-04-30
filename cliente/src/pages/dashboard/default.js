// material-ui
import {
  useEffect,
  useState,
} from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  //  Stack,
  Typography
} from '@mui/material';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';

import { getClientesVerdadero } from 'store/reducers/cliente';
import { getClientesFalso } from 'store/reducers/cliente';
import { getClientes } from 'store/reducers/cliente';


// import { getClientesAntioquia } from 'store/reducers/cliente';
import { getClientesAntioquiaVerdadero } from 'store/reducers/cliente';
import { getClientesAntioquiaFalso } from 'store/reducers/cliente';
import { getClientesAntioquiaSinRespuesta } from 'store/reducers/cliente';


import { getClientesValle } from 'store/reducers/cliente';
import { getClientesValleVerdadero } from 'store/reducers/cliente';
import { getClientesValleFalso } from 'store/reducers/cliente';


import { 
  dispatch,
   useSelector } from 'store';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import RepeatCustomerRate from 'sections/widget/chart/RepeatCustomerRate';
// import ProjectOverview from 'sections/widget/chart/ProjectOverview';
// import ProjectRelease from 'sections/dashboard/default/ProjectRelease';
// import AssignUsers from 'sections/widget/statistics/AssignUsers';

// import Transactions from 'sections/widget/data/Transactions';
// import TotalIncome from 'sections/widget/chart/TotalIncome';

// assets
import {
  ArrowDown, ArrowUp, Book, Calendar,
  Wallet3
} from 'iconsax-react';
// import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {

 
  const clientes = useSelector((state) => state.cliente.clientes);
  const clientesV = useSelector((state) => state.cliente.clientesV);
  const clientesF = useSelector((state) => state.cliente.clientesF);

  const clientesValle = useSelector((state) => state.cliente.clientesValle);
  const clientesValleFalso = useSelector((state) => state.cliente.clientesValleFalso);
  const clientesValleVerdadero = useSelector((state) => state.cliente.clientesValleVerdadero);

  const clientesAntioquia = useSelector((state) => state.cliente.clientesAntioquia);
  const clientesAntioquiaFalso = useSelector((state) => state.cliente.clientesAntioquiaFalso);
  const clientesAntioquiaVerdadero = useSelector((state) => state.cliente.clientesAntioquiaVerdader);

  const theme = useTheme();


  useEffect(() => {
    dispatch(getClientesVerdadero());
    dispatch(getClientesFalso());
    dispatch(getClientes());

    // dispatch(getClientesAntioquia());
    dispatch(getClientesAntioquiaFalso());
    dispatch(getClientesAntioquiaVerdadero());
    dispatch(getClientesAntioquiaSinRespuesta());

    dispatch(getClientesValle());
    dispatch(getClientesValleFalso());
    dispatch(getClientesValleVerdadero());
  }, [])

  // console.log("clientes", clientes)
  // console.log("clientesV", clientesV)
  // console.log("clientesF", clientesF)

  // console.log("clientesValle", clientesValle)
  // console.log("clientesValleFalso", clientesValleFalso)
  // console.log("clientesValleVerdadero", clientesValleVerdadero)

  // console.log("clientesAntioquia", clientesAntioquia)
  // console.log("clientesAntioquiaFalso", clientesAntioquiaFalso)
  // console.log("clientesAntioquiaVerdadero", clientesAntioquiaVerdadero)

  const [usuario, setUsuario] = useState([]);


  useEffect(() => {
    const selectedUSer = localStorage.getItem('selectedUSer')
    const usuarioParseado = JSON.parse(selectedUSer);
    const usuario = usuarioParseado?.useremail;
    setUsuario(usuario)
    //console.log("usuarioParseado", usuarioParseado)
  }, [])


  let antioquia = usuario === 'encuesta.antioquia@commerk.com.co';
  let valle = usuario === 'encuesta.valle@commerk.com.co';
  let todos = usuario === 'encuesta@commerk.com.co';



  const porcentagetodosV = (clientesV.length / clientes.length * 100).toString();
  const porcentagetodosF = (clientesF.length / clientes.length * 100).toString();

  const porcentageVerdaderoValle = (clientesValleVerdadero.length / clientesValle.length * 100).toString();
  const porcentagefalseValle = (clientesValleFalso.length / clientesValle.length * 100).toString();
  // console.log("porcentageFV", porcentageFV)

  const porcentageVerdaderoAntioquia = (clientesAntioquiaVerdadero.length / clientesAntioquia.length * 100).toString();
  const porcentageFalsoAntioquia = (clientesAntioquiaFalso.length / clientesAntioquia.length * 100).toString();
  // console.log("porcentageFA", porcentageFA)
  // console.log("porcentageVA", porcentageVA)

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center">
              Seguimiento {todos ? 'total':''} de encuestas {antioquia ? 'Antioquia' : valle ? 'Valle' : ''}
            </Typography>
            {/* Aquí puedes agregar más contenido si es necesario */}
          </CardContent>
        </Card>
      </Grid>

      {/* row 1 */}
      <Grid item xs={4} >
        <EcommerceDataCard
          title="Clientes Procesados"
          count={todos ? (clientes.length).toString() : antioquia ? (clientesAntioquia.length).toString() : valle ? (clientesValle.length).toString() : ""}
          // count={ (clientes.length).toString()}
          iconPrimary={<Wallet3 />}
          percentage={
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(360deg)' }} />
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.primary.main} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={4} >
        <EcommerceDataCard
          title="Encuestas hechas"
          // count={ "ya va"}
          count={todos ? (clientesV.length).toString() : antioquia ? (clientesAntioquiaVerdadero.length).toString() : valle ? (clientesValleVerdadero.length).toString() : ""}
          color="warning"
          iconPrimary={<Book color={theme.palette.warning.dark} />}
          percentage={
            <Typography color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} />
              {/* { "ya va"} */}
              {todos ? porcentagetodosV : antioquia ? porcentageVerdaderoAntioquia: porcentageVerdaderoValle}%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.warning.dark} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={4} >
        <EcommerceDataCard
          title="Clientes sin respuesta"
          // count={ "ya va"}
          count={todos ? (clientesF.length).toString() : antioquia ? (clientesAntioquiaFalso.length).toString() : valle ? (clientesValleFalso.length).toString() : ""}
          color="success"
          iconPrimary={<Calendar color={theme.palette.success.darker} />}
          percentage={
            <Typography color="success.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} />
              {/* { "ya va"} */}
              {todos ? porcentagetodosF : valle ? porcentagefalseValle : porcentageFalsoAntioquia }%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.success.darker} />
        </EcommerceDataCard>
      </Grid>

    </Grid>
  );
};

export default DashboardDefault;
