import React from 'react';
import styles from './AppHeader.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import path from '../../services/utils/paths';

interface LinkHeaderProps {
  text: string;
  addClass?: string;
  children?: React.ReactChild | React.ReactNode;
  onClick?: () => void;
  to: string;
}

function LinkHeader({
  children,
  addClass,
  text,
  onClick,
  to,
}: LinkHeaderProps) {
  return (
    <Link
      to={to}
      href='/'
      className={`pl-5 pr-5 pb-4 pt-4 ${styles.link} ${addClass}`}
      onClick={onClick}
    >
      {children}
      <span className={`ml-2 text text_type_main-default ${styles.link_text}`}>
        {text}
      </span>
    </Link>
  );
}

function AppHeader() {
  const { profile, main } = path;
  const [state, setState] = React.useState({
    constructor: false,
    order: true,
  });

  const heandlerConstructor = () => {
    setState({
      order: false,
      constructor: !state.constructor,
    });
  };

  const heandlerOrder = () => {
    setState({
      order: !state.order,
      constructor: false,
    });
  };

  return (
    <header className={`ml-10 mr-10 pt-4 pb-4 ${styles.header}`}>
      <div className={`${styles.header_inner} container`}>
        <nav className={styles.header_nav}>
          <div className={styles.header_nav_left}>
            <LinkHeader
              text='Конструктор'
              addClass={state.constructor ? styles.link_current : ''}
              onClick={heandlerConstructor}
              to={'/'}
            >
              <BurgerIcon type='primary' />
            </LinkHeader>
            <LinkHeader
              text='Лента заказов'
              addClass={`ml-2 ${state.order ? styles.link_current : ''}`}
              onClick={heandlerOrder}
              to={'/'}
            >
              {state.order}
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
}

export default AppHeader;
