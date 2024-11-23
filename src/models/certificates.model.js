import mongoose,{Schema} from "mongoose";

const certificateSchema = new Schema({
    pId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Participant",
    },
    eventId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Event",
    },
    issueDate:{
        type: Date,
        required: true
    },
    blockchainValidationId:{
        type: String,
        required: true
    },
    certificateHash:{
        type: String,
        required: true
    },
    certificateUrl:{
        type: String,
        required: true
    }
},{timestamps:true})

const Certificate =mongoose.models.Certificate ||  mongoose.model("Certificate" , certificateSchema)
export default Certificate