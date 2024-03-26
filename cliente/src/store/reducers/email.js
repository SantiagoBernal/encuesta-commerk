// third-party
import { createSlice } from '@reduxjs/toolkit';

// project-imports
// import axios from 'utils/axios';
import { dispatch } from '../index';
import axios from 'axios';

// ==============================|| SLICE - PRODUCTS ||============================== //

const initialState = {
    error: null,
    emails: []
};

const email = createSlice({
    name: 'email',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CLIENTES
        setEmailSuccess(state, action) {
            state.emails = action.payload;
        },

    }
});

// Reducer
export default email.reducer;

export function setEmail(data) {
    return async () => {
        try {
            const response = await axios.post('https://encuesta-commerk.onrender.com/enviar/correo', { data });
            //console.log("response".response)
            dispatch(email.actions.setEmailSuccess(response.data));
        } catch (error) {
            dispatch(email.actions.hasError(error));
        }
    };
}








