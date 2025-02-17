import { Link, useLocation } from "react-router";

function Footer() {
  return (
    <div className="flex gap-4 justify-center px-3 py-2 gruv-gray">
      <NavLink to="/">Quote</NavLink>
      <NavLink to="/all">All</NavLink>
      <NavLink to="/text">Text</NavLink>
    </div>
  );
}

export default Footer;

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`${location.pathname === to ? "gruv-white" : "gruv-gray"
        } hover:underline`}
    >
      {children}
    </Link>
  );
}
