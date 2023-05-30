const { deterministicPartitionKey, hashValue } = require("./dpk");
const crypto = require('crypto');

const MOCK_SHA_VALUE = "abc123458921xxx"
jest.mock('crypto', () => {
  return {
    createHash: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => MOCK_SHA_VALUE),
  }
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  // TODO : Rephrase the test description
  it("Returns 'partitionKey' when partitionKey object exists", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: 12345 });
    expect(partitionKey).toBe("12345");
  });

  it("Returns sha3-512 if it has an input", () => {
    const dpk = deterministicPartitionKey("12312345abc123??");
    expect(dpk).toBe(MOCK_SHA_VALUE);
  });
});

describe("hashValue", () => {
  it("Returns hash with sha3-512 with hex encoding", () => {
    const hashedValue = hashValue("Abc123456");
    expect(crypto.createHash).toBeCalledWith('sha3-512');
    expect(crypto.digest).toBeCalledWith("hex");

    expect(hashedValue).toBe(MOCK_SHA_VALUE);
  });
});
