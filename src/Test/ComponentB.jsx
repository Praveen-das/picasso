import Lottie from 'lottie-react'
import loadingAnimation from '../Assets/Lottie/loading.json'

export default function ComponentB() {
    return (
        <div key='97987987'>
            <Lottie style={{ width: '200px', height: '200px' }}  animationData={loadingAnimation} loop={true}/>
        </div>
    )
}
