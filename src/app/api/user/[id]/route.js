import { sendWelcomeEmail } from "@/lib/emailServices";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await sendWelcomeEmail("manish.thakur@dotix.io", "Manish Singh", "yun8cg37c3");

    const data = await prisma.user.findMany({
      where: { username: id },
      include: {
        profile: true,
      },
    });

    if (data?.length === 0) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
