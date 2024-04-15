// third-party
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// project-imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// ==============================|| SLICE - PRODUCTS ||============================== //

const initialState = {
  error: null,
  clientes: [],
  clientesV: [],
  clientesF: [],
  clientesValle: [],
  clientesAntioquia: [],
  clientesValleVerdadero: [],
  clientesAntioquiaVerdader: [],
  clientesValleFalso: [],
  clientesAntioquiaFalso: [],
  clientesEmail: [],
};

const cliente = createSlice({
  name: 'cliente',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },


    // GET CLIENTES
    getClientesSuccess(state, action) {
      state.clientes = action.payload;
    },

     // GET CLIENTES
     getClientesEmailSuccess(state, action) {
      state.clientesEmail = action.payload;
    },

     // GET CLIENTES antioquia
     getClientesAntioquiaSuccess(state, action) {
      state.clientesAntioquia = action.payload;
    },

     // GET CLIENTES valle
     getClientesValleSuccess(state, action) {
      state.clientesValle = action.payload;
    },

    // GET CLIENTES
    getClientesVerdaderoSuccess(state, action) {
      state.clientesV = action.payload;
    },

    // GET CLIENTES
    getClientesFalsoSuccess(state, action) {
      state.clientesF = action.payload;
    },


    // GET CLIENTES Antioquia falso
    getClientesAntioquiaFalsoSuccess(state, action) {
      state.clientesAntioquiaFalso = action.payload;
    },

    // GET CLIENTES Valle falso
    getClientesValleFalsoSuccess(state, action) {
      state.clientesValleFalso = action.payload;
    },

    // GET CLIENTES Antioquia verdadero
    getClientesAntioquiaVerdaderoSuccess(state, action) {
      state.clientesAntioquiaVerdader = action.payload;
    },

    // GET CLIENTES Valle verdadero
    getClientesValleVerdaderoSuccess(state, action) {
      state.clientesValleVerdadero = action.payload;
    },

    // ADD COLUMN
    addClienteSuccess(state, action) {
      state.clientes = action.payload;
    },

    // ADD COLUMN
    deleteClienteSuccess(state, action) {
      state.clientes = action.payload;
    }

  }
});

// Reducer
export default cliente.reducer;

// const axios = require('axios');
// let data = '';





export function getClientesVerdadero() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/listaV`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesVerdaderoSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesFalso() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/listaF`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesFalsoSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientes() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesEmail() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista_email`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesEmailSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesValle() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista/valle`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesValleSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesAntioquia() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista/antioquia`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesAntioquiaSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}


export function getClientesAntioquiaFalso() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista/antioquiaFalso`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesAntioquiaFalsoSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesValleFalso() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista/valleFalso`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesValleFalsoSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesAntioquiaVerdadero() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista/antioquiaVerdadero`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesAntioquiaVerdaderoSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function getClientesValleVerdadero() {
  return async () => {
    try {
      const response = await axios.get(`https://encuesta-commerk.onrender.com/cliente/lista/valleVerdadero`);
      //console.log("response".response)
      dispatch(cliente.actions.getClientesValleVerdaderoSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}


export function createdClienteEmail(data) {
  return async () => {
    try {
      const response = await axios.post(`https://encuesta-commerk.onrender.com/cliente/nuevo_email`, { data });
      dispatch(cliente.actions.addClienteSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}


export function createdCliente(data) {
  return async () => {
    try {
      const response = await axios.post(`https://encuesta-commerk.onrender.com/cliente/nuevo`, { data });
      dispatch(cliente.actions.addClienteSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };
}

export function deleteCliente(cliente) {
  return async () => {
    try {
      const response = await axios.delete(`https://encuesta-commerk.onrender.com/cliente/eliminar`, { cliente });
      dispatch(cliente.actions.deleteClienteSuccess(response.data));
    } catch (error) {
      dispatch(cliente.actions.hasError(error));
    }
  };

}

