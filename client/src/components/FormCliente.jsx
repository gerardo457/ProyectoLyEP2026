import '../css/formcliente.css'
import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import clientesService from "../services/clientesService";

const FormCliente = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [errores, setErrores] = useState({});

    const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[0-9]{8,15}$/;

    if (!nombre.trim()) {
        nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!email.trim()) {
        nuevosErrores.email = "El email es obligatorio.";
    } else if (!regexEmail.test(email.trim())) {
        nuevosErrores.email = "Ingrese un correo electrónico válido.";
    }

    if (!telefono.trim()) {
        nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!regexTelefono.test(telefono.trim())) {
        nuevosErrores.telefono = "El teléfono debe contener solo números (mínimo 8 dígitos).";
    }

    if (!ciudad.trim()) {
        nuevosErrores.ciudad = "La ciudad es obligatoria.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0 && Object.keys(errores).length >= 0;
    };

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        if (!validarFormulario()){
            return;
        } 

        const nuevoCliente = {
            email: email.trim(),
            name: {
                firstname: nombre.trim(),
                lastname: "-"
            },
            address: {
                city: ciudad.trim()
            },
            phone: telefono.trim()
        };

    try {
            setLoading(true);

            const respuesta = await clientesService.crearCliente(nuevoCliente);

            setMensaje(`Cliente creado correctamente. ID: ${respuesta.id}`);

            setNombre("");
            setEmail("");
            setTelefono("");
            setCiudad("");
            
            setErrores({});
        } catch {
            setError("Ocurrió un error al crear el cliente.");
        } finally {
            setLoading(false);
        }
    };    

    return (

        <div className='formulario-cliente'>

            <h3>Nuevo Cliente</h3>

        <Form onSubmit={manejarSubmit}>

            <Form.Group className="mb-3" controlId="formClienteNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    value={nombre}
                    isInvalid={!!errores.nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClienteEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    isInvalid={!!errores.email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClienteTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    type="text"
                    value={telefono}
                    isInvalid={!!errores.telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.telefono}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClienteCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                    type="text"
                    value={ciudad}
                    isInvalid={!!errores.ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.ciudad}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                disabled={loading}
            >
                {loading ? <Spinner size="sm" /> : "Guardar Cliente"}
            </Button>
        </Form>
           
            {
                mensaje &&
                <Alert
                    className="mt-3"
                    variant="success"
                >
                    {mensaje}
                </Alert>
            }

            {
                error &&
                <Alert
                    className="mt-3"
                    variant="danger"
                >
                    {error}
                </Alert>
            }

        </div>

    );
};

export default FormCliente;