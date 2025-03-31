import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({
      message: "Unauthorized",
    }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const reviewId = searchParams.get("id");

  if (!reviewId) {
    return NextResponse.json({
      message: "`id`は必須です",
    }, { status: 404 });
  }

  try {
    const res = await prisma.reviewLike.create({
      data: {
        reviewId: parseInt(reviewId),
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json({
      data: res,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({
          message: "既にいいねしています"
        }, { status: 200 });
      } else if (e.code === "P2003") {
        return NextResponse.json({
          message: "レビューが見つかりませんでした"
        }, { status: 200 });
      } else {
        return NextResponse.json({
          code: e.code,
          message: `エラー: ${e.code}`
        }, { status: 500 });
      }
    } else {
      return NextResponse.json({
        message: '不明なエラー'
      }, { status: 500 });
    }
  }
}
