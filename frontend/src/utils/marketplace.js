import { v4 as uuid4 } from "uuid"
import { parseNearAmount } from "near-api-js/lib/utils/format"

const GAS = 100000000000000

export function createAvatar(avatar) {
  avatar.id = uuid4()
  avatar.price = parseNearAmount(avatar.price + "")
  return window.contract.setAvatar({ avatar })
}

export function getAvatar(id) {
  return window.contract.getAvatar(id)
}

export function getAvatars() {
  return window.contract.getAvatars()
}

export async function setAvatarOnSale(id, isOnSale, price) {
  console.log("Not implemented", id, isOnSale, price)
}

export async function buyAvatar({ id, price }) {
  await window.contract.buyAvatar({ avatarId: id }, GAS, price)
}

export async function burnAvatar(id) {
  return await window.contract.burnAvatar(id)
}
