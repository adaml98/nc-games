import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  // eslint-disable-next-line
  const [user, setUser] = useState("grumpy19");

  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Reviews user={user} />} />
        <Route path="/reviews/:review_id" element={<Review user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
