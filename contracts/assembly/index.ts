import { Avatar, listedAvatars } from "./model"
import { ContractPromiseBatch, context, u128 } from "near-sdk-as"
// import { console } from "assemblyscript/std/assembly/bindings/dom"

export function setAvatar(avatar: Avatar): void {
  let storedAvatar = listedAvatars.get(avatar.id)

  if (storedAvatar !== null) {
    throw new Error(`an avatar with ${avatar.id} already exists`)
  }

  listedAvatars.set(avatar.id, Avatar.fromPayload(avatar))
}

export function getAvatar(id: string): Avatar | null {
  return listedAvatars.get(id)
}

export function getAvatars(): Avatar[] {
  return listedAvatars.values()
}

export function setAvatarOnSale(
  id: string,
  isOnSale: bool,
  price: u128
): Avatar {
  let avatar = listedAvatars.get(id)

  if (avatar === null) {
    throw new Error("avatar not found")
  }

  // console.log("sender", context.sender, avatar.owner)
  if (!avatar.owner || avatar.owner !== context.sender) {
    throw new Error(
      `avatar isn't owned by sender, is ${context.sender} should be ${avatar.owner}`
    )
  }

  avatar.setOnSale(isOnSale, price)

  listedAvatars.set(avatar.id, avatar)

  return avatar
}

export function buyAvatar(id: string): void {
  const avatar = getAvatar(id)

  if (avatar == null) {
    throw new Error("avatar not found")
  }

  if (!avatar.isOnSale) {
    throw new Error("avatar not on sale")
  }

  if (avatar.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the avatar's price")
  }

  ContractPromiseBatch.create(avatar.owner).transfer(context.attachedDeposit)

  avatar.setNewOwner(context.sender)
  avatar.addOwnerToHistory(avatar.owner)

  listedAvatars.set(avatar.id, avatar)
}

export function burnAvatar(id: string): Avatar {
  let avatar = listedAvatars.get(id)

  if (avatar === null) {
    throw new Error("avatar not found")
  }

  if (!avatar.owner || avatar.owner !== context.sender) {
    throw new Error(`avatar isn't owned by sender`)
  }

  avatar.setNewOwner("")
  avatar.addOwnerToHistory(avatar.owner)

  listedAvatars.set(avatar.id, avatar)

  return avatar
}
