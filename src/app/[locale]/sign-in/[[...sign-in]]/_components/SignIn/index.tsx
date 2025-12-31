import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function SignIn(): React.JSX.Element {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <ClerkSignIn />
    </div>
  );
}
