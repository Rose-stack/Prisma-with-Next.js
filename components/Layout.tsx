import React,{ReactNode} from 'react';
import styles from "./Layout.module.css";
import Header from './Header';

type Props = {
    children: ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <div>
        <Header />
        <main className={styles.layout}>
            {children}
        </main>
    </div>
  )
}

export default Layout;