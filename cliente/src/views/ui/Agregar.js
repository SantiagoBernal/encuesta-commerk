
import {
    // Button,
    // ButtonGroup,
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import Button from '@mui/material/Button';
// import Grid from "@mui/material/Grid";
import React, {
    useState,
    useEffect,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as XLSX from 'xlsx/xlsx.mjs';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
}));


const EXTENSIONS = ['xlsx', 'xls', 'csv']


const Agregar = () => {

    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [clientesListos, setClientesListos] = useState();
    const [response, setResponse] = useState();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');



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
            //console.log(fileData)
            const headers = fileData[0]
            fileData.splice(0, 1)
            const dataUsers = convertToJson(headers, fileData)
            const users = [];
            if (dataUsers.length > 0) {
                for (let i = 0; i < dataUsers.length; i++) {
                    if (!dataUsers[i].telefono_1) {
                        dataUsers[i].telefono_1 = "0";
                    }
                    if (!dataUsers[i].telefono_2) {
                        dataUsers[i].telefono_2 = "0";
                    }
                    const estado_encuesta = false;
                    dataUsers[i].estado_encuesta = estado_encuesta;
                    users.push(dataUsers[i])
                }
                setClientes(dataUsers)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let i = 0; i < clientes.length; i++) {
            try {
                const response = await axios.post("http://localhost:5000/cliente/nuevo", clientes[i]);
                //console.log("Post created:", response);
                if (response.status === 200) {
                    //console.log("cliente guardado");
                    setAlertContent(response.data.result);
                    setAlert(true);
                    setClientes([]);
                    //console.log("response.data", response.config.data);
                }
            } catch (error) {
                console.error("Error creating post:", error);
            }
        }

    };

    //console.log("clientes ", clientes)

    return (
        <Row>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Div>{clientes && clientes.length > 0 ? "Se cargaron " : "Cargar "} <b>  {clientes && clientes.length > 0 ? clientes.length : ""}  </b>  {" Clientes"}</Div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Seleccione un archivo de Excel para cargar los clientes.
                    </Typography>
                </CardContent>
                <CardActions>
                    <div className="button-group">
                        <label>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={importExcel}
                                ref={hiddenFileInput}
                            />

                            <Stack alignContent="contained" direction="row" spacing={5}>
                                <Button onClick={handleClick}
                                    variant="outlined" size="large" startIcon={<FileUploadIcon />}>
                                    Cargar
                                </Button>
                                <Button onClick={handleSubmit}
                                    variant="contained" size="large" endIcon={<SaveIcon />}>
                                    Guardar
                                </Button>
                            </Stack>



                        </label>
                    </div>
                </CardActions>
                {alert ?
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">
                            <AlertTitle>Exito!</AlertTitle>
                            Se guardaron los clientes correctamente.
                        </Alert>
                    </Stack>
                    : <></>}
            </Card>
        </Row>




    );
};

export default Agregar;
