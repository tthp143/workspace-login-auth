import Link from "next/link";
import { auth, signOut } from "@/app/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Workspace Login</h1>

      {session?.user ? (
        <>
          <p>
            สวัสดี {session.user.name ?? session.user.email} ({session.user.role})
          </p>
          <div className="flex gap-3">
            <Link href="/admin" className="text-blue-600 underline">
              Admin
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="text-blue-600 underline">Logout</button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex gap-3">
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
          <Link href="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </div>
      )}
    </main>
  );
}
