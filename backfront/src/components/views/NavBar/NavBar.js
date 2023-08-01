import styles from './NavBar.module.scss'

const Navbar = () => {
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navTitle}>
                    <h1>Notice Board</h1>
                </div>
                <div className={styles.navItem}>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/login'>Sign in</a></li>
                        <li><a href='/register'>Register</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar;