const bcrypt = require("bcrypt");
const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      // required: true,
      // validate: (pass) => {
      //   if (!pass?.length || pass.length < 5) {
      //     new Error("password must be at least 5 characters");
      //     return false;
      //   }
      // },
    },
    image: { type: String },
  },
  { timestamps: true }
);

// UserSchema.post('validate', function(user) {
//   const notHashedPass = user.password
//   const salt = bcrypt.genSaltSync(10)
//   user.password = bcrypt.hashSync(notHashedPass, salt)
// })

export const User = models?.User || model("User", UserSchema);
