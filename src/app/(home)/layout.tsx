import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-full bg-background">{children}</div>;
}
