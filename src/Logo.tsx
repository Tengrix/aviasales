import s from './Logo.module.scss'
const Logo = () => {
    return(
        <div className={s.logo}>
            <img className={s.img} src="https://iconape.com/wp-content/files/qz/23585/svg/aviasales-4.svg" alt="aviasales"/>
        </div>
    )
}
export default Logo;