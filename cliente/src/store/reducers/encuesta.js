// third-party
import { createSlice } from '@reduxjs/toolkit';

// project-imports
// import axios from 'utils/axios';
import { dispatch } from '../index';
import axios from 'axios';

// ==============================|| SLICE - PRODUCTS ||============================== //

const initialState = {
    error: null,
    encuestas: [],
    resultados: [],
    resultadosValle: [],
    resultadosAntioquia: [],
};

const encuesta = createSlice({
    name: 'encuesta',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CLIENTES
        getClientesSuccess(state, action) {
            state.encuestas = action.payload;
        },

        // ADD COLUMN
        addEncuestaSuccess(state, action) {
            state.encuestas = action.payload;
        },

         // ADD COLUMN
         addSinRespuestaSuccess(state, action) {
            state.encuestas = action.payload;
        },
        

         // ADD COLUMN
         getResultadosSuccess(state, action) {
            state.resultados = action.payload;
        },

         // ADD COLUMN
         getResultadosValleSuccess(state, action) {
            state.resultadosValle = action.payload;
        },

        getResultadosAntiquiaSuccess(state, action) {
            state.resultadosAntioquia = action.payload;
        },

    }
});

// Reducer
export default encuesta.reducer;

export function getEncuesta() {
    return async () => {
        try {
            const response = await axios.get('https://encuesta-commerk.onrender.com/encuesta/lista');
            //console.log("response".response)
            dispatch(encuesta.actions.getClientesSuccess(response.data));
        } catch (error) {
            dispatch(encuesta.actions.hasError(error));
        }
    };
}

export function getResultado() {
    return async () => {
        try {
            const response = await axios.get('https://encuesta-commerk.onrender.com/encuesta/resultados');
            //console.log("response".response)
            dispatch(encuesta.actions.getResultadosSuccess(response.data));
        } catch (error) {
            dispatch(encuesta.actions.hasError(error));
        }
    };
}

export function getResultadoValle() {
    return async () => {
        try {
            const response = await axios.get('https://encuesta-commerk.onrender.com/encuesta/resultadosValle');
            //console.log("response".response)
            dispatch(encuesta.actions.getResultadosValleSuccess(response.data));
        } catch (error) {
            dispatch(encuesta.actions.hasError(error));
        }
    };
}

export function getResultadoAntioquia() {
    return async () => {
        try {
            const response = await axios.get('https://encuesta-commerk.onrender.com/encuesta/resultadosAntioquia');
            //console.log("response".response)
            dispatch(encuesta.actions.getResultadosAntiquiaSuccess(response.data));
        } catch (error) {
            dispatch(encuesta.actions.hasError(error));
        }
    };
}

export function createdEncuesta(data) {
    return async () => {
        try {
            const response = await axios.post('https://encuesta-commerk.onrender.com/encuesta', { data });
            dispatch(encuesta.actions.addEncuestaSuccess(response.data));
        } catch (error) {
            dispatch(encuesta.actions.hasError(error));
        }
    };
}

export function createdSinRespuesta(data) {
    return async () => {
        try {
            console.log("data", data)
            const response = await axios.post('https://encuesta-commerk.onrender.com/sinRespuesta', { data });
            dispatch(encuesta.actions.addSinRespuestaSuccess(response.data));
        } catch (error) {
            dispatch(encuesta.actions.hasError(error));
        }
    };
}




