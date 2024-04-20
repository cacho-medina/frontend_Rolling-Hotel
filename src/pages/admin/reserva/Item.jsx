import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Options from "../Options";
import { deleteReserva, getReservas } from "../../../helpers/queries";
import Swal from "sweetalert2";

function DetalleModal(props) {
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
                    className="text-center fw-bold"
                >
                    Detalles de reserva
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-1 px-md-2">
                <p>
                    <span className="fw-bold">*Huesped</span>:{" "}
                    {props.reserva.nombreHuesped}
                </p>
                <p>
                    <span className="fw-bold">*Habitacion</span>: numero{" "}
                    {props.reserva.numeroHab}
                </p>
                <p>
                    <span className="fw-bold">*Informacion</span>:{" "}
                    {props.reserva.informacion ||
                        "No hay informacion adicional"}
                </p>
                <p>
                    <span className="fw-bold">*Ingreso</span>:{" "}
                    {props.reserva.ingreso}
                </p>
                <p>
                    <span className="fw-bold">*Salida</span>:{" "}
                    {props.reserva.salida}
                </p>
                <p>
                    <span className="fw-bold">*Monto</span>: $
                    {props.reserva.monto}
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

function Item({ reserva, setReservas }) {
    const [modalShow, setModalShow] = useState(false);

    const borrarReserva = () => {
        Swal.fire({
            title: "Estas seguro de eliminar la reserva?",
            text: "Una vez hecho esto no se puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#b3c4c1",
            confirmButtonText: "Eliminar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteReserva(reserva._id);
                if (res.status === 200) {
                    Swal.fire({
                        title: "Reserva eliminada!",
                        text: `La reserva fue eliminada correctamente`,
                        icon: "success",
                    });
                    const res = await getReservas();
                    if (res.status === 200) {
                        const data = await res.json();
                        setReservas(data);
                    }
                } else {
                    Swal.fire({
                        title: "ERROR!",
                        text: `La reserva no se pudo eliminar`,
                        icon: "error",
                    });
                }
            }
        });
    };
    return (
        <>
            <DetalleModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                reserva={reserva}
            />
            <tr>
                <td>{reserva.numeroHab}</td>
                <td>{reserva.nombreHuesped}</td>
                <td>${reserva.monto}</td>
                <td>
                    <Button
                        variant=""
                        onClick={() => setModalShow(true)}
                        className="fw-medium text-decoration-underline"
                    >
                        Ver
                    </Button>
                </td>
                <td className="d-flex align-items-center justify-content-center gap-1">
                    <Options
                        type="reserva"
                        borrar={borrarReserva}
                        id={reserva._id}
                    />
                </td>
            </tr>
        </>
    );
}

export default Item;
