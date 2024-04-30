import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { check, postReserva, calcularMonto } from "../../../helpers/queries";
import Swal from "sweetalert2";
import ModalConfirmacion from "./ModalConfirmacion";
import { useNavigate } from "react-router-dom";

function Cargar() {
    const [disponibles, setDisponibles] = useState([]);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [monto, setMonto] = useState(0);
    const [reserva, setReserva] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm();

    async function chequearDisponibilidad() {
        const personas = getValues("personas");
        const ingreso = getValues("ingreso");
        const salida = getValues("salida");
        const habDis = await check(parseInt(personas), ingreso, salida);
        setDisponibles(habDis);
    }

    const onSubmit = async (data) => {
        data.userId = JSON.parse(sessionStorage.getItem("usuario")).id;
        const habitacion = getValues("numeroHab");
        const montoFinal = calcularMonto(
            data.ingreso,
            data.salida,
            parseInt(habitacion),
            disponibles
        );
        setMonto(montoFinal);
        data.monto = montoFinal;
        setReserva(data);
        Swal.fire({
            title: "Deseas finalizar la reserva?",
            icon: "warning",
            showCancelButton: true,
            background: "#1c1c21",
            color: "#fff",
            confirmButtonColor: "#534ff2",
            cancelButtonColor: "#d33",
            confirmButtonText: "Finalizar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setModalShow(true);
                const res = await postReserva(data);
                if (!res.ok) {
                    Swal.fire({
                        title: "Error",
                        text: "Algo salio mal post!",
                        icon: "error",
                        background: "#1c1c21",
                        color: "#fff",
                    });
                    const error = await res.json();
                    console.log(error);
                } else {
                    Swal.fire({
                        title: "Listo!",
                        text: "La reserva fue cargada con exito!",
                        icon: "success",
                        background: "#1c1c21",
                        color: "#fff",
                    });
                    reset();
                    navigate("/panel");
                }
            }
        });
    };

    return (
        <>
            <ModalConfirmacion
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={reserva}
                monto={monto}
            />
            <div className="grow container py-5">
                <h1 className="display-1 fw-bold text-center">
                    Registrar reserva
                </h1>
                <div className="px-2 px-md-5 py-4">
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="d-flex flex-column py-3"
                    >
                        <Form.Group controlId="personas" className="mb-4">
                            <Form.Label className="fw-bold">
                                Cantidad de personas
                            </Form.Label>
                            <Form.Select
                                {...register("personas", {
                                    required: "ingrese la cantidad de personas",
                                })}
                            >
                                <option value="">Seleccione una opcion</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            {errors.personas && (
                                <Form.Text className="text-danger">
                                    {errors.personas.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div>
                            <Form.Group controlId="ingreso" className="mb-4">
                                <Form.Label className="fw-bold">
                                    Fecha de entrada
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register("ingreso", {
                                        required:
                                            "Ingrese una fecha de entrada",
                                    })}
                                ></Form.Control>
                                {errors.ingreso && (
                                    <Form.Text className="text-danger">
                                        {errors.ingreso.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group controlId="salida" className="mb-4">
                                <Form.Label className="fw-bold">
                                    Fecha de salida
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register("salida", {
                                        required: "Ingrese una fecha de salida",
                                    })}
                                ></Form.Control>
                                {errors.salida && (
                                    <Form.Text className="text-danger">
                                        {errors.salida.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>
                        <div className="mb-4 align-self-center">
                            <Button
                                variant="secondary"
                                onClick={chequearDisponibilidad}
                            >
                                Buscar habitacion
                            </Button>
                        </div>
                        <hr />
                        <Form.Group controlId="habitacion" className="mb-4">
                            <Form.Label className="fw-bold">
                                Habitaciones disponibles
                            </Form.Label>
                            <Form.Select
                                {...register("numeroHab", {
                                    required: "seleccione una habitacion",
                                })}
                            >
                                {!disponibles?.length ? (
                                    <option value="">
                                        No hay habitaciones disponibles
                                    </option>
                                ) : (
                                    <>
                                        <option value="">
                                            Seleccione una opcion
                                        </option>
                                        {disponibles?.map((item) => {
                                            return (
                                                <option
                                                    key={item._id}
                                                    value={item.numero}
                                                >
                                                    {item.numero}
                                                </option>
                                            );
                                        })}
                                    </>
                                )}
                            </Form.Select>
                            {errors.numeroHab && (
                                <Form.Text className="text-danger">
                                    {errors.numeroHab.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="informacion" className="mb-4">
                            <Form.Label className="fw-bold">
                                Agregue informacion adicional
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="opcional"
                                {...register("informacion")}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="nombreHuesped" className="mb-4">
                            <Form.Label className="fw-bold">
                                Nombre Huesped
                            </Form.Label>
                            <Form.Control
                                {...register("nombreHuesped")}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="btn-dark rounded-0 w-250 align-self-center fw-bold"
                        >
                            Reservar
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Cargar;
