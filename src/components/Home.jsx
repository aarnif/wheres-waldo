import Header from "./Header/index.jsx";
import Hero from "./Hero.jsx";
import Games from "./Games/index.jsx";
import Footer from "./Footer/index.jsx";

const Home = ({ user, games }) => {
  return (
    <>
      <Header user={user} />
      <Hero />
      <div
        style={{
          backgroundColor: games[0].colorTheme.gameCanvas,
        }}
        className="w-full flex-grow flex flex-col justify-center items-center"
      >
        <Games games={games} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
