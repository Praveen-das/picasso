import { Suspense, lazy } from 'react'
const Lottie = lazy(() => import('./ComponentB'))


export default function Test() {
    return (
        <Lottie />
    )
}
