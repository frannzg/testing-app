"use client" // Esto indica que el componente se renderiza en el cliente (browser)

// Importamos hooks de React para manejar estado y efectos
import { useEffect, useState } from "react"

export default function DashboardPage() {
    // Creamos un estado "message" que inicialmente dice "Cargando"
    // setMessage nos permite actualizar el valor del mensaje
    const [message, setMessage] = useState("Cargando")

    // useEffect se ejecuta después de que el componente se monta en la página
    // Aquí lo usamos para actualizar el mensaje de bienvenida
    useEffect(() => {
        setMessage("Bienvenido al Dashboard") // Actualizamos el estado
    }, []) // El array vacío [] significa que esto solo se ejecuta una vez al montar el componente

    // Función que se llama al hacer click en "Cerrar sesión"
    const handleLogout = async () => {
        // Llamamos al endpoint /api/logout para eliminar la cookie del token JWT
        await fetch("/api/logout", {
            method: "POST"
        })
        // Redirigimos al usuario a la página de login después de cerrar sesión
        window.location.href = "/login"
    }

    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            {/* Título de la página */}
            <h1>Dashboard</h1>

            {/* Mostramos el mensaje que depende del estado */}
            <p>{message}</p>

            {/* Botón para cerrar sesión */}
            <button onClick={handleLogout}>Cerrar sesión</button>

            {/* Enlace para volver a la página pública */}
            <p>
                <a href="/">Volver a la página pública</a>
            </p>
        </div>
    )
}