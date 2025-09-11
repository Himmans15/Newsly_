import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
