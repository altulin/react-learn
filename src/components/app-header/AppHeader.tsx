import React from 'react';
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


interface LinkProps {
	text: string,
	addClass?: string,
	children?:	React.ReactChild | React.ReactNode,
	onClick?: () => void,
}

function Link({children, addClass, text, onClick}:LinkProps) {
	return (
		<a href="/#" className={`pl-5 pr-5 pb-4 pt-4 ${styles.link} ${addClass}`} onClick={onClick}>
			{children}
			<span className={`ml-2 text text_type_main-default ${styles.link_text}`}>{text}</span>
		</a>
	)
}




function AppHeader() {
	const [state, setState] = React.useState({
		constructor: false,
		order: true,
	})

	const heandlerConstructor = () => {
		setState({
			order: false,
			constructor: !state.constructor,
		})
	}

	const heandlerOrder = () => {
		setState({
			order: !state.order,
			constructor: false,
		})
	}

	return (
		<header className={`ml-10 mr-10 pt-4 pb-4 ${styles.header}`}>
			<div className={`${styles.header_inner} container`}>
				<nav className={styles.header_nav}>

					<div className={styles.header_nav_left}>
						<Link text='Конструктор' addClass={state.constructor ? styles.link_current : ''} onClick = {heandlerConstructor}>
							<BurgerIcon type="primary"/>
						</Link>
						<Link text='Лента заказов' addClass={`ml-2 ${state.order ? styles.link_current : ''}`} onClick = {heandlerOrder}>
							{state.order}
							<ListIcon type="primary"/>
						</Link>
					</div>

					<a href="/#" className={styles.header_nav_logo}>
						<Logo/>
					</a>

					<Link text='Личный кабинет'>
						<ProfileIcon type="primary"/>
					</Link>

				</nav>
			</div>
		</header>
	);

}

export default AppHeader;
