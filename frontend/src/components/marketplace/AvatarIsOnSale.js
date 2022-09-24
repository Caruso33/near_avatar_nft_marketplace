import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap"
import { formatNearAmount } from "near-api-js/lib/utils/format"

export default function AvatarIsOnSale({ triggerUnSale, avatar }) {
  const { isOnSale, price } = avatar

  const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [newIsOnSale, setNewIsOnSale] = useState(null)
  const [newPrice, setNewPrice] = useState("")

  const setOnSale = useRef(false)
  useEffect(() => {
    if (!setOnSale?.current) {
      setOnSale.current = true
      setNewIsOnSale(isOnSale)
      setNewPrice(price?.toString())
    }
  }, [isOnSale, newIsOnSale, price])

  return (
    <>
      <Button
        variant="outline-danger"
        border="danger"
        onClick={handleShow}
        className="w-100 py-3"
      >
        {isOnSale ? "Unsale" : "Sale"}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Avatar</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Should be on sale?"
              className="mb-3 pb-3"
              onChange={(e) => setNewIsOnSale(e.target.checked)}
              checked={newIsOnSale}
            />

            <FloatingLabel
              controlId="inputPrice"
              label="Price (optional)"
              className="mb-3"
            >
              <Form.Control
                type="number"
                min={0}
                step={0.5}
                placeholder="Price"
                onChange={(e) => setNewPrice(e.target.value)}
                value={formatNearAmount(newPrice)}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="dark"
            onClick={async () => {
              try {
                setLoading(true)
                await triggerUnSale(newIsOnSale, newPrice)
                handleClose()
              } catch (e) {
                console.error(e.message)
              } finally {
                setLoading(false)
              }
            }}
          >
            {loading ? (
              <Spinner animation="border" size="sm" className="opacity-25" />
            ) : (
              "Edit Avatar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

AvatarIsOnSale.propTypes = {
  avatar: PropTypes.object.isRequired,
  triggerUnSale: PropTypes.func.isRequired,
}
