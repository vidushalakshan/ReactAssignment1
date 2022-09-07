import React from "react";
import { Routes,Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import ProductManage from "../pages/ProductManage";

function App() {
    return (
        <Routes>
            <Route exact path={"/admin"} element={<Admin/>}/>}
            <Route exact path={"/"} element={<Home/>}/>
            <Route exact path={"/product"} element={<ProductManage/>}/>
        </Routes>
    );
}

export default App;