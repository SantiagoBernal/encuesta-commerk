import {
  Card, CardBody, CardTitle, CardSubtitle, Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import React, {
  useState,
  useEffect,
  // useContext,
  // useRef
} from 'react';
// import { Link } from 'react-router'
import {
  //  BrowserRouter, Route ,Switch,
  useNavigate
} from 'react-router-dom'
// import { useHistory } from "react-router-dom";


import axios from 'axios';



const ProjectTables = (props) => {

  const [clientes, setClientes] = useState();
  const navigate = useNavigate();

  const pageSize = 5;
  const [newsState, setNewsState] = useState([]);
  const [currentState, setCurrentState] = useState(0);
  const [pageState, setPageState] = useState(0);

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };


  const getTask = () => {
    axios.get(`http://localhost:5000/cliente/lista`)
      .then((response) => {
        if (response.data) {
          setClientes(response.data)
        }
      })
  }

  useEffect(() => {
    getTask();
  }, [])

  const deleteData = (val) => {
    navigate('/encuesta', { state: { val: val } });
    console.log("val", val)
  }

  useEffect(() => {
    setNewsState(clientes);
    if (clientes && clientes.length > 0) {
      setPageState(Math.ceil(clientes?.length / pageSize));
    }
  }, [clientes]);
  console.log("newsState", newsState);

  console.log(clientes);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Lista de clientes</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Seleccione un cliente para realizar encuesta
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Correos</th>
                <th>Móvil</th>
                <th>Telefono 1</th>
                <th>Telefono 2</th>
                <th>Grupo</th>
                <th>Estado</th>
                <th>Acción</th>
                {/* <th>Budget</th> */}
              </tr>
            </thead>

            <tbody>
              {clientes
                ?.slice(currentState * pageSize, (currentState + 1) * pageSize)
                ?.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.nombre_sn}</h6>
                          <span className="text-muted">{tdata.codigo_sn}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.correo_electronico}</h6>
                          <span className="text-muted">{tdata.correo_recepcion}</span>
                        </div>
                      </div>
                    </td>
                    <td>{tdata.telefono_movil}</td>
                    <td>{tdata.telefono_1}</td>
                    <td>{tdata.telefono_2}</td>
                    <td>{tdata.nombre_grupo}</td>
                    <td>
                      {tdata.estado_encuesta === false ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : tdata.estado_encuesta === true ? (
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                    <td>
                      <button onClick={() => deleteData(tdata)} href={`/forms`}>
                        {"Encuestar"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

            <Pagination aria-label="pagination">
              <PaginationItem disabled={currentState <= 0}>
                <PaginationLink
                  onClick={e => handlePagination(e, currentState - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>

              {[...Array(pageState)].map((page, i) => (
                <PaginationItem active={i === currentState} key={i}>
                  <PaginationLink onClick={e => handlePagination(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentState >= pageState - 1}>
                <PaginationLink
                  onClick={e => handlePagination(e, currentState + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>

          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
