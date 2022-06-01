import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from "apollo-upload-client"; // 替换 apollo-like-http 可以上传文件
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ErrorResponse, onError } from 'apollo-link-error';
import { getToken, setToken } from '@/libs/util';
import config from "@/config"
import router from "@/router";
import { OperationVariables } from "apollo-client/core/types";
import { MutationOptions, QueryOptions } from "apollo-client/core/watchQueryOptions";
import { GraphQLError } from "graphql";
import { ServerError, ServerParseError } from "apollo-link-http-common";
import { RES_CODE } from "@/api/const";

const env: any = process.env.NODE_ENV;

const onGraphqlErr = (err: ReadonlyArray<GraphQLError> | undefined) => {
  if (!err) {
    console.error(err);
  }
};

const onServerErr = (err: ServerError) => {
  const statusCode = err.statusCode;
  if (statusCode !== 200) {
    console.error(err.message);
    return;
  }
  const { code, msg } = err.result;
  switch (code) {
    // 跳转到登陆页
    case RES_CODE.ERROR_TOKEN:
    case RES_CODE.NEED_TOKEN:
    case RES_CODE.OVERDUE_TOKEN:
      setToken("");
      router.replace({ name: env === 'production' ? 'oauth' : 'wgn' }).catch();
      break;
    default:
      console.error(msg);
  }
};

const onNetworkErr = (err: Error | ServerError | ServerParseError | undefined) => {
  if (!err)
    return;
  switch (err.name) {
    case 'ServerError':
      onServerErr(err as ServerError);
      break;
    case 'ServerParseError':
      // const response = (err as ServerParseError).response;
      // const statusCode = (err as ServerParseError).statusCode;
      // const bodyText = (err as ServerParseError).bodyText;
      console.error(err.message);
      break;
  }
};

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

const errorLink = onError((err: ErrorResponse) => {
  const { graphQLErrors, networkError } = err;
  onGraphqlErr(graphQLErrors);
  onNetworkErr(networkError);
});
const httpLink: any = createUploadLink({
  uri: config.serverUrl + '/graphql', // 此时的地址用的事config中的反向代理名,具体可在vue.config.js中查阅
  credentials: 'same-origin', // omit:忽略,include:包含, same-origin:同源
  /* 这个属性的意思是在同源的情况下携带cookie,因为vue-apollo本身发送的是一个fetch请求，所以在发送请求时不会自动携带cookie，所以我们需要加上此属性 */
});

const middlewareLink = new ApolloLink((operation: any, forward: any): any => {
  const token = getToken();
  operation.setContext({ headers: token ? { token } : {} });
  return forward(operation).map((response: any): any => response);
});

const authLink: any = middlewareLink.concat(httpLink);

const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink),
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
