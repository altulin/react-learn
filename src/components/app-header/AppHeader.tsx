import React from 'react';
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


interface LinkProps {
	text: string,
	addClass?: string,
	children?:	React.ReactChild | React.ReactNode,
	onClick?: () => void,
}

class Link extends React.Component<LinkProps> {
	render() {
		return (
			<a href="/#" className={`pl-5 pr-5 pb-4 pt-4 ${styles.link} ${this.props.addClass}`} onClick={this.props.onClick}>
 				{this.props.children}
 				<span className={`ml-2 text text_type_main-default ${styles.link_text}`}>{this.props.text}</span>
 			</a>
		)
	}
}

interface AppHeaderState {
	order: boolean,
	constructor: boolean,
}

class AppHeader extends React.Component<{}, AppHeaderState> {
	state = {
		order: false,
		constructor: false
	};

	heandlerOrder = () => {
		this.setState(
			{
				constructor: false,
				order: !this.state.order,
			}
		)
	}

	heandlerConstructor = () => {
		this.setState(
			{
				order: false,
				constructor: !this.state.constructor,
			}
		)
	}


	render() {
		return (
			<header className={`ml-10 mr-10 pt-4 pb-4 ${styles.header}`}>
				<div className={`${styles.header_inner} container`}>
					<nav className={styles.header_nav}>

						<div className={styles.header_nav_left}>
							<Link text='Конструктор' addClass={this.state.constructor ? styles.link_current : ''} onClick = {this.heandlerConstructor}>
								<BurgerIcon type="primary"/>
							</Link>
							<Link text='Лента заказов' addClass={`ml-2 ${this.state.order ? styles.link_current : ''}`} onClick = {this.heandlerOrder}>
								{this.state.order}
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
}

export default AppHeader;
