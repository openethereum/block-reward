"use strict";

const ExampleBlockReward = artifacts.require("./ExampleBlockReward.sol");

contract("ExampleBlockReward", accounts => {
  // since we can't do system calls with truffle this is the only thing we can test
  it("should reject calls not coming from system", async () => {
    const block_reward = await ExampleBlockReward.new();

    let benefactors = [1, 2, 3, 4];
    let kind = [0, 1, 2, 3];

    try {
      await block_reward.reward(benefactors, kind);
    } catch (err) {
      assert(err.message.includes("revert"));
      return;
    }

    assert.fail("Expected fn to throw");
  });
});
