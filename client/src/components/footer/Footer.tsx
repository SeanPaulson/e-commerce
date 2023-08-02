
import Image from 'react-bootstrap/Image'

export default function Footer() {

    return (
        <div className='footer'>
            <Image src='footer_adobe_express.svg' />
            <p style={{zIndex: 1000, position: 'relative', color: 'white', top: '-130px', fontSize: '2.3rem', textAlign: 'center'}}>text</p>
        </div>
    )
}