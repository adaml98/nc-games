import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/:review_id"
          element={<Review isLoading={isLoading} setIsLoading={setIsLoading} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
