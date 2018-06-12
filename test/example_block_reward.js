"use strict";

const ExampleBlockReward = artifacts.require("./ExampleBlockReward.sol");

contract("ExampleBlockReward", accounts => {
  const SYSTEM = accounts[9];

  it("should calculate rewards", async () => {
    const blockReward = await ExampleBlockReward.new(SYSTEM);

    const benefactors = [
      accounts[0],
      accounts[1],
      accounts[2],
      accounts[3],
    ];

    const kind = [0, 1, 2, 3];

    // we do a local call so we can get back the return value
    const rewards = await blockReward.reward.call(benefactors, kind, { from: SYSTEM });

    // request with transaction should not fail
    await blockReward.reward(benefactors, kind, { from: SYSTEM });

    const expectedRewards = [1000, 1001, 1002, 1003];

    assert.deepEqual(rewards[0], benefactors);
    assert.deepEqual(rewards[1].map(v => v.toNumber()), expectedRewards);
  });

  it("should reject calls not coming from system", async () => {
    const blockReward = await ExampleBlockReward.new(SYSTEM);

    const benefactors = [1, 2, 3, 4];
    const kind = [0, 1, 2, 3];

    try {
      await blockReward.reward(benefactors, kind);
    } catch (err) {
      assert(err.message.includes("revert"));
      return;
    }

    assert.fail("Expected fn to throw");
  });

  it("should validate benefactors and kinds have same size", async () => {
    const blockReward = await ExampleBlockReward.new(SYSTEM);

    const benefactors = [1, 2, 3];
    const kind = [0, 1, 2, 3];

    try {
      await blockReward.reward(benefactors, kind, { from: SYSTEM });
    } catch (err) {
      assert(err.message.includes("revert"));
      return;
    }

    assert.fail("Expected fn to throw");
  });
});
