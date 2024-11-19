import mongoose, {Schema} from "mongoose";

const organisationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        leader_mail: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        description: {
            type: String,
            required: false,
            trim: true,
            default: "",
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        docs: [
            {
                type: String,
                required: false,
            }
        ],
        rating: {
            type: Number,
            required: false,
            default: 2.5,
        },

    },
    {
        timestamps: true
    }
)

export const Organisation = mongoose.model("Organisation", organisationSchema)