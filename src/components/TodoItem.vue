<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '../types/todo';

const props = defineProps<{
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}>();

const isEditing = ref(false);
const editedTitle = ref(props.todo.title);

function startEditing() {
  isEditing.value = true;
  editedTitle.value = props.todo.title;
}

function saveEdit() {
  if (editedTitle.value.trim()) {
    props.onUpdate(props.todo.id, editedTitle.value.trim());
  }
  isEditing.value = false;
}
</script>

<template>
  <div class="relative p-4 bg-white rounded-lg shadow-sm items-top pb-[50px]">
    <div class="flex gap-4 top">
        <div class="left w-[30px] pt-[3px]">
          <input
          type="checkbox"
          :checked="todo.completed"
          @change="onToggle(todo.id)"
          class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <div class="justify-start w-full right">
      <div class="block">
        <div v-if="!isEditing" class="flex-1">
          <span
            @dblclick="startEditing"
            :class="{ 'line-through text-gray-400': todo.completed }"
            class="text-gray-700"
          >
            {{ todo.title }}
          </span>
        </div>
        <textarea
          v-else
          v-model="editedTitle"
          @blur="saveEdit"
          @keyup.enter="saveEdit"
          @keyup.esc="isEditing = false"
          rows="3"
          class="flex-1 w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref="editInput"
          v-focus
        />
      </div>
    </div>
    </div>

    <div class="absolute bottom-[10px] right-[15px] pt-2 mt-2 gap-2 flex">
      <button
        v-if="!isEditing && !todo.completed"
        @click="isEditing = true"
        class="text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" 
          stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
      <button
        @click="onDelete(todo.id)"
        class="text-red-500 hover:text-red-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      </div>
  </div>
</template>