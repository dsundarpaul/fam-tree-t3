import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  console.log(children);
  return (
    <html lang="en">
      <body>
        <p>hoeo</p>
        {children}
      </body>
    </html>
  );
}
