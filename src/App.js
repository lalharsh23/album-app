import "./App.css";
import Navbar from "./components/Navbar";
import Routers from "./routers/Routers";
import CustomAlbumContext from "./albumContext";
function App() {
  return (
    <CustomAlbumContext>
      <Navbar />
      <Routers />
    </CustomAlbumContext>
  );
}

export default App;
