import ProjectTables from "../../components/dashboard/ProjectTableEncuestados";
import { Row, Col,
  //  Table, Card, CardTitle, CardBody
   } from "reactstrap";

const Tables = () => {
  return (
    <Row>
      <Col lg="12">
        <ProjectTables />
      </Col>
    </Row>
  );
};

export default Tables;