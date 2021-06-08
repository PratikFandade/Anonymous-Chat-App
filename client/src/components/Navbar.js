import React from 'react'
import { Dropdown, DropdownButton, Form, Navbar } from 'react-bootstrap'

import logo from '../assets/images/logo.svg'
import userLight from '../assets/images/user-light.svg'
import userDark from '../assets/images/user-dark.svg'
import logoutLight from '../assets/images/logoutLight.svg'
import light from '../assets/images/LightMode.svg'
import dark from '../assets/images/DarkMode.svg'

import { useTheme } from '../contexts/ThemeProvider'

export default function Nav({ login, name, logout }) {
    const { isLightTheme, toggleTheme } = useTheme();
    const exitChatApp = () => logout(false)

    const LoginBox = (
        <React.Fragment>
            <img
                alt=""
                src={isLightTheme ? userLight: userDark}
                width="40"
                height="40"
                className="m-2 d-inline-block align-top"
            />{" "}
            <DropdownButton
                variant={isLightTheme ? "light": "dark"}
                drop="down"
                id="dropdown-basic-button"
                title={name}
            >
                <Dropdown.Item variant={isLightTheme ? "light": "dark"} onClick={exitChatApp}>
                    <img
                        alt=""
                        src={logoutLight}
                        width="17"
                        height="17"
                        className="m-1 d-inline-block align-top"
                    />{" "}
                    Logout
                </Dropdown.Item>
            </DropdownButton>
        </React.Fragment>
    )

    return (
        <Navbar className={isLightTheme ? "" : "bag-dark"}>
            <Navbar.Brand className="mr-auto" href="/">
                <img
                    alt=""
                    src={logo}
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                />{" "}
            </Navbar.Brand>
            <Form inline className="justify-content-end">
                {login ? LoginBox : null}
                <img
                    alt=""
                    src={isLightTheme ? dark : light}
                    width="70"
                    height="70"
                    className="d-inline-block align-top"
                    onClick={toggleTheme}
                />
            </Form>
        </Navbar>
    )
}