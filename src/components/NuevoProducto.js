import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { crearNuevoProdAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    //state del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);
    const alerta = useSelector( state => state.alerta.alerta );

    const agregarProducto = (producto) => dispatch( crearNuevoProdAction(producto) );

    const submitNuevoProducto = e => {
        e.preventDefault();

        //validar formulario
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }

        //si no hay errores
        dispatch( ocultarAlerta() );

        //crear producto
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar
        history.push('/');

    }
    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {alerta ? <p className= {alerta.classes}>{alerta.msg}</p> : null}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                ></input>
                            </div>
                            
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                ></input>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"    
                            >
                                Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;