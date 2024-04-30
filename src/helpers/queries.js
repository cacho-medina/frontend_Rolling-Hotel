const api_usuarios = import.meta.env.VITE_API_USUARIOS;
const api_habitaciones = import.meta.env.VITE_API_HABITACIONES;
const api_reservas = import.meta.env.VITE_API_RESERVAS;

export const getHabitaciones = async () => {
    try {
        const res = await fetch(api_habitaciones);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const confirmarLibre = async (nro) => {
    const res = await getHabitaciones();
    const habitaciones = await res.json();
    const hab = habitaciones.filter((item) => item?.numero === parseInt(nro));
    if (!hab.length) {
        return true;
    } else {
        return false;
    }
};

export const getHabitacionById = async (id) => {
    try {
        const res = await fetch(`${api_habitaciones}/${id}`);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const postHabitacion = async (data) => {
    try {
        const res = await fetch(api_habitaciones, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const putHabitacion = async (data, id) => {
    try {
        const res = await fetch(`${api_habitaciones}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const deleteHabitacion = async (id) => {
    try {
        const res = await fetch(`${api_habitaciones}/${id}`, {
            method: "DELETE",
            headers: {
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const getUsuarios = async () => {
    try {
        const res = await fetch(api_usuarios);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const getUsuarioById = async (id) => {
    try {
        const res = await fetch(`${api_usuarios}/${id}`);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const deleteUsuario = async (id) => {
    try {
        const res = await fetch(`${api_usuarios}/${id}`, {
            method: "DELETE",
            headers: {
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const putUsuario = async (data, id) => {
    try {
        const res = await fetch(`${api_usuarios}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const registrarUsuario = async (data) => {
    try {
        const res = await fetch(api_usuarios, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const getReservas = async () => {
    try {
        const res = await fetch(api_reservas);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const getReservasById = async (id) => {
    try {
        const res = await fetch(`${api_reservas}/${id}`);
        return res;
    } catch (error) {
        console.error(error);
    }
};
export const getReservasByUserId = async (id) => {
    try {
        const res = await getReservas();
        const reservas = await res.json();
        const userReservas = reservas.filter((item) => item.userId === id);
        return userReservas;
    } catch (error) {
        console.error(error);
    }
};

export const deleteReserva = async (id) => {
    try {
        const res = await fetch(`${api_reservas}/${id}`, {
            method: "DELETE",
            headers: {
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const postReserva = async (data) => {
    try {
        const res = await fetch(api_reservas, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-token": JSON.parse(sessionStorage.getItem("usuario")).token,
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        console.error(error);
        return error;
    }
};

function verificarRangoFechas(reservaIngreso, reservaSalida, ingreso, salida) {
    const superposicionParcial =
        reservaSalida >= ingreso && reservaIngreso <= salida;

    const contenidoCompleto =
        reservaIngreso <= ingreso && reservaSalida >= salida;

    return superposicionParcial || contenidoCompleto;
}

async function obtenerHabitacionesCorrectas(personas) {
    const res = await getHabitaciones();
    const data = await res.json();
    return data.filter((item) => item.activa && item.personas === personas);
}

function verificarFechas(entrada, salida) {
    const hoy = new Date();
    const entradaReserva = new Date(entrada);
    const salidaReserva = new Date(salida);
    if (entradaReserva < hoy)
        throw new Error(
            "La fecha de entrada no puede ser anterior a la fecha actual"
        );
    if (salidaReserva <= entradaReserva)
        throw new Error(
            "La fecha de salida debe ser posterior a la fecha de entrada"
        );
}

function filtrarHabitacionesOcupadas(reservas, habitaciones, entrada, salida) {
    const ocupadas = [];
    for (const reserva of reservas) {
        for (const hab of habitaciones) {
            if (
                reserva.numeroHab === hab.numero &&
                verificarRangoFechas(
                    reserva.ingreso,
                    reserva.salida,
                    entrada,
                    salida
                )
            ) {
                ocupadas.push(hab.numero);
            }
        }
    }
    return ocupadas;
}

export const check = async (personas, entrada, salida) => {
    try {
        const habitacionesDisponibles = await obtenerHabitacionesCorrectas(
            personas
        );
        verificarFechas(entrada, salida);
        const res = await getReservas();
        const reservas = await res.json();
        if (reservas.length === 0) return habitacionesDisponibles;
        const ocupadas = filtrarHabitacionesOcupadas(
            reservas,
            habitacionesDisponibles,
            entrada,
            salida
        );
        return habitacionesDisponibles.filter(
            (hab) => !ocupadas.includes(hab.numero)
        );
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const calcularMonto = (entrada, salida, habitacion, disponibles) => {
    const ingresoReserva = new Date(entrada);
    const salidaReserva = new Date(salida);
    const diferenciaMilisegundos =
        salidaReserva.getTime() - ingresoReserva.getTime();

    const dias = diferenciaMilisegundos / (1000 * 3600 * 24);

    const cantidadDias = Math.ceil(dias);
    const precioHab = disponibles.find((item) => item.numero === habitacion);

    return precioHab.precio * cantidadDias;
};
