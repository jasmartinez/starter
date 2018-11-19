import axios from 'axios';
import { normalize, schema } from 'normalizr';

const author = new schema.Entity('autor');
const links = new schema.Entity('links');
const images = new schema.Entity('images');
const linksListSchema = new schema.Array(links);
const imagesListSchema = new schema.Array(images);
const comments = new schema.Entity('comments',{
  'author':author,
  'links':linksListSchema,
  'images':imagesListSchema
},{
  processStrategy:(entity)=>{
    let temp = {};
    //delete Object.assign(temp,entity).body;
    Object.assign(temp,entity).body;
    return temp;
  }
});
const commentsListSchema = new schema.Array({
  guest:comments,
  admin:comments,
  registered:comments
},(input,parent,key)=>input.type);

const commentsService = () =>{
  return new Promise((resolve, reject) => {
    axios.get('/api/comments')
            .then((response) => resolve(normalize(response.data,commentsListSchema)))
            .catch(err => reject(err))
  });
}

const interfaceService = {
  commentsService : commentsService
}
export default interfaceService;
