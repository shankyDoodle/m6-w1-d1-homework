import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import InventoryList from "./InventoryList";
import InventoryEdit from "./InventoryEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/inventories" exact element={<InventoryList />} />
        <Route path="/inventories/:id" element={<InventoryEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
