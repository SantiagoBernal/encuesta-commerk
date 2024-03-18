import { Col, Row } from "reactstrap";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";

import React, {
  // useState,
  useEffect,
} from 'react';
import axios from 'axios';


const Starter = () => {

  const [total, setTotal] = React.useState([]);
  const [totalf, setTotalf] = React.useState([]);
  const [totalv, setTotalv] = React.useState([]);


  const fetchUserData = async () => {


    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/cliente/lista`,
    }).then((res) => {
      setTotal(res.data);
    });

    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/cliente/listaF`,
    }).then((res) => {
      setTotalf(res.data);
    });

    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/cliente/listaV`,
    }).then((res) => {
      setTotalv(res.data);
    });

  };

  useEffect(() => {
    fetchUserData();
  }, [])




  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="12" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Total Clientes"
            earning={total.length}
            icon="bi bi-journal-text"
          />
        </Col>
        <Col sm="12" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Encuestados"
            earning={totalv.length}
            icon="bi bi-journal-check"
          />
        </Col>
        <Col sm="12" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Sin Encuestar"
            earning={totalf.length}
            icon="bi bi-journal-x"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      {/* <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row> */}
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/***Blog Cards***/}
      {/* <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default Starter;
