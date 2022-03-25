import React from 'react'
import {Route, Redirect} from "react-router-dom";

export default function BeforeRouter(component) {


    if(window.localStorage.getItem('token')){
        console.log("获取到了token");
        console.log(window.localStorage.getItem('token'));
        return component
    }else{
        return function(){
            return <Redirect to={{pathname:"/login"}}></Redirect>
        }
    }
  
}
