import axios from "axios"

export class PositionsService {
  url: string;

  constructor(){
    this.url  = 'http://localhost/position';
  }

  getPositions(){

  }

  deletePostion(){

  }

  updatePostion(){

  }

  get positions(){
    return this.getPositions();
  }
}