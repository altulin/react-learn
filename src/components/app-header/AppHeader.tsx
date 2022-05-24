import React, { FC } from 'react';
import styles from './AppHeader.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';
import path from '../../services/utils/paths';

interface ILinkHeader {
  text: string;
  children: React.ReactChild | React.ReactNode;
  to: string;
}

const LinkHeader: FC<ILinkHeader> = ({ children, text, to }) => {
  return (
    <NavLink
      to={to}
      className={`pl-5 pr-5 pb-4 pt-4 ${styles.link}`}
      exact
      activeClassName={styles.link_current}
    >
      {children}
      <span className={`ml-2 text text_type_main-default ${styles.link_text}`}>
        {text}
      </span>
    </NavLink>
  );
};

const AppHeader: FC = () => {
  const { profile, main, feed } = path;

  return (
    <header className={`ml-10 mr-10 pt-4 pb-4 ${styles.header}`}>
      <div className={`${styles.header_inner} container`}>
        <nav className={styles.header_nav}>
          <div className={styles.header_nav_left}>
            <LinkHeader text='Конструктор' to={`${main}`}>
              <BurgerIcon type='primary' />
            </LinkHeader>
            <LinkHeader text='Лента заказов' to={`${feed}`}>
              <ListIcon type='primary' />
            </LinkHeader>
          </div>

          <Link to={`${main}`} className={styles.header_nav_logo}>
            <Logo />
          </Link>

          <LinkHeader text='Личный кабинет' to={`${profile}`}>
            <ProfileIcon type='primary' />
          </LinkHeader>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
