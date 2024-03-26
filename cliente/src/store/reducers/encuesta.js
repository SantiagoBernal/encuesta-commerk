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
    resultados: []
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
         getResultadosSuccess(state, action) {
            state.resultados = action.payload;
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




