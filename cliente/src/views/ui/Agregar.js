import {
    Button,
    // ButtonGroup,
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
// import Grid from "@mui/material/Grid";
import React, {
    useState,
    // useEffect,
    // useContext,
    // useRef
} from 'react';

import * as XLSX from 'xlsx/xlsx.mjs';

const EXTENSIONS = ['xlsx', 'xls', 'csv']

const Agregar = () => {

    const [clientes, setClientes] = useState();

    const getExention = (file) => {
        const parts = file.name.split('.')
        const extension = parts[parts.length - 1]
        return EXTENSIONS.includes(extension) // return boolean
    }

    const convertToJson = (headers, data) => {
        const rows = []
        data.forEach(row => {
            let rowData = {}
            row.forEach((element, index) => {
                rowData[headers[index]] = element
            })
            rows.push(rowData)
        });
        return rows
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const importExcel = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
            const bstr = event.target.result
            const workBook = XLSX.read(bstr, { type: "binary" })
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
            console.log(fileData)
            const headers = fileData[0]
            fileData.splice(0, 1)
            const dataUsers = convertToJson(headers, fileData)
            const users = [];
            if (dataUsers.length > 0) {
                for (let i = 0; i < dataUsers.length; i++) {
                    const Telefono = dataUsers[i].Telefono;
                    dataUsers[i].telefono = String(dataUsers[i].Telefono);
                    if (Telefono) {
                        users.push(dataUsers[i])
                    }
                }
                // dispatch(addUserList(dataUsers));
                setClientes(dataUsers)
                // console.log(" users ", users)
                console.log("dataUsers ", dataUsers)
            }
            // console.log("convertToJson(headers, fileData) ", convertToJson(headers, fileData))
        }

        if (file) {
            if (getExention(file)) {
                reader.readAsBinaryString(file)
            }
            else {
                alert("Invalid file input, Select Excel, CSV file")
            }
        }
    }

    console.log("clientes ", clientes)

    return (

        <Row>

            <Col xs="6" md="12">
                {/* --------------------------------------------------------------------------------*/}
                {/* Card-5*/}
                {/* --------------------------------------------------------------------------------*/}
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        Importar Clientes
                    </CardTitle>
                    <CardBody className="">
                        <div className="button-group">
                            <label>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={importExcel}
                                    ref={hiddenFileInput}
                                />
                                <Button className="btn" color="secondary" size="lg" block
                                    onClick={handleClick}
                                    variant="contained"
                                >
                                    {'Importar Clientes'}
                                </Button>

                                <Button className="btn" color="secondary" size="lg" block>
                                    Guardar Clientes
                                </Button>
                            </label>
                        </div>

                    </CardBody>
                </Card>
            </Col>

        </Row>


    );
};

export default Agregar;
