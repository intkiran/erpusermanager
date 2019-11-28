import mongoose from "mongoose";
const LinkSchema = new mongoose.Schema(
  {
    linkid: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    roleid: { type: String, unique: false }
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);

export default Link;
