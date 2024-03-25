import Image404white from '../../images/errors/404-error.png'
import Image404dark from '../../images/errors/404-error-dark.png'

function Page400(){
    return(
        <>
            <div className='centered'>
                <img src={Image404white} alt={"ERROR 404 logo"}/>
            </div>
            <div className='centered poppins-black-italic'>
                <p>404 : Not Found</p>
            </div>
        </>
    )
}

export default Page400;