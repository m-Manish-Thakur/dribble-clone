import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { userName, email, password } = await req.json();

  try {
    const exsitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exsitingUser) {
      return NextResponse.json({ msg: "Account with this email already exist!" }, { status: 400 });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const username = email.split("@")[0];

    const user = await prisma.user.create({
      data: {
        name: userName,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ msg: "Account Created! Please verify your email.", user }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ msg: "Server Error", error }, { status: 500 });
  }
}
