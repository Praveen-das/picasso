import react from 'react'
import './style.css'

const skeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Section() {
    return (
        <>
            <section id="categories_wrapper">
                <div id="categories">
                    <span onClick={()=>console.log('asdadasd')}>OIL</span>
                    <span onClick={()=>console.log('asdadasd')}>ACRYLIC</span>
                    <span onClick={()=>console.log('asdadasd')}>WATERCOLOR</span>
                    <span onClick={()=>console.log('asdadasd')}>CHARCOAL</span>
                    <span onClick={()=>console.log('asdadasd')}>FABRIC</span>
                </div>

                <div id='category_type'>
                    <label htmlFor="">OIL PAINTING</label>
                </div>
                <div id='products'>
                    {
                        skeleton.map((elm, indx) => (
                            <div key={indx}></div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Section