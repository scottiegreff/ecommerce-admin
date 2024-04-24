import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { employeeId: string } }
) {
  try {
    if (!params.employeeId) {
      return new NextResponse("Employee id is required", { status: 400 });
    }

    const employee = await prismadb.employee.findUnique({
      where: {
        id: params.employeeId,
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.log("[EMPLOYEE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { employeeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.employeeId) {
      return new NextResponse("Employee id is required", { status: 400 });
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

    const employee = await prismadb.employee.delete({
      where: {
        id: params.employeeId,
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.log("[EMPLOYEE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { employeeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, email, phone, isActive, from, to, startTime, endTime } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.employeeId) {
      return new NextResponse("Employee id is required", { status: 400 });
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

    if (!isActive) {
      return new NextResponse("Active is required", { status: 400 });
    }

    if (!from) {
      return new NextResponse("From is required", { status: 400 });
    }

    if (!to) {
      return new NextResponse("To is required", { status: 400 });
    }

    if (!startTime) {
      return new NextResponse("Start time is required", { status: 400 });
    }

    if (!endTime) {
      return new NextResponse("End time is required", { status: 400 });
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

    await prismadb.employee.update({
      where: {
        id: params.employeeId,
      },
      data: {
        name,
        email,
        phone,
        isActive,
      },
    });
    // await prismadb.hour.update({
    //   where: {
    //     id: params.employeeId,
    //   },
    //   data: {
    //     from,
    //     to,
    //     startTime,
    //     endTime,
    //   },
    // });


    const employee = await prismadb.employee.findUnique({
      where: {
        id: params.employeeId,
      },
      // data: {
      //   images: {
      //     createMany: {
      //       data: [...images.map((image: { url: string }) => image)],
      //     },
      //   },
      // },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.log("[employee_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
