export default function CurrentMarketTopbar() {
  return (
    <div className="w-full flex flex-row space-x-4 bg-slate-900 py-3 rounded-lg">
      {/* Current Market */}
      <div className="flex space-x-1.5 bg-slate-700 items-center px-2  py-1 rounded-lg">
        <p className="rounded-[100%] bg-black px-2 py-1 text-sm font-bold text-blue-500 uppercase">
          S
        </p>
        <p className="text-white tracking-[0.5px]">SOL/USD</p>
      </div>

      {/* Current Market Price */}
      <div className="flex flex-col space-y-1.5">
        <p className="text-md text-green-400 tracking ">147.50</p>
        <p className="text-xs text-white ">$147.70</p>
      </div>

      {/* change */}
      <div className="flex flex-col space-y-1.5 justify-center">
        <p className="text-slate-400 font-light text-[10px] tracking-tight">
          24H Change
        </p>
        <p className="text-green-400 text-sm ">{`1.00 +0.50%`}</p>
      </div>

      {/* high */}
      <div className="flex flex-col space-y-1.5 justify-center">
        <p className="text-slate-400 font-light text-[10px] tracking-tight">
          24H High
        </p>
        <p className="text-white text-sm">149.90</p>
      </div>

      {/* low */}
      <div className="flex flex-col space-y-1.5 justify-center">
        <p className="text-slate-400 font-light text-[10px] tracking-tight">
          24H Low
        </p>
        <p className="text-white text-sm">145.90</p>
      </div>

      {/* volume */}
      <div className="flex flex-col space-y-1.5 justify-center">
        <p className="text-slate-400 font-light text-[10px] tracking-tight">
          24H Volume (USD)
        </p>
        <p className="text-white text-sm">
          {Number(10182736.84).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
