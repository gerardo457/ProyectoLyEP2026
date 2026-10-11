import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAutorizaciones from "../hooks/useAutorizaciones";
import ClientesService from "../services/ClientesService";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAutorizaciones();
  const role = admin?.sector;

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    ClientesService.obtenerClientePorId(id)
      .then((data) => setCliente(data))
      .catch(() => setMensaje("Error al obtener los datos del cliente"));
  }, [id]);

  const eliminarCliente = async () => {
    try {
      await ClientesService.eliminarCliente(id);
      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch (error) {
      setMensaje("Error al eliminar cliente");
    }
  };

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className='mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente._id || cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong> {cliente.nombre}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.telefono}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.ciudad}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar' onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;