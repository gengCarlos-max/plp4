const mongoose = require("mongoose");

//connection to mongo db
mongoose
  .connect(process.env.connection_string)
  .then(() => {
    console.log("Mongo Db connected Successfully");
  })
  .catch((error) => {
    console.log("Mongo Db connection error");
  });

//Schema
const BookSchema = mongoose.Schema({
  BookName: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image:{
    type:String,
    required:true,
    validate:{
        validator:function(value){
            return /^https?:\/\/.+/.test(value);
        },
        message: 'valide url'
    }
  }
});
BookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
BookSchema.set("toJSON", {
  virtuals: true,
});

const BookModel = mongoose.model("Books", BookSchema);
module.exports = BookModel;
