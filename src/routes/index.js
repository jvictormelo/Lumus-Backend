const express = require ('express');
const router = express.Router();

router.get('/', (req, res)=>{

res.json({message: 'Lumus Api funcionando!'})

});

router.use('/books', require('./books'))
router.use('/users', require('./users'));

module.exports = router;