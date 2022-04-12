module.exports = class CustomError {
  constructor(error) {
    this.message = error.message;
    this.status = error.status;
  }
};
