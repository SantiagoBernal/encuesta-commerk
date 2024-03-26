// third-party
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// project-imports
// import axios from 'utils/axios';
import { dispatch } from '../index';

// ==============================|| SLICE - PRODUCTS ||============================== //

const initialState = {
    error: null,
    clientesHeinsohn: [],
};

const clientesheinsohn = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CLIENTES
        getClientesHeinsohnSuccess(state, action) {
            state.clientesHeinsohn = action.payload;
        },

    }
});

// Reducer
export default clientesheinsohn.reducer;


export function getClientesHeinsohn() {

    return async () => {
        try {
            // let config = {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         'Cookie': '52ee5254-e849-11ee-8000-000d3a0db359',
            //         'prefer': 'odata.maxpagesize=5000',
            //         'acept': '*/*',
            //         'Accept-Encoding': 'gzip,deflate,br'
            //     },
            //     responseType: 'blob'
            // };
            // const response = await axios.get('https://vm-hbt-hm18.heinsohncloud.com.co:50000/b1s/v1/sml.svc/CLIENTES_ENCUENTASParameters(Proyecto=\'02\', YearData=\'2024\')/CLIENTES_ENCUENTAS', config);
            // dispatch(clientesheinsohn.actions.getClientesHeinsohnSuccess(response.data));
            // console.log("response", response)
        } catch (error) {
            dispatch(clientesheinsohn.actions.hasError(error));
        }
    };
}





