
const LoginService = async (User,req,res) => {
    try {
        if (!req.body) {
            res.status(400).json({});
            console.log("empty request");
            return;
        }
        const userReq = req.body;
        const users = await User.findOne({ userId : userReq.userId });
        if (!users){
            const saveUser = new User({userName: userReq.userName, userId: userReq.userId, userGame: null});
            await saveUser.save();
            console.log (`logged in new user: ${userReq.userId}`);
            res.status(201).json(userReq);
        } else {
            console.log (`logged in user: ${userReq.userId}`);
            res.status(200).json(userReq)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }

}

module.exports = LoginService;