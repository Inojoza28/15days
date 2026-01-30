export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} 15days • Organize suas finanças quinzenais
        </p>
      </div>
    </footer>
  );
}
