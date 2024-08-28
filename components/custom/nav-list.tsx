import NavItem from "./nav-item";

type Props = {
  username: string
}

const navigation = [
  { label: "Home", href: "/", id: "home" },
  { label: "All Visits", href: "/all", id: "all" },
  { label: "About Us", href: "/about", id: "about" },
];

const NavList = ({ username }: Props) => {
  return <div className="flex items-center gap-x-4">
    {navigation.map(({ label, href, id }) => (
        <NavItem key={href} label={label} href={`/${username}${href}`} id={id}/>
    ))}
  </div>;
};

export default NavList;
