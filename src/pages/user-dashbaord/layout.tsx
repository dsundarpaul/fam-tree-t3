export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      sdfkljksl
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>hello</nav>
      {children}
    </section>
  );
}
