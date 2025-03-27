const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //libary to hash passwords

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
        },
    },
    { timestamps: true }
);

// Before saving user, hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10); //salt is a random string added to the password before hashing
    this.password = await bcrypt.hash(this.password, salt);
});

// Password matcher method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
