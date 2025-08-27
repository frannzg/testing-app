"use client"
import { useState } from "react"

export default function RegisterPage(){
    const [msg, setMsg] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const dni = formData.get("dni") as string
        const name = formData.get("name") as string
        const surnames = formData.get("surnames") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({dni, name, surnames, email, password}),
        })

        const data = await res.json()
        setMsg(data.message || data.error)
    }

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
            <h1>Registro de Usuarios</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input name="dni" placeholder="DNI" required />
                <input name="name" placeholder="Nombre" required />
                <input name="surnames" placeholder="Apellidos" required />
                <input name="email" placeholder="Email" required />
                <input name="password" placeholder="Contraseña" required />
                <button type="submit">Registrarse</button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    )
}