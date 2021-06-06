import { Component } from '@angular/core';
import { DisplayService } from 'projects/angular/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        public displayService: DisplayService
    ) { }

    timer;

    options = [];

    cities = ['taipei', 'hualien'];
    files;
    cityEntities = { id: 'taipei' }

    optionalCities;

    ngOnInit(): void {
        let i = 0;
        this.timer = setInterval(() => {
            if (i > 5) return;
            i++;
            this.options.unshift(new Date());
        }, 1000);

        setTimeout(() => {
            this.optionalCities = ['taichung', 'kaosiung', 'taipei', 'hualien', 'taoyuan']
        }, 1000);
    }

    submit(form) {
        if (!form.valid) return console.log('invalid');
        console.log('submit', form);
    }

    addOption(event) {
        console.log(event.data);
    }

    masterChange(event) {
        // console.log(event, event.target.value);
    }

    nativeChange(event) {
        // console.log(event, event.target.value);
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
    }

    uploadFile(event) {
        console.log(event.target.value);
    }

}
