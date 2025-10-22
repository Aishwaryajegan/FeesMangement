const express= require("express");
 const multer = require('multer');

 const router= express.Router();

 const studentdetail= require("./Studentdetailsmodule");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'studentuploads/'); // Create uploads folder manually
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post("/add",upload.single('image'),(req,res)=>
{
 const total = req.body.totalamount;
  const paid = req.body.paidamount;
  const balance = total - paid;

  const feeEntry = {
    totalamount: total,
    paidamount: paid,
    paiddate: req.body.paiddate,
    balanceamount: balance
};

    const add_data = 
    {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone ,
     image: req.file?req.file.filename:null,
     father:req.body.father,
     mother:req.body.mother,
     gender:req.body.gender,
     course:req.body.course,
     dob:req.body.dob,
     address:req.body.address,
     roll:req.body.roll,
     enroll:req.body.enroll,
     grade:req.body.grade,
     status:req.body.status,
     totalamount:req.body.totalamount,
     balanceamount:req.body.balanceamount,
     paidamount:req.body.paidamount,
     paiddate:req.body.paiddate,
     fees:[feeEntry],


    }

    const savedata = new studentdetail(add_data);

    const result =savedata .save();
    if(result)
    {
        res.send({"msg":"added"});
    }
    else{
        res.send({"msg":"unable to add"});
    }
});
/*router.post("/find",async (req,res) =>
  {
     
   const finds = await studentdetail.find()
  //const finds = await Userdata.findOne({name : req.body.name})
     if(finds)
     {
      
      res.send(finds)
  
     }
     else
     {
      res.send("unable to find")
  
     }
  });*/
   router.post("/update",upload.single('image'),async (req, res) => {
     const total = req.body.totalamount;
  const paid = req.body.paidamount;
  const balance = total - paid;

  const feeEntry = {
    totalamount: total,
    paidamount: paid,
    paiddate: req.body.paiddate,
    balanceamount: balance
};

      const update = await studentdetail.findByIdAndUpdate(
         req.body._id , // use _id for unique identification (best practice)
        {
          $push:{
            fees:feeEntry
          },
          $set: {
          name:req.body.name,
      email:req.body.email,
      phone:req.body.phone ,
     image: req.file?req.file.filename:req.body.existingImage,
     father:req.body.father,
     mother:req.body.mother,
     gender:req.body.gender,
     course:req.body.course,
     dob:req.body.dob,
     address:req.body.address,
     roll:req.body.roll,
     enroll:req.body.enroll,
     grade:req.body.grade,
     status:req.body.status,
     totalamount:req.body.totalamount,
     balanceamount:req.body.balanceamount,
     paidamount:req.body.paidamount,
     paiddate:req.body.paiddate,
     
          }
        },
       // { new: true } // returns updated document
      );
  
      if (update) {
        res.send({ msg: "updated" });
      } else {
        res.send({ msg: "unable to update" });
      }
    
  });

  

router.post("/addfees", async (req, res) => {
  const _id = req.body._id;
  const paid = parseFloat(req.body.paidamount) || 0;
  const paiddate = req.body.paiddate;

  try {
    // 🧠 Get the student and current fee records
    const student = await studentdetail.findById(_id);
    if (!student) return res.send({ msg: "Student not found" });

    const fees = student.fees || [];
    let lastBalance = 0;
    let totalAmount = 0;

    if (fees.length > 0) {
      const lastFee = fees[fees.length - 1];
      lastBalance = parseFloat(lastFee.balanceamount) || 0;
      totalAmount = parseFloat(lastFee.totalamount) || 0;
    } else {
      return res.send({ msg: "No previous fee record found. Cannot proceed." });
    }

    // 🧮 Calculate new balance
    const newBalance = (lastBalance - paid).toFixed(2);

    const feeEntry = {
      totalamount: totalAmount,
      paidamount: paid,
      paiddate: paiddate,
      balanceamount: newBalance,
    };

    const updatefees = await studentdetail.findOneAndUpdate(
      { _id },
      {
        $push: {
          fees: feeEntry,
        },
      }
    );

    if (updatefees) {
      res.send({ msg: "updated" });
    } else {
      res.send({ msg: "unable to update" });
    }
  } catch (err) {
    console.error("Error in /addfees:", err);
    res.status(500).send({ msg: "Server error" });
  }
});

router.post("/getbyid", async (req, res) => {
  const data = await studentdetail.findOne({ _id: req.body._id });
  res.send(data);
});
  router.post("/delete", async (req,res)=>
  {
  
   
       const deletedata = await studentdetail.findOneAndDelete({name : req.body.name},{phone:req.body.phone},{email:req.body.email})
  
      // const deletedata =await Userdata.deleteMany()
  
       if(deletedata)
       {
        res.send({"msg":"data deleted"})
       }
  
       else
       {
        res.send({"msg":"unable to delete"})
       }
  
  })

router.post("/viewbyid", async (req, res) => {
  try {
    const data = await studentdetail.findOne({ _id: req.body._id });

    // Ensure fees is always an array
    if (!Array.isArray(data.fees)) {
      data.fees = [];
    }

    res.send(data);
  } catch (error) {
    res.status(500).send({ msg: "Server error", error });
  }
});
  
const mongoose = require('mongoose');

router.post("/deleteview", async (req, res) => {
  try {
    const { studentId, feeId } = req.body;

    if (!studentId || !feeId) {
      return res.status(400).send({ msg: "Missing studentId or feeId" });
    }

    const result = await studentdetail.updateOne(
      { _id: new mongoose.Types.ObjectId(studentId) },
      { $pull: { fees: { _id: new mongoose.Types.ObjectId(feeId) } } }
    );

    if (result.modifiedCount > 0) {
      res.send({ msg: "Fee record deleted successfully" });
    } else {
      res.send({ msg: "Fee record not found or already deleted" });
    }
  } catch (err) {
    console.error("Error deleting fee:", err);
    res.status(500).send({ msg: "Server error", error: err.message });
  }
});



router.get('/summary', async (req, res) => {
  try {
    // Count total students
    const totalstudent = await studentdetail.countDocuments();

    // Sum totalamount field from all students
    const totalAmountResult = await studentdetail.aggregate([
      { $group: { _id: null, totalamount: { $sum: "$totalamount" } } }
    ]);

    // Sum all paidamount inside fees arrays
    const paidAmountResult = await studentdetail.aggregate([
      { $unwind: "$fees" },  // Unwind fees array
      { $group: { _id: null, paidamount: { $sum: "$fees.paidamount" } } }
    ]);

    const totalamount = totalAmountResult[0]?.totalamount || 0;
    const paidamount = paidAmountResult[0]?.paidamount || 0;
    const balanceamount = totalamount - paidamount;

    res.json({
      totalstudent,
      totalamount,
      paidamount,
      balanceamount
    });

  } catch (error) {
    console.error("Error in /summary route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post('/search', async (req, res) => {
  const { query } = req.body;
  const searchRegex = new RegExp(query, 'i');

  try {
    const students = await studentdetail.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        {
          // Convert phone number to string and compare using regex
          $expr: {
            $regexMatch: {
              input: { $toString: "$phone" },
              regex: query,
              options: "i"
            }
          }
        }
      ]
    });

    res.json(students);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Error searching students" });
  }
});

// Fetch all students (for initial load)
router.post('/find', async (req, res) => {
  try {
    const students = await studentdetail.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});





module.exports=router;