QUnit.module('Unit tests', {
  before: () => maxAsyncDelay = 100, //Sets the mock delay for getAttrs and setAttrs to a maximum of 1000ms.
  beforeEach: () => {
    //Resets attributes before each test
    attributes = {}
    sectionIDS = {}
  }
})