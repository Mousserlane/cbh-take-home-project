const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

jest.mock('crypto', () => {
  return {
    createHash: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => "abc123458921xxx")
  }
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  // TODO : Rephrase the test description
  it("Returns 'partitionKey' value if it contains partitionKey object", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: 12345 });
    expect(partitionKey).toBe("12345");
  });
  it("Returns sha3-512 if event is not included", () => {
    const dpk = deterministicPartitionKey("12312345");
    expect(crypto.createHash).toBeCalledWith('sha3-512');
    expect(crypto.digest).toBeCalledWith("hex");

    expect(dpk).toBe("abc123458921xxx");
  });
});
