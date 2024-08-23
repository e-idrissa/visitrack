import NavItem from "./nav-item";

const navigation = [
  { label: "Home", href: "/" },
  { label: "All Visits", href: "/all" },
  { label: "About Us", href: "/about" },
];

const NavList = () => {
  return <div className="flex items-center gap-x-4">
    {navigation.map(({ label, href }) => (
        <NavItem key={href} label={label} href={href}/>
    ))}
  </div>;
};

export default NavList;
