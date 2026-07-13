import RoutesApp from "./components/RoutesApp";
import Modal from "react-modal";
import Text from "./components/SearchListOld/Text";
import SearchList from "./components/SearchListOld/SearchList";
import { ListView } from "./components/ListView/ListView";
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <RoutesApp />
    </>
  );
}

export default App;
