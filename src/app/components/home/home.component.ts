import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.template.html',
    styles: [
      require('./home.style.scss')
    ]
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
