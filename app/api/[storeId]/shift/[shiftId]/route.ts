import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
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

    const shifts = await prismadb.shift.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(shifts);
  } catch (error) {
    console.log("[SHIFTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { to, from, startTime, endTime, employeeId, storeId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!from) {
      return new NextResponse("Start Date is required", { status: 400 });
    }

    if (!to) {
      return new NextResponse("End Date is required", { status: 400 });
    }

    if (!startTime) {
      return new NextResponse("Start Time is required", { status: 400 });
    }

    if (!endTime) {
      return new NextResponse("End Time is required", { status: 400 });
    }

    if (!employeeId) {
      return new NextResponse("Employee Id is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const shift = await prismadb.shift.create({
      data: {
        storeId,
        employeeId,
        to,
        from,
        startTime,
        endTime,
    
      }
    });
  
    return NextResponse.json(shift);
  } catch (error) {
    console.log('[SHIFT_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
