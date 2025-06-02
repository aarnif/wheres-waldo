import Header from "./Header.jsx";
import Games from "./Games.jsx";

const Home = ({ user, games }) => {
  return (
    <div className="w-full px-4 sm:px-8 py-4 flex-grow flex flex-col justify-center items-center bg-gradient-to-b from-slate-950 to-slate-900">
      <Header user={user} />
      <Games games={games} />
    </div>
  );
};

export default Home;
