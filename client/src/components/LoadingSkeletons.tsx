function LoadingSkeletons({ number }: { number: number }) {
  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white hover:shadow-lg transition-shadow rounded-lg w-full sm:w-[330px] p-3 flex flex-col gap-3"
        >
          <div className="bg-gray-300 h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"></div>
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 h-8 w-8 rounded-full object-cover cursor-pointer" />
              <p className="bg-gray-300 h-4 w-12"></p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 w-3/4"></div>
            <div className="h-4 bg-gray-300 w-4/5"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default LoadingSkeletons;
