import User from '../Module/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
    try{

        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    message: "Please provide name, email, and password"
                    
            })
    }
    
    const exitinguser = await User.findOne({email});
    if(exitinguser){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    res.json({
        message: "User registered successfully",
        user
    });
}catch(err){
    res.status(500).json({
        message: "Server error",
        error: err.message
    })  
}
};

//LOGIN

export const login = async (req, res) => {
    try{
        const { email, password } = req.body; 
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign(
            {
                userId: user._id,
                role : user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d" 
            }
        )

        res.json({
            message: "Login successful",
            token,
            user
        })

    }catch(err){
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}