import { Component } from '@angular/core';
import { JobCardComponent } from '../../../shared/components/job-card/job-card';

@Component({
    selector: 'app-jobs-page',
    imports: [JobCardComponent],
    templateUrl: './jobs-page.html',
    styleUrl: './jobs-page.css'
})
export class JobsPageComponent { }
