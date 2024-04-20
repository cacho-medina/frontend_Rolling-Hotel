import { Routes, Route } from "react-router-dom";
import DashCliente from "../pages/dashboard/DashCliente";
import MisReservas from "../pages/dashboard/MisReservas";
import Error from "../pages/Error";
import Cargar from "../pages/admin/reserva/Cargar";

function ClientRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DashCliente />}></Route>
                <Route path="/mis-reservas" element={<MisReservas />}></Route>
                <Route path="/registrar-reserva" element={<Cargar />}></Route>
                <Route path="/*" element={<Error />}></Route>
            </Routes>
        </>
    );
}

export default ClientRoutes;
