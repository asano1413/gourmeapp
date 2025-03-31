import { prisma } from "@/lib/db";
import { Review, Store } from "@prisma/client";
import { NextRequest, NextResponse  } from "next/server";


export type ApiSearchResponse = {
  query: string | null;
  category: string | null;
  results: (Store & {
    reviews: Review[];
  })[];
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("q") || null;
  const category = searchParams.get("category") || null;

  const results = await prisma.store.findMany({
    where: {
      OR: query ? [
        {
          name: { contains: query },
          address: { contains: query },
        },
      ] : undefined,
      AND: category ? {
        category: { equals: category }
      } : undefined
    },
    orderBy: {
      name: "asc"
    },
    include: {
      reviews: true
    }
  });

  return NextResponse.json({
    query,
    category,
    results,
  });
}
