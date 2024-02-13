import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = "rrd78KIZbOMF9l54ckuUQ7Pz5U3P4Uki"

  constructor() { }
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organiceHistory = (tag: string) => {
    tag = tag.toLocaleLowerCase()
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  async searchTag(tag: string):Promise<void> {
    if (tag.length === 0) return;
    this.organiceHistory(tag);
    fetch('https://api.giphy.com/v1/gifs/search?api_key=rrd78KIZbOMF9l54ckuUQ7Pz5U3P4Uki&q=valorant&limit=10')
    .then(resp => resp.json())
    .then(data => console.log(data))
  }
}
