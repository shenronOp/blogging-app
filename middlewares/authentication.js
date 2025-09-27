const express=require('express');
const app=express();
const{validateToken}=require('../services/authentication');


function checkForAuthenticationCookie(cookieName){
    return function (req, res, next){
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }

        const userPayload=validateToken(tokenCookieValue);
        if(userPayload){
            req.user=userPayload;
        }
        return next();
    }
}




module.exports={
    checkForAuthenticationCookie,
};