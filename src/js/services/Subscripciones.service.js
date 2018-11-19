import {Subject} from 'rxjs';
class Newsletter{
  constructor(){
    this._count = 0;
    this._data = new Subject();
    return this;
  }

  add(item){
    this._count++; 
    this._data.next(item);
    console.log(this._count);
  }
  subscribe(callback){
    return this._data.subscribe(callback); 
  }

}

const NewsletterService = new Newsletter();
//Object.freeze(NewsletterService);

export default NewsletterService;
