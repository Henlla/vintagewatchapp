import React from "react";
import Login from "./page/Login";


function  menu(){
return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </BrowserRouter>
);
}
export default menu;