import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const user = await getOrCreateUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { logoUrl, companyName, companyAddress } = body;

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(logoUrl !== undefined && { logoUrl: typeof logoUrl === "string" ? logoUrl : null }),
      ...(companyName !== undefined && { companyName: typeof companyName === "string" ? companyName : null }),
      ...(companyAddress !== undefined && { companyAddress: typeof companyAddress === "string" ? companyAddress : null }),
      ...(body.name !== undefined && { name: body.name }),
    },
  });

  return Response.json(updated);
}
