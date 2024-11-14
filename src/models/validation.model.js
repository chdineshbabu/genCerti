import mongoose,{Schema} from "mongoose";

const validationSchema = new Schema({
    certificateHash:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    transactionHash:{
        type: String,
        required: true,
    },
    blockHash:{
        type: String,
        required: true,
    },
    from:{
        type: String,
        required: true,
    },
    signer:{
        type: String,
        required: true,
    },

},{timestamps:true})

export const Validation = mongoose.model("Validation", validationSchema)