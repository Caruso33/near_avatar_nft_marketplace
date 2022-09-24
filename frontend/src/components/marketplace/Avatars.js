import React, { useCallback, useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { toast } from "react-toastify"
import {
  buyAvatar,
  createAvatar,
  getAvatars as getAvatarList,
  burnAvatar,
  setAvatarOnSale,
} from "../../utils/marketplace"
import Loader from "../utils/Loader"
import { NotificationError, NotificationSuccess } from "../utils/Notifications"
import AddAvatar from "./AddAvatar"
import Avatar from "./Avatar"

const Avatars = () => {
  const [avatars, setAvatars] = useState([])
  const [loading, setLoading] = useState(false)

  // function to get the list of avatars
  const getAvatars = useCallback(async () => {
    try {
      setLoading(true)
      setAvatars(await getAvatarList())
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const addAvatar = async (data) => {
    try {
      setLoading(true)
      createAvatar(data).then((resp) => {
        getAvatars()
      })
      toast(<NotificationSuccess text="Avatar added successfully." />)
    } catch (error) {
      console.log({ error })
      toast(<NotificationError text="Failed to create a avatar." />)
    } finally {
      setLoading(false)
    }
  }

  //  function to initiate transaction
  const buy = async (id, price) => {
    try {
      setLoading(true)
      await buyAvatar({ id, price }).then((resp) => getAvatars())
      toast(<NotificationSuccess text="Avatar bought successfully" />)
    } catch (error) {
      toast(<NotificationError text="Failed to purchase avatar." />)
    } finally {
      setLoading(false)
    }
  }

  async function unSale(id, isOnSale, price) {
    try {
      setLoading(true)
      await setAvatarOnSale(id, isOnSale, price).then((resp) => getAvatars())
      toast(
        <NotificationSuccess
          text={`Avatar put ${isOnSale ? "on" : "off"} sale successfully`}
        />
      )
    } catch (error) {
      console.error(error.message)
      toast(<NotificationError text="Failed to burn avatar." />)
    } finally {
      setLoading(false)
    }
  }

  async function burn(id) {
    try {
      setLoading(true)
      await burnAvatar(id).then((resp) => getAvatars())
      toast(<NotificationSuccess text="Avatar burned successfully" />)
    } catch (error) {
      toast(<NotificationError text="Failed to burn avatar." />)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAvatars()
  }, [getAvatars])

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Avatar NFT Marketplace</h1>
            <AddAvatar save={addAvatar} />
          </div>

          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {avatars.map((_avatar) => (
              <Avatar
                key={_avatar.id}
                avatar={{ ..._avatar }}
                buy={buy}
                unSale={unSale}
                burn={burn}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Avatars
