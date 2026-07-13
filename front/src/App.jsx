import RoutesApp from "./components/RoutesApp";
import Modal from "react-modal";
import { ListView } from "./components/ListView/ListView";
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <ListView />
    </>
  );
}

export default App;
