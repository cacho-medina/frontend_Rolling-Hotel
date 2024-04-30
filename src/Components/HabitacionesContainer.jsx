import { Link } from "react-router-dom";

function HabitacionesContainer({ habitaciones }) {
    return (
        <div className="container py-4 d-flex flex-column gap-4 gap-md-5 py-md-5">
            {habitaciones.map((item) => {
                return (
                    <div
                        key={item._id}
                        className="d-flex flex-column flex-md-row border shadow"
                    >
                        <div>
                            <img
                                src={item.imagen}
                                alt={`foto de habitacion ${item.numero}`}
                                className="img-fluid h-350 object-fit-cover"
                            />
                        </div>
                        <div className="text-center py-4 align-self-center mx-auto">
                            <h3 className="fw-bold fs-1">
                                Habitacion {item.numero}
                            </h3>
                            <p className="fw-bold fs-3">$ {item.precio}</p>
                            <Link
                                to={`/habitaciones/${item._id}`}
                                className="btn btn-beige rounded-0 fw-bold"
                            >
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HabitacionesContainer;
