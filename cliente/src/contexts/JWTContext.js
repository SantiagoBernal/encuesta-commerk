import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project-imports
import Loader from 'components/Loader';
// import axios from 'utils/axios';
import axios from 'axios';

import { getClientes } from 'store/reducers/cliente';
import { getClientesAntioquia } from 'store/reducers/cliente';
import { getClientesValle } from 'store/reducers/cliente';


import { getResultado } from 'store/reducers/encuesta';
import { getResultadoValle } from 'store/reducers/encuesta';
import { getResultadoAntioquia } from 'store/reducers/encuesta';


const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};



const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);

  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    // console.log("serviceToken", serviceToken)
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const setUser = (selectedUSer) => {
  if (selectedUSer) {
    //console.log("selectedUSer", selectedUSer)
    localStorage.setItem('selectedUSer', selectedUSer);
  } else {
    localStorage.removeItem('selectedUSer');
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        //console.log("serviceToken", serviceToken)
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get('https://encuesta-commerk.onrender.com/profile');
          const { user } = response.data;
          setUser(JSON.stringify(user));
          //console.log("user", user)
          //console.log("response.data profile", response.data)
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (useremail, password) => {
    // console.log("useremail", useremail)
    // console.log("password ", password)
    const response = await axios.post('https://encuesta-commerk.onrender.com/login', { useremail, password });
    const { serviceToken, user } = response.data;

    window.localStorage.setItem('userslogin',(user));
    window.localStorage.setItem('reload',(true));

    if (localStorage.getItem('reload')) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
      localStorage.removeItem('reload');
    }

    let antioquia = user && user.useremail === 'encuesta.antioquia@commerk.com.co';
    let valle = user && user.useremail === 'encuesta.valle@commerk.com.co';
    let todos = user && user.useremail === 'encuesta@commerk.com.co';

    if (antioquia) {
      dispatch(getClientesAntioquia());
      dispatch(getResultadoAntioquia());
    } else if (valle) {
      dispatch(getClientesValle());
      dispatch(getResultadoValle());
    } else if (todos) {
      dispatch(getResultado());
      dispatch(getClientes());
    }


    console.log("user login", user)
    setUser(JSON.stringify(user));
    setSession(serviceToken);

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (
    password,
    nombre_usuario,
    apellidos_usuario,
    googleid,
    useremail,
    userimg,
    username,
    telefono_usuario,
    documento_usuario,
    estado_usuario,
    tipo_usuario_id_tipo_usuario,
    proyecto_id_proyecto,
  ) => {
    // todo: this flow need to be recode as it not verified
    const id_usuario = chance.bb_pin();
    const response = await axios.post('https://encuesta-commerk.onrender.com/register', {
      id_usuario,
      nombre_usuario: nombre_usuario,
      apellidos_usuario: apellidos_usuario,
      googleid: googleid,
      useremail: useremail,
      userimg: userimg,
      username: username,
      telefono_usuario: telefono_usuario,
      documento_usuario: documento_usuario,
      estado_usuario: estado_usuario,
      tipo_usuario_id_tipo_usuario,
      proyecto_id_proyecto: proyecto_id_proyecto,
      password
    });
    let users = response.data;
    console.log("users", users)
    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      console.log("localUsers", localUsers)
      users = [
        ...JSON.parse(localUsers),
        {
          id_usuario,
          useremail,
          password,
          name: `${nombre_usuario} ${apellidos_usuario}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    localStorage.removeItem('users');
    setSession(null);
    setUser(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async () => { };

  const updateProfile = () => { };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
