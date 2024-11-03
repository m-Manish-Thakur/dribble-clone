import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const isNumericId = !isNaN(parseInt(id));

    const data = await prisma.user.findMany({
      where: isNumericId
        ? { id: parseInt(id) } // Search by numeric ID if `id` is a number
        : {
            username: id,
          },
      include: {
        profile: true,
      },
    });

    if (data.length === 0) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { name, icon, location, bio, websiteUrl } = await req.json();
  const { id } = params;
  try {
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        image: icon,
      },
    });

    // Upsert profile information
    await prisma.profile.upsert({
      where: {
        userId: parseInt(id),
      },
      update: {
        bio,
        location,
        websiteUrl,
      },
      create: {
        userId: parseInt(id),
        bio,
        location,
        websiteUrl,
      },
    });

    return NextResponse.json({ msg: "User Info Updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Server Error", error }, { status: 500 });
  }
}
