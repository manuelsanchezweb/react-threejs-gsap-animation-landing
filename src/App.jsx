import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import SoundSection from "./components/SoundSection";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Jumbotron />
      <SoundSection />
    </div>
  );
}
