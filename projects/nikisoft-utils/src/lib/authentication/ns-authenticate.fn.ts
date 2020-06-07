import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { NsAuthenticateService } from './ns-authenticate.service';

export function buildSecureRouteToComponent(path: string, component: Type<any>, permissionId): Route {
  return {
    path,
    component,
    canActivate: [NsAuthenticateService],
    data: {
      permission: permissionId,
    },
  };
}
