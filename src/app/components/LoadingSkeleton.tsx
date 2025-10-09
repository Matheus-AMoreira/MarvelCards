export default function LoadingSkeleton() {
  const skeletonCards = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className="flex flex-wrap justify-center gap-[2rem] p-[1rem]">
      {skeletonCards.map((id) => (
        <div key={id} className="w-80 h-[32rem] rounded-b-2xl bg-gray-700 animate-pulse">
          <div className="w-full h-[300px] bg-gray-600"></div>
          <div className="p-4">
            <div className="h-8 bg-gray-600 rounded w-3/4 mb-4"></div>
            <div className="h-20 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}