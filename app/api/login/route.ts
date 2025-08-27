import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: Request){
    
    try {
        const { dni, password } = await req.json()

        if(!dni || !password) {
            return NextResponse.json({ error: "Los campos no pueden estar vacios" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: {
                dni
            }
        })

        if(!user){
            return NextResponse.json({ error: "El usuario no existe" }, { status: 400 })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 400 })
        }

        const token = jwt.sign(
            {id: user.id, dni: user.dni },
            process.env.NEXTAUTH_SECRET || "#StringApiKey2025CocheRojoZebraAguacate#"
        )

        return NextResponse.json({ message: "Login exitoso", token: token}, { status: 200 })

    } catch(error){
        return NextResponse.json({ error: "Error al hacer login "}, {status: 500})
    }
}