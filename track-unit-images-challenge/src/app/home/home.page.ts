import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  Images;
  CurrImages = [];
  Index = 0;

  constructor(
    private httpClient: HttpClient,
  ) {}

  async ngOnInit() {

    this.Images = await this.getInformation('birds');

    console.log(this.Images[0].images.downsized_medium.url);
    
    this.updateCurrImages(0);
  }



  updateFilter(event) {

    try {
      const val = event.target.value.toLowerCase();

    } catch (error) {
      console.log(error);
      
    }
  }


  updateCurrImages(direction, picsToShow=3){
    
    const tmp = this.Index + direction * picsToShow;
    
    if (tmp > this.Images.length - 1 || tmp < 0){
      return;
    }

    this.Index = tmp;

    this.CurrImages = [];

    for (let i = this.Index; i < this.Index + picsToShow; i++) {
      
      if (i > this.Images.length - 1){
        return;
      }
      this.CurrImages.push(this.Images[i]);
      
    }
  }





  async getInformation(search) {

    const params = {
      api_key: '1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq',
      rating: 'g',
      q: search,
      limit: 10
    }

    const headers = {
    };

    return await this.httpClient.get('http://api.giphy.com/v1/gifs/search	', { params, headers },
    ).toPromise().then(res => {
      console.log(res);
      
      return new Promise((resolve, reject) => resolve(res['data']));

    },
      (err => {
        console.log(err);
        
        return new Promise((resolve, reject) => reject(err));
      }));


  }

}
