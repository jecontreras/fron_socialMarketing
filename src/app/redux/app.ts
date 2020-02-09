// app.ts

import * as _action from './app.actions';
import * as _ from 'lodash';

let APP = dropt();
let data:any;
function dropt(){
  return {
    user: Object(),
    articulos: Array()
  };
}
export function appReducer(state: any = APP, action: _action.actions) {
  if(JSON.parse(localStorage.getItem('APP'))) {
    state = JSON.parse(localStorage.getItem('APP'));
    validacion_key(state);
  }
  else {
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(state));
  }
  // console.log(state);
  function local_Storage(APP){
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(APP));
    state = JSON.parse(localStorage.getItem('APP'));
    return state
  }
  function proceso_data(lista:any, data:any, opt){
    let idx = _.findIndex(lista, ['id', data.id]);
    if(idx >-1){
      if(opt === 'delete') lista.splice(idx, 1);
      else lista[idx]= data;
    }else{
      if(opt === 'post') lista.push(data);
    }
    return lista;
  }
  function validacion_key(state){
    if(!state.articulos) state.articulos = [];
    if(!state.user) state.user = {};
  }
  function data_borrar(modelo){
    if(state[modelo]){
      state[modelo]=[];
    }
  }
  switch (action.type) {
    case _action.ARTICULOS:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.articulos) state.articulos = [];
          data = proceso_data(state.articulos,action.payload, 'post');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.articulos,action.payload, 'put');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.articulos,action.payload, 'delete');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.articulos = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.USER: {
      switch(action.opt) {
        case 'post' :
          if(!state.user) state.user = {};
            state.user = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.user = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.user = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.user = {};
          return local_Storage(state);
        }
        break;
      }
    }
    break;
    default: return state;
  }
}
