import React from "react";

function BannerTitle({title}) {
  return (
    <div>
      <div className="bg-[url('https://htmldemo.net/shome/shome/assets/img/photos/bg3.webp')] bg-cover bg-no-repeat h-36" style={{backgroundSize: "100% 100%"}}>
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BannerTitle;
