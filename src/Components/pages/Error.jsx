import { Link } from "react-router-dom";
import error from "../../assets/error.svg";

function Error() {
    return (
        <div className="padding-section">
            <div className="d-flex flex-column justify-content-center align-items-center gap-4 flex-md-row">
                <div>
                    <h1 className="display-1 fw-bold mt-3 text-danger fs-32">
                        404
                    </h1>
                    <p className="fs-20 fw-medium">
                        Ooops... La pagina que buscas parece que no existe
                    </p>
                    <Link
                        className="btn btn-danger px-5 py-2 mt-3 rounded-0 fs-20"
                        to="/"
                    >
                        Volver a home
                    </Link>
                </div>
                <div>
                    <img
                        src={error}
                        alt="imagen de error"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
}

export default Error;
