import { Action } from "@ngrx/store";

export let ARTICULOS        = '[App] Articulo';
export let USER             = '[App] User';
export let TOKEN            = '[App] Token';

export class ArticulosAction implements Action {
    readonly type = ARTICULOS;
    constructor( public payload: object,  public opt: string){}
}
export class UserAction implements Action {
    readonly type = USER;
    constructor( public payload: object,  public opt: string){}
}
export class TokenAction implements Action {
    readonly type = TOKEN;
    constructor( public payload: object,  public opt: string){}
}

export type actions = UserAction            |
                      ArticulosAction       |
                      TokenAction           ;