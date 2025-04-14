import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import type { Todo } from '../types/todo';

export const useTodoStore = defineStore('todo', () => {
  const todos = useLocalStorage<Todo[]>('todos', []);
  const filter = ref<'all' | 'active' | 'completed'>('all');

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed);
      case 'completed':
        return todos.value.filter(todo => todo.completed);
      default:
        return todos.value;
    }
  });

  function addTodo(title: string) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    todos.value.push(todo);
  }

  function removeTodo(id: string) {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
    }
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  function updateTodoTitle(id: string, title: string) {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.title = title;
    }
  }

  return {
    todos,
    filter,
    filteredTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodoTitle,
  };
});