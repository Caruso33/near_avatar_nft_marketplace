import axios from "axios"
import { utils } from "near-api-js"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Badge, Button, Card, Col, Stack } from "react-bootstrap"
import AvatarIsOnSale from "./AvatarIsOnSale"

const Avatar = ({ avatar, buy, unSale, burn }) => {
  const { id, price, name, description, isOnSale, uri, owner, ownerHistory } =
    avatar

  const isOwner = window.accountId === owner

  const [image, setImage] = useState("")
  const [isImageLoading, setIsImageLoading] = useState(false)

  const triggerBuy = () => {
    buy(id, price)
  }

  const triggerUnSale = (newIsOnSale, newPrice) => {
    return unSale(id, newIsOnSale, newPrice)
  }

  const triggerBurn = () => {
    burn(id)
  }

  useEffect(() => {
    const getImage = async () => {
      if (!image && uri && !isImageLoading) {
        setIsImageLoading(true)

        try {
          const ipfsGateway = "https://ipfs.io/ipfs/"
          const { data } = await axios.get(uri)

          const imageCid = data.image.slice(data.image.indexOf("://") + 3)
          setImage(`${ipfsGateway}${imageCid}`)
        } catch (e) {
          console.error(e.message)
        } finally {
          setIsImageLoading(false)
        }
      }
    }

    getImage()
  }, [image, isImageLoading, uri])

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>

            <Badge bg="secondary" className="ms-auto">
              {!owner ? "burned" : isOnSale ? "on sale" : "sold"}
            </Badge>
          </Stack>
        </Card.Header>

        <div className=" ratio ratio-4x3">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>

        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>

          <Card.Text className="flex-grow-1 ">{description}</Card.Text>

          <Card.Text className="text-secondary">
            <span>{ownerHistory.join(", ")}</span>
          </Card.Text>

          {isOwner ? (
            <>
              <AvatarIsOnSale avatar={avatar} triggerUnSale={triggerUnSale} />

              <Button
                variant="outline-dark"
                onClick={triggerBurn}
                className="w-100 py-3 mt-3"
              >
                Burn
              </Button>
            </>
          ) : (
            <Button
              variant="outline-dark"
              onClick={triggerBuy}
              className="w-100 py-3"
            >
              Buy for {utils.format.formatNearAmount(price)} NEAR
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
  unSale: PropTypes.func.isRequired,
  burn: PropTypes.func.isRequired,
}

export default Avatar
