import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: '/app.component.html'
})
export class AppComponent implements OnInit {

    form: FormGroup;

    ngOnInit() {
        const required = Validators.required;
        const email = Validators.email;

        this.form = new FormGroup({
            email: new FormControl('', [required, email]),
            password: new FormControl('', required)
        });
    }

    onSubmit() {
        console.log('This does work.');
    }

}
