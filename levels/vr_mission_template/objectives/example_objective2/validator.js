/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const path = require('path');
const assert = require('assert');

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { sourceCodePath } = helper.validationFields;

  // Next, you test the user input - fail fast if they get one of the
  // answers wrong, or some aspect is wrong! Don't provide too much
  // negative feedback at once, have the player iterate.
  if (!sourceCodePath) {
    return helper.fail(`
      Please provide a valid file path to where your source code lives.
    `);
  }

  const boop = require(path.join(sourceCodePath, 'objective.js'));

  try {
    assert.strictEqual('boop', boop());
  } catch (e) {
    return helper.fail(`
      Your function does not, in fact, boop.
    `);
  }

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`You did it!`, [
    { name: 'SOURCE_CODE_PATH', value: sourceCodePath },
  ]);
};
