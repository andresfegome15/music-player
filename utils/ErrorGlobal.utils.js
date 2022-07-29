class GlobalError extends Error {
  constructor(message, codeStatus) {
    super(message);

    this.message = message;
    this.codeStatus = codeStatus;
    this.status = `${codeStatus}`.startsWith("5")
      ? "fail server"
      : "fail client";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { GlobalError };
