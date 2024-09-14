import { PropsWithChildren } from "react";

export const GridBackgroundDemo = (props: PropsWithChildren) => {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex h-dvh w-full items-center justify-center bg-white dark:bg-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {props.children}
    </div>
  );
};
