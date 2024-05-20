import {
  NavLink,
  useLocation
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './MainNavAside.module.scss';

import * as icons from 'icons';

import Logo from 'components/Logo';
import { useAuth } from 'hooks/useAuth';
import Avatar from 'components/Avatar';
// import { ChevronDown } from 'icons';


interface NavItemProps {
  to: string;
  label: string;
  icon?: keyof typeof icons;
  activeOn?: string[];
}

function NavItem(props: NavItemProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const activeOutside = (props.activeOn || []).find((path) => pathname.startsWith(path));
  const Icon = props.icon && icons[props.icon];

  return (
    <li className={styles.navItem}>
      <NavLink
        className={({ isActive }) => [
          styles.navLink,
          isActive || activeOutside ? styles.navLinkActive : null
        ].filter(Boolean).join(' ')}
        to={props.to}
      >
        {Icon ? (
          <span className={styles.navLinkIcon}>
            <Icon />
          </span>
        ) : null}
        <span className={styles.navLinkLabel}>
          {t(props.label)}
        </span>
      </NavLink>
    </li>
  );
}

export default function MainNavAside() {
  const { t } = useTranslation();
  const auth = useAuth();

  const user = auth.user;
  const name = user ? `${user.firstName} ${user.lastName[0]}.` : t('nav.my_account');

  return (
    <div className={styles.base}>
      <NavLink
        className={styles.logo}
        to="/"
      >
        <Logo
          width={169}
          height={45}
        />
      </NavLink>
      <div className={styles.account}>
        <div className={styles.accountItem}>
            <NavLink
              className={styles.accountLink}
              to="/account"
            >
              <Avatar
                id={user?.avatar}
                alt={`${user?.firstName} ${user?.lastName}`}
                variant="mainnavAside"
              />
              <span className={styles.accountName}>
                {name}
              </span>
            </NavLink>
        </div>
      </div>
      <ul className={styles.nav}>
        <NavItem
          to="/"
          icon="LayoutCollage"
          label="nav.dashboard"
        />
        <NavItem
          to="/map-overview"
          icon="Map"
          label="nav.map_overview"
        />
        <NavItem
          to="/vehicles"
          icon="Car"
          label="nav.vehicles"
        />
        <NavItem
          to="/routes"
          icon="Route"
          label="nav.routes"
        />
        {/*<NavItem
          to="/properties"
          icon="BuildingCommunity"
          label="nav.properties"
          activeOn={['/units']}
        />*/}
        <NavItem
          to="/account"
          icon="UserCircle"
          label="nav.my_account"
        />
      </ul>
    </div>
  );
}
