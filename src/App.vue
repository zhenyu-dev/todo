<template>
  <div id="app" class="flex justify-center">
    <div class="pt-20">
      <div
        class="w-150 bg-white rounded-sm h-37.5 flex items-center justify-center"
      >
        <div class="relative w-125">
          <input
            type="text"
            class="w-full border-b-2 border-solid border-gray py-3.5 text-large outline-none text-write-primary px-3"
            placeholder="写下你想做的事"
            v-model="text"
            @keyup.enter="handleAddTodo"
          />
          <img
            src="@/assets/images/add.svg"
            class="absolute right-3 bottom-3 cursor-pointer"
            @click="handleAddTodo"
          />
        </div>
      </div>
      <ul class="w-150 bg-white rounded-sm pl-13.5 py-13.5 mt-3.5">
        <li v-for="item in todoItems" :key="item.id" class="flex justify-between items-center w-125 mb-3">
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-1/2 mr-5" :class="[ item.done ? 'bg-green' : 'bg-red' ]"></div>
            <span @click="handleToggleDone(item.id)" class="text-write-primary text-lg" :class="{ 'line-through': item.done }">{{ item.text }}</span>
          </div>
          <img
            src="@/assets/images/delete.svg"
            class="flex-shrink-0 w-6 cursor-pointer"
            @click="handleDeleteTodo(item.id)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { TODO_ITEMS } from "@/graphql/queries.gql";
import { ADD_TODO, DELETE_TODO, TOGGLE_DONE } from '@/graphql/mutations.gql'

export default {
  name: "app",
  components: {},
  apollo: {
    todoItems: {
      query: TODO_ITEMS
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleAddTodo() {
      console.log(ADD_TODO)
      const { text } = this.$data
      this.$apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          text
        }
      })
    },
    handleToggleDone(id) {
      this.$apollo.mutate({
        mutation: TOGGLE_DONE,
        variables: {
          id
        }
      })
    },
    handleDeleteTodo(id) {
      this.$apollo.mutate({
        mutation: DELETE_TODO,
        variables: {
          id
        }
      })
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
