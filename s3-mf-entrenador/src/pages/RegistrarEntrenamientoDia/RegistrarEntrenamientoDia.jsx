import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroEntrenamientoDia() {
    const navigate = useNavigate();

    const [ejercicios, setEjercicios] = useState([
        { id: 1, nombre: "Remo en Maquina", imgSrc: "/1.png", repeticiones: 1, series: 1 },
        { id: 2, nombre: "Pull Ups", imgSrc: "/2.png", repeticiones: 1, series: 1 },
        { id: 3, nombre: "Face Pulls", imgSrc: "/3.png", repeticiones: 1, series: 1 }
    ]);

    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [NdiaSeleccionado, NsetDiaSeleccionado] = useState('');

    useEffect(() => {
        const NdiaGuardado = localStorage.getItem('NdiaSeleccionado');
        const diaGuardado = localStorage.getItem('diaSeleccionado');
        if (NdiaGuardado) {
            NsetDiaSeleccionado(NdiaGuardado);
        }
        if (diaGuardado) {
            setDiaSeleccionado(diaGuardado);
        }
    }, []);

    const handleRegresar = () => {
        navigate(-1);
    };

    const handleGuardar = () => {
        localStorage.setItem('ejercicios', JSON.stringify(ejercicios));
        localStorage.setItem('NdiaSeleccionado', NdiaSeleccionado);
        localStorage.setItem('diaSeleccionado', diaSeleccionado);
        navigate('/registro-entrenamiento');
        console.log("Entrenamiento guardado");
    };

    const handleGrupoMuscular = (e) => {
        console.log(`Grupo muscular seleccionado: ${e.target.value}`);
    };

    const updateEjercicio = (index, tipo, cambio) => {
        setEjercicios(prevEjercicios =>
            prevEjercicios.map((ejercicio, i) =>
                i === index
                    ? { ...ejercicio, [tipo]: Math.max(1, ejercicio[tipo] + cambio) }
                    : ejercicio
            )
        );
    };
    return (
        <div className="min-h-screen bg-[#f3f4f7] p-4 flex flex-col">
            <div className="flex flex-col mb-4">
                <div className="flex justify-between w-full mb-4">
                    <button
                        onClick={handleRegresar}
                        className="text-gray-700 text-lg flex items-center gap-2">
                        <span>&lt;</span> Regresar
                    </button>

                    <button
                        onClick={handleGuardar}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded">
                        GUARDAR
                    </button>
                </div>

                <div className="flex justify-start mb-6">
                    <select
                        onChange={handleGrupoMuscular}
                        className="p-2 rounded text-gray-700 bg-gray-200 text-lg border border-black-thin"
                    >
                        <option value="">Grupo muscular</option>
                        <option value="grupo1">Grupo muscular 2</option>
                        <option value="grupo2">Grupo muscular 3</option>
                    </select>
                </div>
            </div>

            <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-red-700 mb-2">
                    Registro de Entrenamiento
                </h2>
                <h3 className="text-lg text-center text-gray-700 mb-2">
                    Nombre del Alumno
                </h3>
                <p className="text-center text-red-700 font-bold mb-4">
                    {diaSeleccionado}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {ejercicios.map((ejercicio, index) => (
                    <div key={ejercicio.id} className="border p-4 rounded-lg bg-white shadow-md">
                        <div className="flex flex-col items-center">
                            <img
                                src={ejercicio.imgSrc}
                                alt={ejercicio.nombre}
                                className="w-full h-auto object-cover rounded mb-4"
                            />
                            <h4 className="text-lg font-bold text-red-700 mb-2">
                                {ejercicio.nombre}
                            </h4>
                            <div className="flex flex-col mb-4 text-[#4b4f57]">
                                <div className="flex items-center mb-2">
                                    <span className="w-24 text-left text-sm">Repeticiones:</span>
                                    <div className="flex items-center border border-black-thin rounded">
                                        <button
                                            onClick={() => updateEjercicio(index, 'repeticiones', -1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            &minus;
                                        </button>
                                        <input
                                            type="text"
                                            value={ejercicio.repeticiones}
                                            readOnly
                                            className="w-6 h-6 text-center bg-gray-300 border border-black-thin text-xs" />
                                        <button
                                            onClick={() => updateEjercicio(index, 'repeticiones', 1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-24 text-left text-sm">Series:</span>
                                    <div className="flex items-center border border-black-thin rounded">
                                        <button
                                            onClick={() => updateEjercicio(index, 'series', -1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            &minus;
                                        </button>
                                        <input
                                            type="text"
                                            value={ejercicio.series}
                                            readOnly
                                            className="w-6 h-6 text-center bg-gray-300 border border-black-thin text-xs" />
                                        <button
                                            onClick={() => updateEjercicio(index, 'series', 1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
