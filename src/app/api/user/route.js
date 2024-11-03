import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await prisma.user.findMany({
      include: {
        posts: true,
        sessions: true,
        profile: true,
      },
    });

    console.log(data);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, email } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        posts: {
          create: [
            {
              title: "Portfolio design",
              content: "Lorem ipsum cspsibcbk hwb jcbcbjwehbcj weckewb chjcb kwecbhjew bckewcb ehjcjcbe cskbj.",
            },
          ],
        },
      },
    });

    return NextResponse.json({ msg: "User Created", user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Server Error", error }, { status: 500 });
  }
}
