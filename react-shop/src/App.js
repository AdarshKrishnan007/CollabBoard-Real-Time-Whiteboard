import "./App.css";
import MainLayout from "./layouts/Mainlayout";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <MainLayout>
        <Home />
      </MainLayout>
    </Router>
  );
}

export default App;
