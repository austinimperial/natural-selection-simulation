'use client';

import NavItem from './NavItem';

export default function Nav() {
  return (
    <div className="flex h-18 items-center gap-4 p-4">
      <NavItem text="Home" path="/" />
      <NavItem text="Info" path="/info" />
    </div>
  );
}
