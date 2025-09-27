const jwt=require('jsonwebtoken');
secret='superman123';

function createTokenForUser(user){
    const payload={
        _id:user._id,
        name:user.fullName,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,

    }
    const token=jwt.sign(payload, secret);
    return token;
}

function validateToken(token){
    if(!token)return null;
    const payload=jwt.verify(token, secret);
    if(!payload)return null;

    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}