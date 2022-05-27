import axios from "axios"
import {log} from "util";

export default class PositionsService {
  url: string;

  constructor(){
    this.url  = 'http://localhost/position';
  }

  getPositions(){
    Promise.all([
      axios.get(this.url)
    ])
      .then(response => {
        return  response[0]
      })
      .catch( error => {
        console.log(error);
      });
  }

  deletePosition(){
    return ''
  }

  updatePosition(){
    return ''
  }
}