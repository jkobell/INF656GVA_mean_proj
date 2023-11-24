import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AdminService } from "./admin.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private adminService: AdminService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.adminService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `JWT ${accessToken}` 
            }
        });
        return next.handle(req);
    }
}