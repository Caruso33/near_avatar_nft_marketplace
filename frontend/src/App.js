import React, { useCallback, useEffect, useState } from "react"
import { Container, Nav } from "react-bootstrap"
import "./App.css"
import coverImg from "./assets/img/sandwich.jpg"
import Avatars from "./components/marketplace/Avatars"
import Cover from "./components/utils/Cover"
import { Notification } from "./components/utils/Notifications"
import Wallet from "./components/Wallet"
import { accountBalance, login, logout as destroy } from "./utils/near"

const App = function AppWrapper() {
  const account = window.walletConnection.account()

  const [balance, setBalance] = useState("0")

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance())
    }
  }, [account.accountId])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return (
    <>
      <Notification />

      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>

          <main>
            <Avatars />
          </main>
        </Container>
      ) : (
        <Cover name="Avatars" login={login} coverImg={coverImg} />
      )}
    </>
  )
}

export default App
