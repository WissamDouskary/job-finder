import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { jobService } from '../services/jobs.service';
import { job } from '../models/job.model';

export const jobResolver: ResolveFn<job> = (route, state) => {
    const service = inject(jobService);
    const id = route.paramMap.get('id')!;
    return service.getJobById(Number(id));
};
