import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-job-card',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './job-card.html',
    styleUrl: './job-card.css'
})

export class JobCardComponent {
    @Input() id = '';
    @Input() title = '';
    @Input() company = '';
    @Input() location = '';
    @Input() date = '';
    @Input() description = '';
    @Input() levels = '';

    formatDate(date: string) {
        const nDate = date.split("T")[0];
        return `${nDate}`
    }
}
