
import Image from 'react-bootstrap/Image'

export default function Footer() {

    return (
        <div className='footer' >
            <Image src='footer_adobe_express_adobe_express.svg' />
            <p style={{zIndex: 1000, fontStyle: 'italic', position: 'absolute', bottom: '-110px', right: '0px', width: '100%', color: 'white', fontSize: '1rem', textAlign: 'center'}}>Made by: Sean Paulson</p>
        </div>
    )
}