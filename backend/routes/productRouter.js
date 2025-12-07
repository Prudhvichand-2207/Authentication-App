const { ensureauthenticated } = require('../middlewares/Auth');

const router=require('express').Router();

router.get('/',ensureauthenticated,(req,res)=>{
    res.status(200).json([
    {
      name:"mobile",
      cost:20000
    },
    {
        name:"smart tv",
        cost:50000

    }
])
});
module.exports=router;
