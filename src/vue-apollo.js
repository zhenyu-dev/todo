import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import typeDefs from "@/graphql/schemas.gql";
import resolvers from "@/resolvers";

Vue.use(VueApollo);

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    todoItems: [
      {
        __typename: "Item", // 在 schemas.gql 中定义的名字
        id: "PPBqWA9", // 我这里是使用 shortid 随机生产的
        text: "想办法干他一炮",
        done: false
      }
    ]
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
