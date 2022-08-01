import React from "react";
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from './Header.module.css';

const Header: React.FC =  () => {
    const router = useRouter();
    const isActive:(pathname:string) => boolean = pathname => router.pathname === pathname;

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <Link href="/">
                    <a className={styles.bold}>
                        Todos App
                    </a>
                </Link>
            </div>
            <div className={styles.center}>
                <Link href="/">
                    <a className={styles.bold} data-active={isActive('/')}>
                        Todos
                    </a>
                </Link>
            </div>
        </nav>
    )
}

export default Header;