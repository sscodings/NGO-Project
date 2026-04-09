const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sscodings:ssrockstar.11@sscodings.mvywr1x.mongodb.net/NGO");

const OrganistationSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    website:String,
    description:String,
    type:{
        type:String,
        enum:["Education","Healthcare","Environment","Animal Welfare","Other"],
        default:"Other"
    },
    address:{
        street:String,
        city:String,
        state:String,
        country:{
            type:String,
            default:"India"
        },
        pincode:String,
    },
    registrationNumber:{
        type:String,
        required:true,
        unique:true
    },
    documents:[
        {
            name:String,
            fileUrl:String,
        },
    ],
    isVerified:{
        type:Boolean,
        default:false,
    },
    needs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Need"
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
},{timestamps:true})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    bio:String,
    skills:[String],
    appliedNeeds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Need",
    },],
    completedNeeds:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Need",
        },
    ],
    rating:{
        type:Number,
        default:0,
    },
},{timestamps:true});

const NeedsSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:{
        type:String,
        enum:["Volunteer","Educator","Donation","Other"],
        required:true,
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organisation',
        required:true,
    },
    location:{
        city:String,
        state:String,
    },
    skillsRequired:[String],

    requiredCount:{
        type:Number,
        default:1,
    },

    applicants:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            },
            status:{
                type:String,
                default:"pending",
            },
            appliedAt:{
                type:Date,
                default:Date.now,
            },
        },
    ],
    deadline:Date,

    status:{
        type:String,
        default:"Open",
    },

});

const Organisation = mongoose.model('Organisation',OrganistationSchema);
const User = mongoose.model('User',userSchema);
const Need = mongoose.model('Need',NeedsSchema);

module.exports = {
    Organisation,
    User,
    Need
};
