import NavItem from "./nav-item";

type Props = {
  username: string
}

const NavList = ({ username }: Props) => {
  const navigation = [
    { label: "Home", href: `/${username}` },
  ];

  return <div className="flex items-center gap-x-4">
    {navigation.map(({ label, href }) => (
        <NavItem key={href} label={label} href={`${href}`}/>
    ))}
  </div>;
};

export default NavList;
