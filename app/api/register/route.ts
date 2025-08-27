import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from  "bcrypt"


export async function POST(req: Request) {
    try {
        const { dni, name, surnames, email, password } = await req.json()

        if (!dni || !name || !surnames || !email || !password){
            return NextResponse.json({ error: "Faltan datos a cumplimentar"}, { status: 400})
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { dni },
                    { email }
                ]
            }
        })

        if (existingUser){
            return NextResponse.json({ error: "El usuario ya existe"}, { status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                dni,
                name,
                surnames,
                email,
                password: hashedPassword,
            }
        })

        return NextResponse.json({ message: "Usuario creado con éxito", user: user }, { status: 201 })

    } catch (error ){
        return NextResponse.json({ error: "Error interno {error}" }, { status: 500 })
    }
}