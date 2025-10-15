
const __docs: Record<string, any> = {
  branches: {
    "1": { name: "HQ", address: "123 Main", phone: "204-555-0100", createdAt: "", updatedAt: "" },
  },
  employees: {
    "1": { name: "Test Emp", email: "t@e.com", position: "Teller", branchId: "1", department: "Loans", createdAt: "", updatedAt: "" },
  },
};

jest.mock("../config/firebaseConfig", () => {
  const makeDoc = (collectionName: string, id: string) => {
    return {
      get: jest.fn(async () => {
        const exists = !!__docs[collectionName]?.[id];
        return {
          exists,
          id,
          data: () => (__docs[collectionName]?.[id] ?? null),
        };
      }),
      set: jest.fn(async (data: any) => {
        __docs[collectionName] = __docs[collectionName] || {};
        __docs[collectionName][id] = data;
      }),
      update: jest.fn(async (data: any) => {
        __docs[collectionName] = __docs[collectionName] || {};
        __docs[collectionName][id] = { ...(__docs[collectionName][id] || {}), ...data };
      }),
      delete: jest.fn(async () => {
        if (__docs[collectionName]) delete __docs[collectionName][id];
      }),
    };
  };

  const makeCollection = (collectionName: string) => ({
    doc: jest.fn((id?: string) => makeDoc(collectionName, String(id))),
    add: jest.fn(async (data: any) => {
      __docs[collectionName] = __docs[collectionName] || {};
      const nextId =
        String(
          Math.max(
            0,
            ...Object.keys(__docs[collectionName]).map((x) => Number.isNaN(Number(x)) ? 0 : Number(x))
          ) + 1
        );
      __docs[collectionName][nextId] = data;
      return { id: nextId };
    }),
    get: jest.fn(async () => {
      const entries = Object.entries(__docs[collectionName] || {});
      return {
        docs: entries.map(([id, data]) => ({
          id,
          data: () => data,
        })),
      };
    }),
    where: jest.fn((field: string, _op: string, value: any) => ({
      get: jest.fn(async () => {
        const items = Object.entries(__docs[collectionName] || {})
          .filter(([, data]) => (data as any)?.[field] === value)
          .map(([id, data]) => ({ id, data: () => data }));
        return { docs: items };
      }),
    })),
  });

  return {
    auth: {
      verifyIdToken: jest.fn(),
      getUser: jest.fn(),
    },
    db: {
      collection: jest.fn((name: string) => makeCollection(name)),
      runTransaction: jest.fn(async (fn: any) => fn({})),
      batch: jest.fn(() => ({
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        commit: jest.fn(async () => {}),
      })),
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetModules();
});
