import React from 'react'
import Countdown from '../../components/CountDown/CountDown'

export const Home = () => {
    return (
        
        <div className="home">
        <img src="https://www.andiar.com/4910-large_default/vinilo-winter-is-coming-juego-de-tronos.jpg" alt="winter is coming"></img>
        <h2>Tiempo hasta el siguiente libro de la saga: Vientos de invierno</h2>
        <Countdown/>
        </div>
        
    )
}
