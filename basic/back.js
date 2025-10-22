 let add_form = (e) => {
  e.preventDefault();

  const payload = {
    _id: state.id,
    totalamount: totalamount,
    paidamount: paidamount,
    paiddate: paiddate,
    balanceamount: calculateBalance(),
  };

  axios
    .post("http://localhost:3003/studentdetail/addfees", payload)
    .then((res) => {
      alert(res.data.msg);
      setstatusupdate("added");

      // Reload fees
      axios
        .post("http://localhost:3003/studentdetail/viewbyid", { _id: state.id })
        .then((res) => {
          const data = res.data;
          setstudentname(data.name);
          setfees(data.fees);
          
        });
    })
    .catch((err) => {
      console.error("Submit error:", err);
      alert("Error occurred while submitting");
    });
};

  useEffect(() => {
    if (state?.id) {
      axios
        .post("http://localhost:3003/studentdetail/viewbyid", { _id: state.id })
        .then((res) => {
          const data = res.data;
          setstudentname(data.name);
          //setfees(Array.isArray(data.fees) ? data.fees : []);
          setfees(data.fees);
        })
        .catch((err) => {
          console.log("Error fetching data:", err);
          setfees([]);
        });
    }
  }, [state]);


  router.post("/addfees", async (req, res) => {
 const _id =req.body._id;
     const total = req.body.totalamount;
  const paid = req.body.paidamount;
  const balance = total - paid;

  const feeEntry = {
    totalamount: total,
    paidamount: paid,
    paiddate: req.body.paiddate,
    balanceamount: balance
};

      const updatefees = await studentdetail.findOneAndUpdate(
        { _id}, // use _id for unique identification (best practice)
        {
          $push:{
            fees:feeEntry
          }
         
        },
       // { new: true } // returns updated document
      );
  
      if (updatefees) {
        res.send({ msg: "updated" });
      } else {
        res.send({ msg: "unable to update" });
      }
    
  });