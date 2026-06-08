const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} DevPress. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition">
            About
          </a>
          <a href="#" className="hover:text-foreground transition">
            Contact
          </a>
          <a href="https://github.com/suzuki-02/Express-API" className="hover:text-foreground transition">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
