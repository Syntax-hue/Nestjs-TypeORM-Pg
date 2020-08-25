import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.header('Authorization');

    return authHeader === process.env.API_KEY;
    // the guard is used globaly in main.ts
    // test in postman with corrent API_KEY for any endpoint.
  }
}
