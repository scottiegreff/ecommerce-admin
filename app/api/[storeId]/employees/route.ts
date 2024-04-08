import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, email, phone, hours, isActive } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!hours || !hours.length) {
      return new NextResponse("Date is required", { status: 400 });
    }

    if (!isActive) {
      return new NextResponse("Active is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const employee = await prismadb.employee.create({
      data: {
        name,
        email,
        phone,
        hours,
        // hours: {
        //   createMany: {
        //     data: [
        //       ...hours.map((hour: { day: string; open: string; close: string }) => hour),
        //     ],
        //   },
        // },
        // isActive,

        storeId: params.storeId,
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.log("[EMPLOYEES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const employees = await prismadb.employee.findMany({
      where: {
        storeId: params.storeId,
        name: {
          contains: searchParams.get("search") || "",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.log("[EMPLOYEES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}