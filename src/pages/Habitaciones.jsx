import Container from "react-bootstrap/Container";
import { getHabitaciones } from "../helpers/queries";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Suspense, lazy } from "react";

const HabitacionesContainer = lazy(() =>
    import("../Components/HabitacionesContainer")
);

function Habitaciones() {
    const [habitaciones, setHabitaciones] = useState([]);

    function comprobarActiva(array) {
        const disponible = array.filter((item) => item.activa === true);
        return disponible;
    }

    const obtenerHabitaciones = async () => {
        const res = await getHabitaciones();
        if (res.ok) {
            const data = await res.json();
            const activas = comprobarActiva(data);
            setHabitaciones(activas);
        } else {
            Swal.fire({
                title: "ERROR!",
                text: `error al obtener habitaciones!`,
                icon: "error",
            });
        }
    };
    useEffect(() => {
        obtenerHabitaciones();
    }, []);
    return (
        <Container fluid className="px-0 grow">
            <div className="bg-beige py-5">
                <h1 className="display-1 text-dark text-center title">
                    Habitaciones
                </h1>
            </div>
            <Suspense
                fallback={
                    <h2 className="fw-bold display-4 text-center">
                        Cargando Habitaciones...
                    </h2>
                }
            >
                <HabitacionesContainer habitaciones={habitaciones} />
            </Suspense>
        </Container>
    );
}

export default Habitaciones;
