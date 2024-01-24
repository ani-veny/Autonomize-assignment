 const axios = require('axios')
const { User } = require("../models/user.model");

const get_friends = async(followers_url, following_url)=>{

    const updated_following_url = following_url.split("{")[0];
    const followers = await axios.get(followers_url);    //getting the followers
    const following = await axios.get(updated_following_url);  //getting the following people

    const followersLogins = followers.data.map(follower => follower.login);
    const followingLogins = following.data.map(follow => follow.login);

    const friends = followersLogins.filter(el=> followingLogins.includes(el));
    return friends;

}

const getUsers= async (req,res)=>{
    const queryObj = req.query.sort;
    let data;
    if(queryObj){
    queryStr = queryObj.split(",").join(" ");
     data  = await User.find({is_removed:false}).sort(queryStr)
    }
    data  = await User.find({is_removed:false})
    res.json({status: "success", data:data});
}

const addUser = async (req,res)=>{
    const {username} = req.params;

    // console.log(username)
    let data = await User.findOne({login:username});

    if(data)
    {
        if(data.is_removed)
        res.json({status: "failed", message:"Data is deleted"})
        else
        res.status(200).json({status: "success", data: data});
    }
    else
    {
        const response  = await axios.get(`https://api.github.com/users/${username}`)

        const {followers_url, following_url} = response.data;

        friends = await get_friends(followers_url,following_url);

        data = await User.create({...response.data, is_removed:false,friends:friends});

        res.status(200).json({status: "success", data: data});

    }
}

const getuserBylocationOrUserName = async (req,res)=>{
    try {
        const { username, location } = req.query;
    
        // Check if both username and location are missing
        if (!username && !location) {
            return res.status(400).json({ status: "failed", message: 'Data not found' });
        }
    
        const query = {}; // Query object
        if (username) {
            query.login = new RegExp(username, 'i'); // Case-insensitive username search
        }
        if (location) {
            query.location = new RegExp(location, 'i'); // Case-insensitive location search
        }
    
        // Search in the database for the query object.
        const searchResults = await User.find(query);
        res.json({ status: "success", data: searchResults });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ status: "failed", message: 'Internal server error' });
    }
}

const updateUser= async (req,res)=>{
    try{
        const {username} = req.params;
       
        let user = await User.findOne({login:username});  
      
        console.log(user.isDeleted,"is del");

        if(user.is_removed)
        {
            res.json({status: "failed", message:"Data is already deleted"})
        }
        else{
        const data  = await User.findOneAndUpdate({login:username},req.body,{new:true});
        if(!data)
        {
            res.json({message:"Failed updataing the data"});
        }else
            res.json({Message:"Data updated successfully",UpdatedData:data})
        }

    }catch(e){
        res.status(404).send({status:"failed", error:"Error in updating user details, user not found"});
    }
}

const deleteUser= async (req,res)=>{
    try {
        const { username } = req.params;
    
        if (!username) {
            return res.status(400).json({ status: "failed", message: 'Username not found' });
        }
    
        const user = await User.findOne({ login: username });
    
        if (!user) {
            return res.status(404).json({ status: "failed", message: 'User not found' });
        }
    
        // Soft deleting the user
        await User.findOneAndUpdate({ login: username }, { is_removed: true }, { new: true });
    
        res.json({ status: "success", message: "Document deleted successfully" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ status: "failed", message: 'Error deleting the data', error: error.message });
    }
    
}

module.exports={
    getUsers,
    addUser,
    getuserBylocationOrUserName,
    updateUser,
    deleteUser
}