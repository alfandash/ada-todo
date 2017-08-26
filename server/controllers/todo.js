
// add model
const Task = require('../model/task');

// add controllers
const jwt = require('../helper/jwtHelper');

exports.findById = (req,res)=>{
  var query = {'id_user':`${req.query.id}`}
  Task.find(query)
  .populate('id_user')
  .then((documents)=>{
    res.send(documents)
  })
  .catch((error)=>{
    res.send(error)
  })
}

exports.create = (req,res)=>{
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
}

exports.edit = (req,res)=>{
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
}

exports.editStatus = (req,res)=>{
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
}

exports.delete = (req,res)=> {
  var id = {'_id':`${req.query.id_task}`}
  Task.deleteOne(id)
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
}
