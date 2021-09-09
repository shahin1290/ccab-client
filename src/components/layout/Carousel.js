import React ,{ useState , useEffect } from 'react'
import name from './../../assets/css/carousel.css';

const Carousel = ({ show , children }) => {
   

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    
    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState +1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState -1 )
        }
    }


    return (
        <div className="carousel-container">
           
            <div className="carousel-wrapper">

                {currentIndex>0 &&
                <button className="left-arrow" onClick={prev}>
                        &lt;
                </button>}
                <div className="carousel-content-wrapper">
                    <div className={`carousel-content show-${show}`}
                     style={{ transform: `translateX(-${currentIndex * (100/show )}%)` }}>
                        {children}
                    </div>
                </div>
                {currentIndex < (length - show ) &&
                <button className="right-arrow" onClick={next}>
                     &gt;
                </button>}
            </div>

            
        </div>
    )
}

export default Carousel