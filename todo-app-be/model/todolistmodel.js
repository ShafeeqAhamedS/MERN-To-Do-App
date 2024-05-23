const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  text : {
    type:String,
    require:true,
    unique: true,
    index:true
  },
  status:{
    type:Boolean,
    require:true
  }
})

module.exports = mongoose.model('list', listSchema)