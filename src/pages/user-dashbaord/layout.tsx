import React from "react";
export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      sdfkljksl
      <nav>hello</nav>
      {children}
    </section>
  );
}
