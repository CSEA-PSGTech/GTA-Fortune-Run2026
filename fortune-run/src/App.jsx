import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;