console.debug = jest.fn(a => null);
console.log = jest.fn(a => null);
console.table = jest.fn(a => null);
module.exports = {k,...global};