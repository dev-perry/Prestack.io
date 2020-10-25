import React from "react";
import {useLocation} from "react-router-dom";

function Class(props){
  let {pathname} = useLocation();

  return(
    <div>
      Yo this is a class page. Page ID is {pathname.split('/')[3]}.
    </div>
  )
}

export default Class;
