import { getReservasByUserId } from "../../helpers/queries.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function MisReservas() {
    const user = JSON.parse(sessionStorage.getItem("usuario")).id;
    const [reservas, setReservas] = useState([]);
    const obtenerReservas = async (id) => {
        const reservas = await getReservasByUserId(id);
        setReservas(reservas);
    };
    useEffect(() => {
        obtenerReservas(user);
    }, []);

    return (
        <div className="grow">
            <div className="bg-outline-special-blue py-5">
                <h1 className="display-1 text-center title text-special-blue">
                    Mis Reservas
                </h1>
            </div>
            <div className="py-5 px-1 d-flex flex-column flex-md-row flex-wrap justify-content-center align-items-center gap-3">
                {!reservas?.length ? (
                    <div className="col-12 col-md-5 px-2 rounded py-5 bg-danger d-flex flex-column align-items-center p-2">
                        <p className="text-light fw-bold fs-3">
                            No tienes reservas registradas
                        </p>
                    </div>
                ) : (
                    <>
                        {reservas.map((reserva) => {
                            return (
                                <div
                                    key={reserva._id}
                                    className="col-12 col-md-5 px-2 rounded py-5 bg-outline-special-blue d-flex flex-column align-items-center p-2 text-special-blue"
                                >
                                    <p className="fw-bold fs-5 text-center">
                                        Reserva habitacion {reserva.numeroHab}
                                    </p>
                                    <p className="fw-bold">
                                        {reserva.nombreHuesped}
                                    </p>
                                    <p className="fw-bold">
                                        {reserva.ingreso}{" "}
                                        <span>
                                            <FaArrowRightLong />
                                        </span>{" "}
                                        {reserva.salida}
                                    </p>
                                    <small className="fw-bold">
                                        ${reserva.monto}
                                    </small>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            <div className="bg-light px-2 py-5 p-md-5 d-flex flex-column justify-content-center text-center gap-4 flex-md-row justify-content-md-evenly">
                <h2 className="fw-bold m-0 text-special-blue fs-3">
                    Queres hacer otra reserva?
                </h2>
                <Link
                    to="/panel/registrar-reserva"
                    className="btn w-250 mx-auto mx-md-0 btn-outline-blue rounded-0 fw-bold fs-20"
                >
                    Reservar
                </Link>
            </div>
        </div>
    );
}

export default MisReservas;
