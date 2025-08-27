"use client"
import { useState } from "react"

export default function LoginPage() {
  const [msg, setMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dni = formData.get("dni") as string
    const password = formData.get("password") as string

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni, password }),
    })

    const data = await res.json()
    if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=86400` // 1 día
        setMsg("Login exitoso ✅")
        window.location.href = "/dashboard"
    } else {
      setMsg(data.error)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="dni" placeholder="DNI" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar sesión</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}