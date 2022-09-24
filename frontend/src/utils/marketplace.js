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

export async function getAvatars() {
  const avatars = await window.contract.getAvatars()
  console.log("GetAvatars", avatars)
  return avatars
}

export function setAvatarOnSale(id, isOnSale, price) {
  return window.contract.setAvatarOnSale({
    id,
    isOnSale,
    price: parseNearAmount(price + ""),
  })
}

export function buyAvatar({ id, price }) {
  return window.contract.buyAvatar({ avatarId: id }, GAS, price)
}

export function burnAvatar(id) {
  return window.contract.burnAvatar(id)
}
