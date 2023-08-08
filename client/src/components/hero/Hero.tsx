import { Image } from "react-bootstrap";
import './_hero.scss';
export default function Hero() {
    return (
        <div className="hero">
            <Image id="img--fall1" src="fallHero.png" alt="fallHero" />
            <Image id="img--fall2" src="Fallhero2.png" alt="fall hero two" />
            <Image id="img--fall3" src="frogHero.png" alt="frog image hero" />
        </div>
    )
}