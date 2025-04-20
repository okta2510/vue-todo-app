<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';
import TodoItem from './components/TodoItem.vue';

const todoStore = useTodoStore();
const newTodo = ref('');

function handleSubmit() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
}
</script>

<template>
  <div class="min-h-screen px-4 py-8 bg-gray-100">
    <div class="max-w-2xl mx-auto">
      <h1 class="mb-8 text-3xl font-bold text-center text-gray-900">Todo App</h1>
      
      <!-- Add Todo Form -->
      <form @submit.prevent="handleSubmit" class="mb-8">
        <div class="flex gap-4">
          <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo..."
        :class="[
          'flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
          newTodo.trim() ? 'focus:ring-blue-500' : 'focus:ring-gray-300'
        ]"
          />
          <button
        type="submit"
        :disabled="!newTodo.trim()"
        :class="[
          'px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2',
          newTodo.trim() ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-gray-400 cursor-not-allowed'
        ]"
          >
        Add
          </button>
        </div>
      </form>

      <!-- Filter Buttons -->
      <div class="flex justify-center gap-4 mb-6">
        <button
          v-for="filterOption in ['all', 'active', 'completed'] as Array<'all' | 'active' | 'completed'>"
          :key="filterOption"
          @click="todoStore.filter = filterOption || 'all'"
          :class="[
            'px-4 py-2 rounded-lg',
            todoStore.filter === filterOption
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          ]"
        >
          {{ filterOption.charAt(0).toUpperCase() + filterOption.slice(1) }}
        </button>
      </div>

      <!-- Todo List -->
      <div class="space-y-4">
        <div 
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-stretch"
        >
        <TodoItem
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
          :todo="todo"
          :onToggle="todoStore.toggleTodo"
          :onDelete="todoStore.removeTodo"
          :onUpdate="todoStore.updateTodoTitle"
        />
        </div>
      </div>
    </div>
    <footer class="mt-[50px] text-center text-gray-600">
      © {{ new Date().getFullYear() }} <a href="https://oktaviardi.com" class="text-gray-600 hover:underline">oktaviardi.com</a>
    </footer>
  </div>
</template>