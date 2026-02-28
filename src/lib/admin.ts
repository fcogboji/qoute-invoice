/**
 * Platform admin check using Clerk publicMetadata.
 * In Clerk Dashboard: Users → select user → Public metadata → add { "role": "admin" }
 */
import { currentUser } from "@clerk/nextjs/server";

export async function isPlatformAdmin(): Promise<boolean> {
  const user = await currentUser();
  return (user?.publicMetadata?.role as string) === "admin";
}
