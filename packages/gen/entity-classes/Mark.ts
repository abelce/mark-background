import { IMark } from '../entity-interfaces/Mark'

export class Mark implements IMark {

  id: string
  title: string
  url: string
  isDeleted: string
  isRead: string
  createTime: number
  lastUpdatedTime: number
  isStar: boolean

  constructor({id, title, url, isDeleted, isRead, createTime, lastUpdatedTime, isStar}: IMark={}){
    this.id = id;
    this.title = title;
    this.url = url;
    this.isDeleted = isDeleted;
    this.isRead = isRead;
    this.createTime = createTime;
    this.lastUpdatedTime = lastUpdatedTime;
    this.isStar = isStar;
  }
}