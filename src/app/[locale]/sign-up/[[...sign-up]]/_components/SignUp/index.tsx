import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export default function SignUp(): React.JSX.Element {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <ClerkSignUp />
    </div>
  );
}
