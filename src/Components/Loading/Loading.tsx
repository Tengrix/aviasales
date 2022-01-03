import loading from '../../assests/loading-gif-icon-9.jpg'
import s from './loading.module.scss'
export default function Loading(){

    return(
        <div>
            <img className={s.isLoading}  src={loading} alt=""/>
        </div>
    )
}