import "./App.css";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  // eslint-disable-next-line
  const [user, setUser] = useState("grumpy19");
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route path="*" element={<Error message={error} />} />
        <Route path="/" element={<Reviews user={user} />} />
        <Route path="/reviews/:review_id" element={<Review user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
