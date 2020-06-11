import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { NsAuthenticateService } from './ns-authenticate.service';

/**
 * Wrapper function to build angular Route to a component on specific path with permission assigned
 * @param path Path to component
 * @param component Angular component
 * @param permissionId ID of permission user must have to be able to access this route
 */
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
