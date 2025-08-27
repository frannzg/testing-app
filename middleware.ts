import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

// Rutas protegidas, aquí añadiremos las rutas donde el usuario deberá estar logeado.
const protectedRoutes = [
    "/dashboard",
    "/profile"
]

export const config = {
  runtime: "nodejs", // forzamos Node.js runtime en lugar de edge para poder utilizar jsonwebtoken con normalidad
}

export function middleware(req: NextRequest){
    const { pathname } = req.nextUrl

    // Si la ruta es pública y no necesita de estar autenticado, dejamos pasar
    if(!protectedRoutes.some(route => pathname.startsWith(route))){
        return NextResponse.next()
    }

    // Obtenemos el token de la cookie token
    const token = req.cookies.get("token")?.value

    // En caso de que el usuario no tenga token, no lo dejamos pasar y lo redirigimos al login de nuevo
    if(!token){
        return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
        // Verificamos que el token sea correcto utilizando como primer parámetro el token y como segundo parámetro nuestra palabra secreta la cual hemos creado en el .env
        jwt.verify(token, process.env.NEXTAUTH_SECRET || "#StringApiKey2025CocheRojoZebraAguacate#")
        // Si todo es correcto accederemos donde toque
        return NextResponse.next()
    } catch(error){
        // Si el token es invalido devolvemos a login
        console.error("JWT inválido:", error)
        return NextResponse.redirect(new URL("/login", req.url))
    }
}