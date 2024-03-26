// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project-imports
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';
import cliente from './cliente';
import clientesheinsohn from './clientesheisohn';
import encuesta from './encuesta';
import email from './email';
import productReducer from './product';
import cartReducer from './cart';
import kanban from './kanban';
import invoice from './invoice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  cliente,
  clientesheinsohn,
  encuesta,
  email,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'able-pro-material-ts-'
    },
    cartReducer
  ),
  product: productReducer,
  kanban,
  invoice
});

export default reducers;
