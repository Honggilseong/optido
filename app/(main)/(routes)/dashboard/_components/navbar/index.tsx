import { User } from "lucide-react";
import NavItem from "./nav-item";
import UserProfile from "../../../../../../components/user-profile";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <User className="h-8 w-8" />,
  },
];

const Navbar = () => {
  return (
    <div className="flex shrink-0 w-32 border-r rounded-r-md flex-col items-center dark:bg-[#323232]">
      <div className="mt-20" />
      <UserProfile />
      <div className="mt-20" />
      <ul>
        {navItems.map((item) => (
          <NavItem data={item} key={item.label} />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
