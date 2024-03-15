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

import React, {
  useState,
  useEffect,
  // useContext,
  // useRef
} from 'react';

import { useLocation } from 'react-router-dom';

const Forms = () => {

  const location = useLocation();
  console.log("location", location);

  const [cliente, setCliente] = useState();

  useEffect(() => {
    if (location && location.state) {
      setCliente(location.state.val);
    }
  }, [location , location.state]);

  console.log("cliente", cliente);

  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
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
            <Form>

              <FormGroup>
                <Label for="exampleSelect"> <b>1. Su nivel de satisfacción frente a la atención del vendedor para dar respuesta a sus necesidades es:</b></Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option value={1-1}>a. Altamente satisfecho: me visitan o hacen seguimiento frecuente para atender mis pedidos.</option>
                  <option>  b. Satisfecho: atienden mis solicitudes de pedido cuando lo requiero.</option>
                  <option>c. Insatisfecho: debo insistir varias veces para que tengan en cuenta mis solicitudes de producto.</option>
                  <option>d. Muy insatisfecho: mis pedidos no eran atendidos, las compras ya no las realizo con COMMERK S.A.S.</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect"> <b>2. La entrega del producto se hace generalmente:</b></Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option value={1-1}>a. Antes de lo acordado.</option>
                  <option>b. En los tiempos acordados.</option>
                  <option>c. Ocasionalmente se retrasan.</option>
                  <option>d. Siempre se retrasan.</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect"><b>3. ¿Considera usted que la calidad de la información sobre nuestros productos es?</b> </Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option value={1-1}>a. Excelente: Siempre la información es clara y concisa; me permite tener mayor conocimiento.</option>
                  <option>b. Buena: En la mayor parte es clara y concisa.</option>
                  <option>c. Regular: En ocasiones es ambigua la información.</option>
                  <option>d. Mala: No tiene calidad la información.</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect"> <b>4. De manera general califique su experiencia durante el tiempo que ha sido cliente de Commerk:</b></Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option value={1-1}>a. Excelente.</option>
                  <option>b. Buena.</option>
                  <option>c. Regular.</option>
                  <option>d. Mala.</option>
                </Input>
              </FormGroup>

             
              <FormGroup>
                <Label for="exampleText"><b>En este espacio permítenos conocer tus observaciones, recomendaciones para la mejora o felicitaciones.</b> </Label>
                <Input id="exampleText" name="text" type="textarea" />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail"> <b>Encuestador</b></Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="nombre del encuestador"
                  type="text"
                />
              </FormGroup>

              {/* <FormGroup check className="form-label">
                <Input type="checkbox" /> <Label check>Check me out</Label>
              </FormGroup> */}
              
              <Button className="mt-2">Guardar encuesta</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
