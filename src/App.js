import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Reviews />} />
        <Route path="/reviews/:review_id" element={<Review />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
