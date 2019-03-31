import React from "react";
import {NavLink} from  'react-router-dom';

import  './index.css';
export  default  function MyNavLink( props) {
    // console.log(props);  //{to: "/about", children: "About"}
    return <NavLink {...props} className="list-group-item" activeClassName = 'activeClass'/>
}
