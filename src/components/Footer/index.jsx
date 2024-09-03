import Signature from "./Signature";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 z-10 w-full flex justify-center items-center p-2 text-white bg-zinc-700 bg-opacity-90">
      <div className="flex justify-center items-center">
        <Signature />
      </div>
    </footer>
  );
};

export default Footer;
