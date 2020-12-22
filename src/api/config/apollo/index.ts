import ApolloClient from 'apollo-client';
// import {ApolloLink} from 'apollo-link';
// import { createUploadLink } from "apollo-upload-client"; // 替换 apollo-like-http 可以上传文件
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import {ErrorResponse, onError} from 'apollo-link-error';
import { OperationVariables } from "apollo-client/core/types";
import { MutationOptions, QueryOptions } from "apollo-client/core/watchQueryOptions";
// import {GraphQLError} from "graphql";
// import {ServerError, ServerParseError} from "apollo-link-http-common";

const fragmentMatcher: any = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Document',
          possibleTypes: [
            { name: 'MyInterface1' },
            { name: 'SomeInterface2' },
          ],
        },
      ],
    },
  },
});

const apolloClient = new ApolloClient({
  // link: errorLink.concat(authLink),
  cache: new InMemoryCache({ fragmentMatcher }),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
      // fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

const defRes = {
  code: -1,
  msg: '请求异常',
  data: null
};

/**
 * apolloClient query 请求
 * @param query
 * @param field
 */
export const query = async (query: QueryOptions<OperationVariables>, field: string): Promise<HttpRes> => {
  try {
    const { data }: any = await apolloClient.query(query);
    if (!data)
      return defRes;
    const res = data[field];
    return res || defRes;
  } catch (e) {
    console.error(e);
    return defRes;
  }
};

/**
 * apolloClient mutate 请求
 * @param mutate
 * @param field
 */
export const mutation = async (mutate: MutationOptions<any, OperationVariables>, field: string): Promise<HttpRes> => {
  try {
    const { data }: any = await apolloClient.mutate(mutate);
    if (!data)
      return defRes;
    const res = data[field];
    return res || defRes;
  } catch (e) {
    console.error(e);
    return defRes;
  }
};
