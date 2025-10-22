const mongoose = require ('mongoose')

const feeSchema = new mongoose.Schema({
    
        totalamount:
        {
            type:Number
        },
        paidamount:
        {
            type:Number
        },
        paiddate:
        {
        type: Date

        },
        balanceamount:
        {
        type:Number 
        }
       
});

const studentdetail= mongoose.Schema(

    {
        name:
        {
            type:String
        },

        email:
       {
        type:String
        },
        phone:
        {
            type:Number
        
        },
        father:
        {
            type:String
        },
        mother:
        {
            type:String
        },
        gender:
        {
            type:String
        },
        course:
        {
            type:String
        },
        image:
        {
            type:String
        },
        dob:
        {
            type: Date,
           // default:  Date.now()
        },
        address:
        {
            type:String
        },
        roll:
        {
            type:String
        },
        enroll:
        {
            type:Date
        },
        grade:
        {
            type:String
        },
       status:
        {
            type:String
        },
        totalamount:
        {
            type:Number
        },
        paidamount:
        {
            type:Number
        },
        paiddate:
        {
        type: Date

        },
        balanceamount:
        {
        type:Number 
        },
       
        totalpaid:
        {
            type:Number
        },
         fees: [feeSchema]

    }
)
module.exports=mongoose.model("studentdetails",studentdetail)