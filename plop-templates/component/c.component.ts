import { Component, OnInit } from '@angular/core';

@Component({
    selector: '{{dashCase selector}}',
    templateUrl: './{{dashCase name}}.template.html',
    styles: [
      require('./{{dashCase name}}.style.scss')
    ]
})
export class {{properCase name}}Component implements OnInit {
    constructor() { }

    ngOnInit() { }

}
