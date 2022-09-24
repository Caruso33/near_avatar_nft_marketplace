import { PersistentUnorderedMap, u128, context } from "near-sdk-as"

@nearBindgen
export class Avatar {
  id: string
  name: string
  description: string

  uri: string
  isOnSale: bool
  price: u128 // yocto = 10**-24

  owner: string
  ownerHistory: Array<string>

  public static fromPayload(payload: Avatar): Avatar {
    const avatar = new Avatar()
    avatar.id = payload.id
    avatar.name = payload.name
    avatar.description = payload.description

    avatar.uri = payload.uri
    avatar.isOnSale = payload.isOnSale
    avatar.price = payload.price

    avatar.owner = context.sender
    avatar.ownerHistory = payload.ownerHistory

    return avatar
  }

  public setOnSale(isOnSale: bool, price: u128): void {
    this.isOnSale = isOnSale
    this.price = price
  }

  public setNewOwner(owner: string): void {
    this.owner = owner
  }

  public addOwnerToHistory(prevOwner: string): void {
    this.ownerHistory.push(prevOwner)
  }
}

export const listedAvatars = new PersistentUnorderedMap<string, Avatar>(
  "AVATARS"
)
