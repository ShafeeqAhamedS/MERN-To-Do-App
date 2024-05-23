const express = require('express');
const router = express.Router();

const {getAllItems, addTodoItem, updateTodoItem, getList, getAList, deleteAListItem} = require('../controllers/todolistcontroller')

router.route('/').get(getAllItems).post(addTodoItem)
router.route('/:id').patch(getList,updateTodoItem).get(getList,getAList).delete(getList,deleteAListItem)

module.exports = router;