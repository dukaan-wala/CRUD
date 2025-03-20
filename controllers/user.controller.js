import User from "../models/user.model.js";


// नया यूज़र जोड़ें
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;
    if (age < 18){
      return res.status(400).json({success:false,message:"not enter this age"})
    }
    console.log(typeof phone)
    if (phone.length !== 10){
      return res.status(400).json({success:false,message:"number not valid"})
    }
    if(!name){
      return res.status(400).json({success:false,message:"name is required"})
    }
    const isNameExits = await User.findOne({})
    console.log(isNameExits);
    

    const isEmailExits = await User.find({email:email})
    // console.log(isEmailExits);
    if(isEmailExits.length) {  
      return res.status(400).json({success:false,message:"email already exits"})
    }
    
    const newUser = new User({ name, email, phone, age });

    await newUser.save();
    res.status(201).json({ success: true, message: "✅ यूज़र सफलतापूर्वक जोड़ा गया", data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ सर्वर त्रुटि", error });
  }
};


// सभी यूज़र्स को प्राप्त करें
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ सर्वर त्रुटि", error });
  }
};

// एक यूज़र प्राप्त करें (ID से)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "❌ यूज़र नहीं मिला" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ सर्वर त्रुटि", error });
  }
};


export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) return res.status(404).json({ success: false, message: "❌ यूज़र नहीं मिला" });

    res.status(200).json({ success: true, message: "✅ यूज़र सफलतापूर्वक अपडेट हुआ", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ सर्वर त्रुटि", error });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).json({ success: false, message: "❌ यूज़र नहीं मिला" });

    res.status(200).json({ success: true, message: "✅ यूज़र सफलतापूर्वक हटाया गया" });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ सर्वर त्रुटि", error });
  }
};
