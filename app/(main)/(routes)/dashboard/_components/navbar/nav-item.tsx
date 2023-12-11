import Link from "next/link";

type NavItemProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};
const NavItem = ({ data }: { data: NavItemProps }) => {
  return (
    <li className="group mb-10 cursor-pointer">
      <Link href={data.href}>
        <div className="flex items-center flex-col">
          <div className="group-hover:bg-black/10 dark:hover:bg-black p-3 rounded-full">
            {data.icon}
          </div>
          <p className="text-muted-foreground">{data.label}</p>
        </div>
      </Link>
    </li>
  );
};

export default NavItem;
