import axios from 'axios';
import { normalize, schema } from 'normalizr';

const todoItemSchema = new schema.Entity('todoItemList');
const todoListSchema = new schema.Array(todoItemSchema);

const todoListService = () =>{
  return new Promise((resolve, reject) => {
    axios.get('/api/todoList')
            .then((response) => resolve(normalize(response.data,todoListSchema)))
            .catch(err => reject(err))
  });
}

const interfaceService = {
  getTodoListService : todoListService
}
export default interfaceService;
