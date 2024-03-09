import { ReactNode } from 'react';

export function TypographyH1({ children }: { children: ReactNode }) {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>;
}
export function TypographyH2({ children }: { children: ReactNode }) {
  return <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>;
}
export function TypographyH3() {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>;
}
export function TypographyH4() {
  return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">People stopped telling jokes</h4>;
}
export function TypographyP() {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
    </p>
  );
}
export function TypographyBlockquote() {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
    </blockquote>
  );
}
export function TypographyLarge() {
  return <div className="text-lg font-semibold">Are you absolutely sure?</div>;
}
export function TypographySmall() {
  return <small className="text-sm font-medium leading-none">Email address</small>;
}
export function TypographyMuted({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
