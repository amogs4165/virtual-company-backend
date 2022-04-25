import axios from "axios";

export const userInfo = async (req,res,next)=>{

    try {
        
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get('https://virtual-company.us.auth0.com/userinfo',{
            headers:{
                authorization: `Bearer ${accessToken}`
            }
        });
        const userInfo = response.data
        req.userInfo = userInfo;
        next();
    } catch (error) {
        res.send(error.message)
    }
}
