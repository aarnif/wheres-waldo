const Hero = () => {
  return (
    <div
      key={"hero"}
      className="w-full flex-grow min-h-[700px] mt-[60px] flex justify-center items-center bg-zinc-600 text-white"
      style={{
        backgroundImage: "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-grow max-w-[1200px] flex justify-center items-center">
        <div className="flex-grow basis-3/5">
          <h1 className="w-full text-5xl font-extrabold text-center">
            Where's Waldo
          </h1>
          <h1 className="mt-4 w-full text-3xl font-extrabold text-center">
            (A Photo Tagging App)
          </h1>
        </div>
        <div
          className="h-[400px] flex-grow basis-2/5"
          style={{
            backgroundImage: "url('images/hero.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
