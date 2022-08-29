# Avatar NFT Marketplace

## Docs

### Contract address

```shell
❯ yarn near create-account avatar_nft_marketplace.caruso33.testnet --masterAccount caruso33.testnet --initialBalance 5
yarn run v1.22.15
$ /Users/tobias/Code/near_avatar_nft_marketplace/contracts/node_modules/.bin/near create-account avatar_nft_marketplace.caruso33.testnet --masterAccount caruso33.testnet --initialBalance 5
Saving key to '/Users/tobias/.near-credentials/testnet/avatar_nft_marketplace.caruso33.testnet.json'
Account avatar_nft_marketplace.caruso33.testnet for network "testnet" was created.
✨  Done in 5.11s.
```

### Deployment

```shell
❯ yarn near deploy --accountId=avatar_nft_marketplace.caruso33.testnet --wasmFile ./build/release/near_avatar_nft_marketplace.wasm
yarn run v1.22.15
$ /Users/tobias/Code/near_avatar_nft_marketplace/contracts/node_modules/.bin/near deploy --accountId=avatar_nft_marketplace.caruso33.testnet --wasmFile ./build/release/near_avatar_nft_marketplace.wasm
Starting deployment. Account id: avatar_nft_marketplace.caruso33.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: ./build/release/near_avatar_nft_marketplace.wasm
Transaction Id 2mwuTrHhp9psSAPhS9h2Keb8jknRAdi3fTq2tbyWf5ch
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/2mwuTrHhp9psSAPhS9h2Keb8jknRAdi3fTq2tbyWf5ch
Done deploying to avatar_nft_marketplace.caruso33.testnet
✨  Done in 14.19s.
```

https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json

### Create Avatar

```shell
❯ yarn near call avatar_nft_marketplace.caruso33.testnet setAvatar '{"avatar": {"id": "0", "name": "0d3ea896b185a709ea", "description": "Multiavatar", "uri": "https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json", "isOnSale": true, "price": "1000000000000000000000000", "ownerHistory": []}}' --accountId=caruso33.testnet
yarn run v1.22.15
$ /Users/tobias/Code/near_avatar_nft_marketplace/contracts/node_modules/.bin/near call avatar_nft_marketplace.caruso33.testnet setAvatar '{"avatar": {"id": "0", "name": "0d3ea896b185a709ea", "description": "Multiavatar", "uri": "https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json", "isOnSale": true, "price": "1000000000000000000000000", "ownerHistory": []}}' --accountId=caruso33.testnet
Scheduling a call: avatar_nft_marketplace.caruso33.testnet.setAvatar({"avatar": {"id": "0", "name": "0d3ea896b185a709ea", "description": "Multiavatar", "uri": "https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json", "isOnSale": true, "price": "1000000000000000000000000", "ownerHistory": []}})
Doing account.functionCall()
Transaction Id DRCuq1CZVcenEzCuTWG9Qnq8Hg38b7zxW8mzCJMxzXcy
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/DRCuq1CZVcenEzCuTWG9Qnq8Hg38b7zxW8mzCJMxzXcy
''
✨  Done in 6.55s.
```

### Viewing

```shell
❯ yarn near view avatar_nft_marketplace.caruso33.testnet getAvatar '{"id": "0"}'
yarn run v1.22.15
$ /Users/tobias/Code/near_avatar_nft_marketplace/contracts/node_modules/.bin/near view avatar_nft_marketplace.caruso33.testnet getAvatar '{"id": "0"}'
View call: avatar_nft_marketplace.caruso33.testnet.getAvatar({"id": "0"})
{
  id: '0',
  name: '0d3ea896b185a709ea',
  description: 'Multiavatar',
  uri: 'https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json',
  isOnSale: true,
  price: '1000000000000000000000000',
  owner: 'caruso33.testnet',
  ownerHistory: []
}
✨  Done in 1.82s.
```
