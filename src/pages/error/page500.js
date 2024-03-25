import Image500white from '../../images/errors/500-error.png'
import Image500dark from '../../images/errors/500-error-dark.png'

function Page500(){
    return(
        <>
            <div className='centered'>
                <img src={Image500white} alt={"ERROR 404 logo"}/>
            </div>
            <div className='centered poppins-black-italic'>
                <p>404 : Internal server Error</p>
            </div>
        </>
    )
}

export default Page500;