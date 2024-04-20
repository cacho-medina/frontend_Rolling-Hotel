import { Modal, Button } from "react-bootstrap";

function ModalConfirmacion(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="text-center"
                >
                    Confirmar datos de reserva
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-1 px-md-2">
                <p>Nombre de hueped:{props.data.nombreHuesped}</p>
                <p>cantidad de personas: {props.data.personas}</p>
                <p>habitacion: {props.data.numeroHab}</p>
                <p>entrada: {props.data.ingreso}</p>
                <p>salida: {props.data.salida}</p>
                <p>informacion:{props.data.informacion}</p>
                <p className="fw-bold text-center">
                    monto total: $ {props.data.monto}
                    <small>(pesos argentinos)</small>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger">
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmacion;
