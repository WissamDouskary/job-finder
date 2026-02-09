import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const _loading = inject(NgxSpinnerService);
    _loading.show();
    return next(req).pipe(
        finalize(() => {
            _loading.hide();
        })
    );
}