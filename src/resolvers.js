import { TODO_ITEMS } from '@/graphql/queries.gql'
import shortid from 'shortid'

export default {
  Mutation: {
    addTodo(_, { text }, { cache }) {
      const { todoItems } = cache.readQuery({ query: TODO_ITEMS })
      cache.writeQuery({
        query: TODO_ITEMS,
        data: {
          todoItems: [
            ...todoItems,
            {
              __typename: 'Item',
              id: shortid.generate(),
              text,
              done: false
            }
          ]
        }
      })
      return true
    },
    deleteTodo(_, { id }, { cache }) {
      const { todoItems } = cache.readQuery({ query: TODO_ITEMS })
      cache.writeQuery({
        query: TODO_ITEMS,
        data: { todoItems: todoItems.filter(item => item.id !== id) }
      })
      return true
    },
    toggleDone(_, { id }, { cache }) {
      const { todoItems } = cache.readQuery({ query: TODO_ITEMS })
      cache.writeQuery({
        query: TODO_ITEMS,
        data: {
          todoItems: todoItems.map(item => {
            if (item.id === id) return { ...item, done: !item.done }
            else return item
          })
        }
      })
      return true
    }
  }
};
