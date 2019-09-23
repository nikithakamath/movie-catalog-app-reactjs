import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authHeader } from '../../_helpers'
import { Layout, Button, Avatar, Menu} from 'antd';
import styles from './Navbar.module.scss';
import { AuthenticationModal } from '../authenticationModal/AuthenticationModal';

const { Header } = Layout;
const { SubMenu } = Menu;

export function Navbar() {
    const [authenticationModal, setAuthenticationModal] = useState({ visible: false });

    const toggleAuthenticationModal = (visible, type = "") => {
        setAuthenticationModal({ visible, type });
    };
    const logoutUser = () => {
      alert('Logut in progress...... :(');
    };

    return (
        <>
            <Header className={styles.main_header}>
                <div className={styles.header_container}>
                    <div className={styles.right_content}>
                        <h2>Movie Catalog</h2>
                        <Link to="/">Movies</Link>
                    </div>
                    <div className={styles.left_content}>

                        <Menu
                          onClick={() => logoutUser()}
                          mode="horizontal"
                        >
                          <SubMenu
                            key="sub1"
                            title={
                              <span>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                              </span>
                            }
                          >
                            <Menu.Item key="1">Log out</Menu.Item>
                          </SubMenu>
                        </Menu>
                        <p onClick={() => toggleAuthenticationModal(true, 'login')}>Login</p>
                        <p onClick={() => toggleAuthenticationModal(true, 'signup')}>Sign Up</p>
                    </div>
                </div>
            </Header>
            {authenticationModal.visible &&
                <AuthenticationModal
                    modalType={authenticationModal}
                    hideAuthenticationModal={() => toggleAuthenticationModal(false)}
                />
            }
        </>
    );
}
