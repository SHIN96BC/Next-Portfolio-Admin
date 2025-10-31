import { makeExecutableSchema } from '@graphql-tools/schema';

/**
 * ✅ SDL (GraphQL type 정의)
 * - 실제 서버의 타입과 동일하게 유지하면 코드 수정 없이 그대로 전환 가능
 */
const typeDefs = /* GraphQL */ `
  type MockUser {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
  }

  type MockOrder {
    id: ID!
    userId: ID!
    total: Int!
    status: String!
    createdAt: DateTime!
  }

  type MockQuery {
    users: [MockUser!]!
    user(id: ID!): MockUser
    orders(userId: ID): [MockOrder!]!
  }

  type MockMutation {
    createUser(name: String!, email: String!): MockUser!
    createOrder(userId: ID!, total: Int!): MockOrder!
  }
`;

/**
 * ✅ 인메모리 DB (테스트용)
 */
const db = {
  users: [
    { id: '1', name: 'Alice', email: 'a@x.com', createdAt: new Date() },
    { id: '2', name: 'Bob', email: 'b@x.com', createdAt: new Date() },
  ],
  orders: [
    {
      id: '101',
      userId: '1',
      total: 32000,
      status: 'PAID',
      createdAt: new Date(),
    },
    {
      id: '102',
      userId: '2',
      total: 18000,
      status: 'PENDING',
      createdAt: new Date(),
    },
  ],
};

/**
 * ✅ 리졸버
 * - 간단한 CRUD 로직
 */
const resolvers = {
  MockQuery: {
    users: () => db.users,
    user: (_: any, { id }: { id: string }) => db.users.find((u) => u.id === id) ?? null,
    orders: (_: any, { userId }: { userId?: string }) =>
      userId ? db.orders.filter((o) => o.userId === userId) : db.orders,
  },

  MockMutation: {
    createUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = {
        id: String(Date.now()),
        name,
        email,
        createdAt: new Date(),
      };
      db.users.push(newUser);
      return newUser;
    },

    createOrder: (_: any, { userId, total }: { userId: string; total: number }) => {
      const newOrder = {
        id: String(Date.now()),
        userId,
        total,
        status: 'PAID',
        createdAt: new Date(),
      };
      db.orders.push(newOrder);
      return newOrder;
    },
  },
};

/**
 * ✅ 실행 가능한 스키마 생성
 */
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
