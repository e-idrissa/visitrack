import NavItem from "./nav-item";

type Props = {
  username: string
}

const navigation = [
  { label: "Home", href: "/" },
  { label: "All Visits", href: "/all" },
  { label: "About Us", href: "/about" },
];

const NavList = ({ username }: Props) => {
  return <div className="flex items-center gap-x-4">
    {navigation.map(({ label, href }) => (
        <NavItem key={href} label={label} href={`/${username}${href}`} id={href}/>
    ))}
  </div>;
};

export default NavList;
