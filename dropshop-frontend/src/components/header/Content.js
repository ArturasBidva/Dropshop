import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/Home";
import GetAllProducts from "../../pages/GetAllProducts";
import Register from "../forms/Register";
import Login from "../forms/Login";
import Profile from "../../pages/Profile";
import SecuredRoute from "../../api/security/SecuredRoute";
import CreditCardPost from "../../pages/Card";
import Orders from "../../pages/Orders";
import Cart from "../../pages/Cart";


class Content extends React.Component {
    render() {
        return  <div className="header-content">
         <Routes>
             <Route path="/profile" element={<SecuredRoute roles={['USER','ADMIN']}/>}>
                 <Route path="/profile" element={<Profile/>}/>
             </Route>
             <Route path="/card" element={<SecuredRoute roles={['USER','ADMIN']}/>}>
                 <Route path="/card" element={<CreditCardPost/>}/>
             </Route>
             <Route path="/cart" element={<SecuredRoute roles={['USER','ADMIN']}/>}>
                 <Route path="/cart" element={<Cart/>}/>
             </Route>
             <Route path="/" element={<Home/>}/>
             <Route path="/register" element={<Register/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/namai-ir-laisvalaikis" element={<GetAllProducts/>}/>
             <Route path="/duonos-gaminiai-ir-konditerija" element={<GetAllProducts/>}/>
             <Route path="/gerimai" element={<GetAllProducts/>}/>
             <Route path="/saldytas-maistas" element={<GetAllProducts/>}/>
             <Route path="/pieno-gaminiai-ir-kiausiniai" element={<GetAllProducts/>}/>
             <Route path="/svaros-ir-gyvunu-prekes" element={<GetAllProducts/>}/>
             <Route path="/darzoves-ir-vaisiai" element={<GetAllProducts/>}/>
             <Route path="/orders" element={<SecuredRoute roles={['ADMIN']}/>}>
                 <Route path="/orders" element={<Orders/>}/>
             </Route>
         </Routes>
        </div>
    }
}
export default Content;