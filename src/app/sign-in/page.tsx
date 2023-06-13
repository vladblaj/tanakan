import {SignIn} from "@clerk/nextjs";

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"/>
      </main>
  );
}
