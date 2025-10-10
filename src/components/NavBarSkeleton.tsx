export default function NavBarSkeleton() {
  return (
    <header>
      <nav className="flex w-full justify-evenly items-center flex-wrap gap-4 p-4 
        bg-[#202020] shadow-lg 
        rounded-b-[60px] border-b-4 border-[#e62429] border-solid h-[88px]"> 
        <div className="w-[122px] h-[44px] bg-gray-600 rounded animate-pulse"></div>

        <div className="bg-gray-600 border-4 border-gray-500 rounded-lg h-[52px] w-[340px] animate-pulse"></div>

        <div className="flex gap-2">
            <div className="bg-gray-600 rounded h-[40px] w-[120px] animate-pulse"></div>
            <div className="bg-gray-600 rounded h-[40px] w-[120px] animate-pulse"></div>
        </div>
      </nav>
    </header>
  );
}