import mongoose from "mongoose";

const OrginizationSchema =new mongoose.Schema(
  {
    orgId: {
      type: String,
      required: true,
    },
    orgName: {
      type: String,
      required: true,
      lowercase: true,
    },
    address: {
      type: String,
    },
    orgEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    isContract: {
      type: Boolean,
      default: false,
    },
    contractAddress: {
      type: String,
      default: null,
    },
    publicAddress: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Orginization = mongoose.models.Orginization || mongoose.model("Orginization", OrginizationSchema);
export default Orginization