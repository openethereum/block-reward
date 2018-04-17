# block-reward

[![Build Status][travis-image]][travis-url]
[![Solidity Coverage Status][coveralls-image]][coveralls-url]

[travis-image]: https://travis-ci.org/parity-contracts/block-reward.svg?branch=master
[travis-url]: https://travis-ci.org/parity-contracts/block-reward
[coveralls-image]: https://coveralls.io/repos/github/parity-contracts/block-reward/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/parity-contracts/block-reward?branch=master

This repository contains the block reward contract interface which can be used with
[parity](https://github.com/paritytech/parity) to determine block rewards.

The block reward contract has the following interface:

```solidity
interface BlockReward {
    // produce rewards for the given benefactors, with corresponding reward codes.
    // only callable by `SYSTEM_ADDRESS`
    function reward(address[] benefactors, uint16[] kind)
		external
		returns (address[], uint256[]);
}
```

The kind array should have the same length as the benefactors array. The significance of the kind
values will vary between consensus engines, e.g. ethash might use it to differentiate between block
author rewards and uncle rewards.

The function should return two arrays of equal length. One containing addresses to reward, and the
other the corresponding balance increases.

Additionally, this repo also contains an example implementation of the block reward contract (which
is used in parity's test suite).
