import { Component, Input, input } from '@angular/core';

@Component({
    selector: 'app-job-card',
    templateUrl: './job-card.html',
    styleUrl: './job-card.css'
})

export class JobCardComponent {
    @Input() title = '';
    @Input() company = '';
    @Input() location = '';
    @Input() date = '';
    @Input() description = '';
    @Input() levels = '';

    formatDate(date: string){
        const nDate = date.split("T")[0];
        return `${nDate}`
    }
}
