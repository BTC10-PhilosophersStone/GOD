import RoutesApp from "./components/RoutesApp";
import Modal from "react-modal";
import { ListView } from "./components/ListView/ListView";
import { ChatApp } from "./components/ChatApp/ChatApp";
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <ChatApp />
    </>
  );
}

export default App;
