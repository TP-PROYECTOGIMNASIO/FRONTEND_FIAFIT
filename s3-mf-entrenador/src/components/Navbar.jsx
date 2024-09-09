import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="min-h-[10vh] flex justify-between p-2" style={{ backgroundColor: "#FFFFFF" }}>
            <img src={"/logo-3.png"} alt="logo fia fit" className="w-[30vh] h-[10vh]" />
            <div className="flex flex-row items-center mr-4 gap-20">
                {/* Alumnos Check-in */}
                <div 
                    className="flex flex-col text-center cursor-pointer"
                    onClick={() => navigate('/check-in')}
                >
                    <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Alumnos</h1>
                    <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Check - in</h1>
                </div>

                {/* Lista de Alumnos */}
                <div 
                    className="flex flex-col text-center cursor-pointer"
                    onClick={() => navigate('/lista-alumnos')}
                >
                    <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Lista de</h1>
                    <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Alumnos</h1>
                </div>

                <img src={"/icono-user.png"} alt="icono usuario" className="border border-white rounded-full w-[8vh] h-[6vh]" />
            </div>
        </nav>
    );
}