
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Confirmation from "./pages/Confirmation";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
