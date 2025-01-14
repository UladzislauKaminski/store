import {
  Action,
  Selector,
  State,
  StateContext,
  NgxsOnInit,
  NgxsAfterBootstrap
} from '@ngxs/store';

import { AddTodo, RemoveTodo } from '@integration/store/todos/todo/todo.actions';
import { Todo } from '@integration/store/todos/todos.model';
import { Injectable } from '@angular/core';

@State<Todo[]>({
  name: 'todo',
  defaults: []
})
@Injectable()
export class TodoState implements NgxsOnInit, NgxsAfterBootstrap {
  @Selector()
  static getPandas(state: Todo[]): Todo[] {
    return state.filter(s => s.indexOf('panda') > -1);
  }

  ngxsOnInit({ getState, setState }: StateContext<Todo[]>) {
    const state: Todo[] = getState();
    const payload: Todo = 'NgxsOnInit todo';
    if (!state.includes(payload)) {
      setState([...state, payload]);
    }
  }

  ngxsAfterBootstrap({ getState, setState }: StateContext<Todo[]>): void {
    const state: Todo[] = getState();
    const payload: Todo = 'NgxsAfterBootstrap todo';
    if (!state.includes(payload)) {
      setState([...state, payload]);
    }
  }

  @Action(AddTodo)
  addTodo({ setState }: StateContext<Todo[]>, { payload }: AddTodo) {
    setState(state => [...state, payload]);
  }

  @Action(RemoveTodo)
  removeTodo({ setState }: StateContext<Todo[]>, { payload }: RemoveTodo) {
    setState(state => state.filter((_, i) => i !== payload));
  }
}
