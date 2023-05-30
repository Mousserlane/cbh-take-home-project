const crypto = require("crypto");

// Need to export this for testing purpose
exports.hashValue = (data) => {
  const dataString = typeof data !== "string" ? JSON.stringify(data) : data;
  return crypto.createHash("sha3-512").update(dataString).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  if (!event) {
    // early return if there's no input
    return TRIVIAL_PARTITION_KEY;
  }

  const MAX_PARTITION_KEY_LENGTH = 256;
  const candidate = event?.partitionKey ? JSON.stringify(event?.partitionKey) : this.hashValue(event);

  return candidate.length > MAX_PARTITION_KEY_LENGTH ? hashValue(data) : candidate;
};