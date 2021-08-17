import { SideNavigationMenu } from '../../components/sideNavigationMenu';
import { BottomNavigationMenu } from '../../components/bottomNavigationMenu';
import { useState, useEffect } from 'react';

export const Dashboard = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <div>
            {isMobile ? (
                <BottomNavigationMenu/>
            ) : (
                <SideNavigationMenu/>
            )}
        </div>
    );
}