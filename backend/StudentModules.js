const mongoose=require ("mongoose")

const studentdata = mongoose.Schema(
    {
        name:
        {
       type:String
        },
    password:
        {
            type: String 
        },
        phone:
        {
            type:Number
        },
        email:
        {
        type:String
        },
        gender:
        {
            type:String
        },
        country:
        {
            type:String
        },
        language:
        {
            type:[String]
        }
       

        


    }
)
module.exports =mongoose.model("studentfees", studentdata)
