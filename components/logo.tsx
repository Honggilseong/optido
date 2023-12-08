import Image from "next/image";

const Logo = ({ width = 100, height = 60 }) => {
  return (
    <div className="hidden md:flex items-center gap-x-2 cursor-pointer">
      <Image src="/logo.png" height={height} width={width} alt="logo" />
    </div>
  );
};

export default Logo;
