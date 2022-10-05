import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Details from "./pages/Details";
import Home from "./pages/Home";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="details/:name" element={<Details />} />
            </Route>
        </Routes>


    );
}

export default App;