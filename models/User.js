const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        userName: { type: 'string', required: true, unique: true},
        eMail: { type: 'string', required: true, unique: true},
        password: { type: 'string', required: true},
        isAdmin: { tpye: Boolean, default: false},
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema);
