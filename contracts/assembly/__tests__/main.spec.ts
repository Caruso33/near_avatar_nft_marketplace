import { setAvatar, getAvatars } from ".."

describe("Avatar ", () => {
  it("should create an avatar and return it according to provided data", () => {
    expect(
      setAvatar<SetAvatarData>({
        avatar: {
          id: 0,
          name: "0d3ea896b185a709ea",
          description: "Multiavatar",
          uri: "https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json",
          isOnSale: true,
          price: "1000000000000000000000000",
          ownerHistory: [],
        },
      } : SetAvatarData)
    )
    // expect(setAvatar(avatarData))
    // expect(true).toBe(true)

    // expect(getAvatars()).toBe(avatarData)
  })
})

type SetAvatarData = {
  avatar: Record<string, any>
}

// const avatarData = {
//   avatar: {
//     id: 0,
//     name: "0d3ea896b185a709ea",
//     description: "Multiavatar",
//     uri: "https://ipfs.io/ipfs/QmR7R4Q3NZkzbveCw88NQwi8RToBwm54wwJ1tFh9why291?filename=0.json",
//     isOnSale: true,
//     price: "1000000000000000000000000",
//     ownerHistory: [],
//   },
// }
