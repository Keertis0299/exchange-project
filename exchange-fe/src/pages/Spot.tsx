import CurrentMarketTopbar from "../components/spot/CurrentMarketTopbar";
import TradingViewWidget from "../components/TradingViewComponent";
import DepthComponent from "../components/spot/DepthComponent";

// Todo
//1. Make chart responsive -> while resizing down the chart should resize correctly
export default function spot() {
  return (
    <div className="border border-red-500 px-3 overflow-x-scroll">
      <div className="flex flex-row text-white gap-3">
        <div className="flex flex-col flex-1 bg-amber-300 min-w-xl space-y-3 ">
          <div className="bg-blue-300">
            <CurrentMarketTopbar></CurrentMarketTopbar>
          </div>
          <div className="flex flex-row flex-1 space-x-3">
            <div className="w-full bg-fuchsia-300">
              <TradingViewWidget></TradingViewWidget>
            </div>
            <div className="w-[250px] bg-green-400">
              <DepthComponent />
            </div>
          </div>
        </div>
        <div className="w-[200px] bg-green-400 flex-none">Buy and sell</div>
      </div>
    </div>
  );
}
