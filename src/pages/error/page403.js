import Image403 from '../../images/errors/403-error.png'


function Page403(){
    return(
        <>
            <div className='centered'>
                <img src={Image403} alt={"ERROR 404 logo"}/>
            </div>
            <div className='centered poppins-black-italic'>
                <p>403 : FORBIDDEN</p>
            </div>
        </>
    )
}


export default Page403;