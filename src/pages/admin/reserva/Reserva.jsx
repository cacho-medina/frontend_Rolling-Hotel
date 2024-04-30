import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReservas } from "../../../helpers/queries";
import Item from "./Item";

function Reserva() {
    const [reservas, setReservas] = useState([]);
    const obtenerReservas = async () => {
        const res = await getReservas();
        if (res.ok) {
            const data = await res.json();
            setReservas(data);
        }
    };
    useEffect(() => {
        obtenerReservas();
    }, []);
    return (
        <>
            <div className="grow">
                <div className="bg-danger py-5">
                    <h1 className="display-1 text-light text-center title">
                        Reservas
                    </h1>
                </div>
                <div className="container px-1 py-4 px-md-4">
                    <div className="d-flex justify-content-center justify-content-md-start align-items-center">
                        <Link
                            to="/panel/registrar-reserva"
                            className="fw-bold btn btn-danger"
                        >
                            Nueva Reserva
                        </Link>
                    </div>
                    <hr />
                    <Table
                        hover
                        responsive
                        className="shadow overflow-x-hidden align-middle text-center"
                    >
                        <thead className="table-secondary">
                            <tr>
                                <th>habitacion</th>
                                <th>huesped</th>
                                <th>monto</th>
                                <th>detalles</th>
                                <th>opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!reservas.length ? (
                                <tr>
                                    <td colSpan={4} className="text-danger">
                                        No hay reservas registradas
                                    </td>
                                </tr>
                            ) : (
                                reservas.map((item) => {
                                    return (
                                        <Item
                                            reserva={item}
                                            key={item._id}
                                            setReservas={setReservas}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Reserva;
