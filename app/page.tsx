"use client"

export default function HomePage() {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>Bienvenido a la página pública 🌟</h1>
      <p>Esta página puede verla cualquier usuario, incluso si no está logeado.</p>
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column"}}>
        <div style={{ backgroundColor: "blue", color: "white", fontWeight: 600, padding: "1rem" }}>
          <a href="/dashboard">Ir al Dashboard (privado)</a>
        </div>
        <div style={{ backgroundColor: "red", color: "white", fontWeight: 600, padding: "1rem" }}>
          <a href="/login">Ir al Login (publico)</a>
        </div>
      </div>
    </div>
  )
}