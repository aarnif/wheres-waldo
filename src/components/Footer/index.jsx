import Signature from "./Signature";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center p-2 text-white bg-red-600 border-t border-t-slate-300">
      <div className="flex justify-center items-center">
        <Signature />
      </div>
    </footer>
  );
};

export default Footer;
