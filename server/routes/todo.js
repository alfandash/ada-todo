var express = require('express');
var router = express.Router();

const Task = require('../model/task');
const jwt = require('../helper/jwtHelper');

router.use(jwt.loginCheck)


router.get('/', (req,res)=>{
  var query = {where: {'id_user':`${req.query.id}`}}
  Task.find()
  .populate('id_user')
  .then((documents)=>{
    res.send(documents)
  })
  .catch((error)=>{
    res.send(error)
  })
})

router.post('/', (req,res)=>{
  jwt.decode(req.headers.token,(err,decoded)=>{
    var add = {
      id_user: `${decoded.id}`,
      task: `${req.body.task}`
    }
    Task.create(add)
    .then((response)=>{
      res.send(response)
    })
    .catch((error)=>{
      res.send(error)
    })

  })
})


// status undone to done
router.put('/', (req,res)=>{
  var queryId = {'_id':`${req.query.id_task}`}
  var taskUpdate = {
    task: `${req.body.task}`,
    updated_at: new Date()
  }
  Task.updateOne(queryId,{$set: taskUpdate})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})

// status undone to done
router.put('/status', (req,res)=>{
  var queryId = {'_id':`${req.query.id_task}`}
  var taskUpdate = {
    status: `${req.query.status}`,
    updated_at: new Date()
  }
  Task.updateOne(queryId,{$set: taskUpdate})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})

router.delete('/', (req,res)=>{
  var id = {'_id':`${req.query.id_task}`}
  Task.deleteOne(id)
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })

})


module.exports = router
