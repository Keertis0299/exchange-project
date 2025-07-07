import { useState } from "react";

export default function DepthComponent() {
  const [isActiveTab, setActiveTab] = useState("book");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="text-white bg-slate-900 rounded-lg">
      {/* tabs */}
      <div className="w-full text-sm flex flex-row space-x-2">
        <button
          onClick={() => handleTabClick("book")}
          className={`px-2 py-1 rounded-lg ${
            isActiveTab === "book" ? "bg-slate-800" : ""
          }`}
        >
          Book
        </button>
        <button
          onClick={() => handleTabClick("trades")}
          className={`px-2 py-1 rounded-lg  ${
            isActiveTab === "trades" ? "bg-slate-800" : ""
          }`}
        >
          Trades
        </button>
      </div>
      <div className="h-full"></div>
    </div>
  );
}
