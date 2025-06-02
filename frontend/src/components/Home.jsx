import Header from "./Header.jsx";
import Games from "./Games.jsx";

const Home = ({ user, games }) => {
  return (
    <div className="w-full px-4 sm:px-8 py-4 flex-grow flex flex-col justify-center items-center">
      <Header user={user} />
      <Games user={user} games={games} />
    </div>
  );
};

export default Home;
