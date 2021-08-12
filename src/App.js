import "./App.css";
import { Routes } from "./routes";
import { useState } from "react";
import { Modal } from "./components/Modal";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className="App">
      {/* {isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}> Aqui entra os 
      inputs e componentes dos childrens</Modal>) : null} */}
      <Routes />
    </div>
  );
}

export default App;
