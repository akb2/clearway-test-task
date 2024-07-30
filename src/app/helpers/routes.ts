import { Type } from "@angular/core";
import { Route } from "@angular/router";

export const noSubRoutes = <C>(component: Type<C>): Route[] => ([{ path: "", component }]);
