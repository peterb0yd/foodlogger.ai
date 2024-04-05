import { LinksFunction } from '@remix-run/node';
import { PropsWithChildren, useState } from 'react';
import { Logo, links as logoLinks } from '~/components/logo/Logo';
import styles from './MainLayout.css';
import { Button, links as buttonLinks } from '~/components/button/Button';
import { MenuNav, links as menuNavLinks } from './menu-nav/MenuNav';
import { IconNames } from '~/enums/icons';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...logoLinks(),
    ...buttonLinks(),
    ...menuNavLinks(),
];

export const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="MainLayout">
            {children}
        </div>
    );
}

MainLayout.Content = ({ children }: PropsWithChildren) => {
    return (
        <div className="MainLayout-Content">
            {children}
        </div>
    );
}

MainLayout.Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuIconName = menuVisible ? IconNames.Close : IconNames.Menu;

    return (
        <>
            <div className="MainLayout-Header">
                <div className="Logo-Container">
                    <Logo />
                </div>
                <div className="Menu-Container">
                    <Button
                        variant="icon"
                        name="Menu-Button"
                        icon={menuIconName}
                        iconColor='base'
                        iconSize='lg'
                        borderRadius='sm'
                        size="flush"
                        onClick={() => setMenuVisible(!menuVisible)}
                    />
                </div>
            </div>
            <MenuNav
                visible={menuVisible}
                setIsVisible={setMenuVisible}
            />
        </>
    );
}