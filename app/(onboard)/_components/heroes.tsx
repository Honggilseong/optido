import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/empty.png"
            fill
            className="object-contain dark:hidden"
            alt="logo-image"
          />
          <Image
            src="/empty-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="logo-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
