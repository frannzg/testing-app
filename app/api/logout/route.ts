import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const response = NextResponse.json({ message: "Logout exitoso ✅" })

  response.cookies.set({
    name: "token",
    value: "",       // valor vacío para la cookie
    path: "/",       // debe coincidir con la cookie de login
    maxAge: 0,       // fuerza la eliminación
  })

  return response
}