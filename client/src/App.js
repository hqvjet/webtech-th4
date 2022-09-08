import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Shop/>}/>
                    <Route path='/view-cart' element={<Cart/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
