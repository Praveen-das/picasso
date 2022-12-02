import react, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating'
import './newReview.css'
import useReviews from '../../../Hooks/useReviews';
import useUserData from '../../../Hooks/useUserData';

function NewReview({ product, open, setOpen, userReview }) {
    const [review, setReview] = useState({ title: '', message: '' })
    const [vote, setVote] = useState(userReview?.vote || 0)
    const { addReview, updateReview, deleteReview } = useReviews()
    const { currentUser } = useUserData()

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 5,
        outline: 'none'
    };

    useEffect(() => {
        if (!userReview) return
        setReview(userReview?.review)
        setVote(userReview?.vote)
    }, [userReview])

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (reviews.find((doc) =>
        //     Object.values(doc).includes(currentUser.uid) &&
        //     Object.values(doc).includes(data.id))) {
        //     confirmAction(
        //         'Already reviewed',
        //         'Press CONFIRM if you want to modify existing review.',
        //         () => {
        //             addReview(review, vote, data.id)
        //             setReview({ title: '', review: '' })
        //             setOpen(!open)
        //         }
        //     )
        //     return
        // }
        if (userReview) {
            if (
                JSON.stringify(userReview.review) ===
                JSON.stringify(review) &&
                userReview.vote === vote
            )
                return alert('No changes have been made');
            updateReview.mutateAsync({ review_id: userReview.id, updates: { review, vote, product_id: product.id } })
                .then(() => {
                    setReview({ title: '', review: '' })
                    setOpen(!open)
                })
                .catch(err => console.log(err))
            return
        }

        addReview.mutateAsync({ review, vote, product_id: product.id })
            .then(() => {
                setReview({ title: '', review: '' })
                setOpen(!open)
            })
            .catch(err => console.log(err))
    }

    const handleDeletion = () => {
        deleteReview.mutateAsync(userReview?.id)
            .then(() => {
                setOpen(!open)
                setReview({ title: '', review: '' })
                userReview = null
            })
            .catch(err => console.log(err))
    }

    const handleClose = () => {
        setOpen(!open)
        setReview({ title: '', review: '' })
        setVote('')
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={box_style}>
                    <form action="submit" onSubmit={handleSubmit}>
                        <div className='newReview'>
                            <IconButton
                                onClick={handleClose}
                                sx={{ position: 'absolute', top: 5, right: 5 }}>
                                <CloseIcon />
                            </IconButton>
                            <label className='newReview_customer--name' htmlFor="">Hey {currentUser.data?.name}</label>
                            <p>Tell us about your experience</p>
                            <img className='button_primary' src={product.images?.find(o => o.fileId === product.defaultImage).url} alt="" />
                            <label className='rate_this_product' htmlFor="">Rate this product</label>
                            <Rating
                                defaultValue={userReview?.vote || 0}
                                aria-required
                                name="simple-controlled"
                                onChange={(_, newValue) => setVote(newValue)}
                            />

                            <TextField
                                autoComplete='off'
                                sx={{ mt: 1 }}
                                required
                                value={review?.title}
                                onChange={(e) => setReview(pre => ({ ...pre, title: e.target.value }))}
                                fullWidth
                                type='text'
                                size='small'
                                id="outlined-basic"
                                label="Title"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                required
                                value={review?.message}
                                onChange={(e) => setReview(pre => ({ ...pre, message: e.target.value }))}
                                fullWidth
                                size='small'
                                id="outlined-basic"
                                rows={4}
                                multiline
                                label="Review"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button type='submit' className='button_secondary newReview_button'>
                                    {
                                        userReview ? 'Update review' : 'Submit your review'
                                    }
                                </button>
                                {
                                    userReview &&
                                    <button onClick={handleDeletion} className='button_secondary deleteReview_button' >Delete review</button>
                                }
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default NewReview