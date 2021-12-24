import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
//import jwt_decode from 'jwt-decode'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }

    return (
        <Navbar bg="warning" variant="warning">
            <Container>
                <NavLink className="d-flex row align-items-center"  style={{color:'black'}} to={SHOP_ROUTE}>Luzin.app</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'black'}}>
                        <Button
                            variant={"outline-dark"}
                            className="mr-2"
                            onClick={() => history.push(BASKET_ROUTE)}
                        >
                            Корзина
                        </Button>
                        {user.isAdmin ?
                            <Button
                                variant={"outline-dark"}
                                onClick={() => history.push(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            :
                            <div></div>
                        }
                        <Button
                            variant={"outline-dark"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
