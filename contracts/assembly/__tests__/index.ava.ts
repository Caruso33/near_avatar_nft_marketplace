import { Worker, NEAR, NearAccount } from "near-workspaces"
import anyTest, { TestFn } from "ava"

const test = anyTest as TestFn<{
  worker: Worker
  accounts: Record<string, NearAccount>
}>

test.beforeEach(async (t) => {
  // Start the Sandbox
  const worker = await Worker.init()

  // Deploy contract
  const root = worker.rootAccount
  const contract = await root.createAndDeploy(
    root.getSubAccount("subacc1.caruso33.testnet").accountId,
    // root.getSubAccount("avatar_nft_marketplace.caruso33.testnet").accountId,
    "./out/main.wasm",
    { initialBalance: NEAR.parse("30 N").toJSON() }
  )

  // Save state for test runs, it is unique for each test
  t.context.worker = worker
  t.context.accounts = { root, contract }
})

// test("returns the default greeting", async (t) => {
//   const { contract } = t.context.accounts
//   const message: string = await contract.view("get_greeting", {})
//   t.is(message, "Hello")
// })

// test("changes the message", async (t) => {
//   const { root, contract } = t.context.accounts;
//   await root.call(contract, "set_greeting", { message: "Howdy" });
//   const message: string = await contract.view("get_greeting", {});
//   t.is(message, "Howdy");
// });

// test.afterEach(async (t) => {
//   // Stop Sandbox server
//   await t.context.worker.tearDown().catch((error) => {
//     console.log("Failed to stop the Sandbox:", error);
//   });
// });
