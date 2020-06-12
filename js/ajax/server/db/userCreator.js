module.exports = class User {
  constructor(payload) {
    this.id = Math.random().toString(16).substr(2, 6);
    this.name = payload.name;
    this.username = payload.username;
    this.email = payload.email || null;
    this.address = payload.address || null;
    this.phone = payload.phone || null;
    this.website = payload.website || null;
    this.company = payload.company || null;
  }
}
