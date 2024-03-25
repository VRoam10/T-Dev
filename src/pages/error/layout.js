import { Outlet, Link } from "react-router-dom";
import '../../styles/error/style.scss'

const ErrorLayout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/' className='poppins-black'>Return home</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default ErrorLayout;