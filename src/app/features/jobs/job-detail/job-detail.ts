import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { job } from '../../../core/models/job.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-job-detail',
    standalone: true,
    imports: [],
    templateUrl: './job-detail.html',
    styleUrl: './job-detail.css'
})
export class JobDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private sanitizer = inject(DomSanitizer);

    job!: job;
    contentHtml!: SafeHtml;
    protected readonly window = window;

    ngOnInit(): void {
        this.job = this.route.snapshot.data['job'];
        this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(this.job.contents);
    }

    formatDate(date: string) {
        return date.split('T')[0];
    }
}
