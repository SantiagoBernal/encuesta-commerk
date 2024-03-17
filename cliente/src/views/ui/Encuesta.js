import {
  Card,
  Row,
  Col,
  CardTitle,
  CardText,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  CardSubtitle,
} from "reactstrap";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {
  //  BrowserRouter, Route ,Switch,
  useNavigate
} from 'react-router-dom'

import React, {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

import { useLocation } from 'react-router-dom';
const Forms = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const [cliente, setCliente] = useState();

  useEffect(() => {
    if (location && location.state) {
      setCliente(location.state.val);
    }
  }, [location, location.state]);

  //console.log("cliente", cliente);
  const [encuesta, setEncuesta] = useState({
    pregunta_1: "",
    pregunta_2: "",
    pregunta_3: "",
    pregunta_4: "",
    comentario: "",
    encuestador: "",
    id_cliente: location.state.val ? location.state.val.id_cliente : "",
  });
  //console.log("encuesta", encuesta);

  const handleChange = (e) => {
    //console.log("e.target.name", e.target.name);
    if (e.target.name) {
      setEncuesta({ ...encuesta, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/encuesta", encuesta);
      //console.log("Post created:", response.data);
      if (response.data) {
        confirmAlert({
          title: 'Encuesta',
          message: 'Encuesta guardada con éxito',
          buttons: [
            {
              label: 'Ok',
              onClick: () =>
                setTimeout(() => {
                  navigate('/seguimiento')
                }, 500)
            }
          ]
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Datos del cliente a encuestar
          </CardTitle>
          <Col md="12" lg="12">
            <Card body className="text-center">
              <CardTitle tag="h5">{location.state.val.nombre_sn}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {location.state.val.codigo_sn}
              </CardSubtitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {location.state.val.telefono_1}
              </CardSubtitle>
              <CardText tag="h6">
                {location.state.val.nombre_grupo}
              </CardText>
            </Card>
          </Col>




          <CardBody>
            <Form onSubmit={handleSubmit}>

              <FormGroup>
                <Label for="exampleSelect"> <b>1. Su nivel de satisfacción frente a la atención del vendedor para dar respuesta a sus necesidades es:</b></Label>
                <Input
                  value={encuesta.pregunta_1}
                  onChange={handleChange}
                  id="pregunta_1" name="pregunta_1" type="select">
                  <option>a. Altamente satisfecho: me visitan o hacen seguimiento frecuente para atender mis pedidos.</option>
                  <option>b. Satisfecho: atienden mis solicitudes de pedido cuando lo requiero.</option>
                  <option>c. Insatisfecho: debo insistir varias veces para que tengan en cuenta mis solicitudes de producto.</option>
                  <option>d. Muy insatisfecho: mis pedidos no eran atendidos, las compras ya no las realizo con COMMERK S.A.S.</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect"> <b>2. La entrega del producto se hace generalmente:</b></Label>
                <Input
                  value={encuesta.pregunta_2}
                  onChange={handleChange}
                  id="pregunta_2" name="pregunta_2" type="select">
                  <option>a. Antes de lo acordado.</option>
                  <option>b. En los tiempos acordados.</option>
                  <option>c. Ocasionalmente se retrasan.</option>
                  <option>d. Siempre se retrasan.</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect"><b>3. ¿Considera usted que la calidad de la información sobre nuestros productos es?</b> </Label>
                <Input
                  value={encuesta.pregunta_3}
                  onChange={handleChange}
                  id="pregunta_3"
                  name="pregunta_3" type="select">
                  <option>a. Excelente: Siempre la información es clara y concisa; me permite tener mayor conocimiento.</option>
                  <option>b. Buena: En la mayor parte es clara y concisa.</option>
                  <option>c. Regular: En ocasiones es ambigua la información.</option>
                  <option>d. Mala: No tiene calidad la información.</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect"> <b>4. De manera general califique su experiencia durante el tiempo que ha sido cliente de Commerk:</b></Label>
                <Input
                  value={encuesta.pregunta_4}
                  onChange={handleChange}
                  id="pregunta_4" name="pregunta_4" type="select">
                  <option>a. Excelente.</option>
                  <option>b. Buena.</option>
                  <option>c. Regular.</option>
                  <option>d. Mala.</option>
                </Input>
              </FormGroup>


              <FormGroup>
                <Label for="exampleText"><b>En este espacio permítenos conocer tus observaciones, recomendaciones para la mejora o felicitaciones.</b> </Label>
                <Input
                  value={encuesta.comentario}
                  onChange={handleChange}
                  id="comentario" name="comentario" type="textarea" />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail"> <b>Encuestador</b></Label>
                <Input
                  value={encuesta.encuestador}
                  onChange={handleChange}
                  id="encuestador"
                  name="encuestador"
                  placeholder="nombre del encuestador"
                  type="text"
                />
              </FormGroup>


              <Button className="mt-2"
                color="primary"
                type="submit"
              >
                Guardar encuesta</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
