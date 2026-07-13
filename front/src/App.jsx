import RoutesApp from "./components/RoutesApp";
import Modal from "react-modal";
import Text from "./components/SearchList/Text";
import ThemeProvider from "./theme/ThemeProvider";
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <RoutesApp />
    </>
  );
}

export default App;
