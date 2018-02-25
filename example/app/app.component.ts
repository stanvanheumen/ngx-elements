import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: '/app.component.html'
})
export class AppComponent implements OnInit {

    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            radio: new FormControl('men')
        });
    }

}
