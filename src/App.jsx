import Header from "./components/Header";
import Hero from "./Hero";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="w-full flex-grow flex justify-center items-center">
        Content
      </div>
      <Footer />
    </div>
  );
};

export default App;
