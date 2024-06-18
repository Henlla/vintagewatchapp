import 'animate.css';

const BannerComponent = () => {
  return (
    <div>
      <div className="bg-gray-800 text-white w-full font-[sans-serif]">
        <div className="grid md:grid-cols-2 gap-4 items-center md:max-h-[475px] overflow-hidden">
          <div className="p-6 animate__backInLeft animate__animated">
            <h1 className="sm:text-4xl text-2xl font-bold">
              Readymadeui Jumbotron UI
            </h1>
            <p className="mt-4 text-sm text-gray-400 ">
              Our website specializes in selling and inspecting used watches, providing you with a reliable and professional shopping experience. We provide a variety of watch lines from world-famous brands with reasonable and transparent prices.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Each watch is thoroughly inspected by experienced appraisers, ensuring quality and authenticity. In addition, we also provide warranty service and dedicated customer support, giving you peace of mind throughout the use process. Visit our website to discover unique and classy watch models.
            </p>
            <button
              type="button"
              className="px-6 py-3 mt-10 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-600 hover:bg-gray-700"
            >
              Get started
            </button>
          </div>
          <img
            src="https://curnonwatch.com/blog/wp-content/uploads/2021/03/anh-dong-ho-dep-76-1140x641.jpg"
            className="w-full h-full object-cover shrink-0 animate__backInRight animate__animated"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerComponent
