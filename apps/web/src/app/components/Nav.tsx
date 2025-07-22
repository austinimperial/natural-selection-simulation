import NavItem from './NavItem';

export default function Nav() {
  return (
    <div className="flex gap-4 m-4">
      <NavItem text="Home" path="/" />
      <NavItem text="Info" path="/info" />
    </div>
  );
}
