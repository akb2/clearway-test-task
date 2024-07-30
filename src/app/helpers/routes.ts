import { Type } from "@angular/core";
import { Route } from "@angular/router";

/**
 * Возвращает массив маршрутов без подмаршрутов.
 *
 * @param component Компонент, который будет отображаться для данного маршрута.
 * @returns Массив маршрутов без подмаршрутов.
 * @template C Тип компонента.
 */
export const noSubRoutes = <C>(component: Type<C>): Route[] => ([{ path: "", component }]);
