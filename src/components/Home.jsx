import Header from "./Header/index.jsx";
import Hero from "./Hero.jsx";
import Games from "./Games/index.jsx";
import Footer from "./Footer/index.jsx";

const Home = ({ games }) => {
  return (
    <>
      <Header />
      <Hero />
      <div className="w-full flex-grow flex justify-center items-center">
        <Games games={games} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
