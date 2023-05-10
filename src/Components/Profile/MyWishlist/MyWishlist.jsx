import useWishlist from "../../../Hooks/useWishlist"

function MyWishlist() {
    const { wishlists } = useWishlist()
    
    console.log(wishlists.data);
    
    return (
        <>

        </>
    )
}

export default MyWishlist
