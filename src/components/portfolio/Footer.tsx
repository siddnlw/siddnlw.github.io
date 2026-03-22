const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Siddharth Nalwaya</span>
        <span className="font-mono text-xs">Built with React + TypeScript</span>
      </div>
    </footer>
  );
};

export default Footer;
