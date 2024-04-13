import { LinksFunction } from '@remix-run/node';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Logo, links as logoLinks } from '~/components/logo/Logo';
import styles from './MainLayout.css?url';
import { Button, links as buttonLinks } from '~/components/button/Button';
import { MenuNav, links as menuNavLinks } from './menu-nav/MenuNav';
import { IconNames } from '~/enums/icons';
import { useRouteLoaderData } from '@remix-run/react';

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

MainLayout.Header = ({ userId }: { userId: string | undefined }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuIconName = menuVisible ? IconNames.Close : IconNames.Menu;

    // Close the menu if the user logs out
    useEffect(() => {
        if (!userId && menuVisible) {
            setMenuVisible(false);
        }
    }, [userId])

    return (
        <>
            <div className="MainLayout-Header">
                <div className="Logo-Container">
                    <Logo />
                </div>
                {userId && (
                    <div className="Menu-Container">
                        <Button
                            name="Menu-Button"
                            icon={menuIconName}
                            variant="menu"
                            iconSize='lg'
                            size="flush"
                            onClick={() => setMenuVisible(!menuVisible)}
                        />
                    </div>
                )}
            </div>
            <MenuNav
                visible={menuVisible}
                setIsVisible={setMenuVisible}
            />
        </>
    );
}