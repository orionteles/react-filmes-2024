'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";

export default function Page(){
    
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        apiMovie.get('movie/popular').then(resultado=>{
            setFilmes(resultado.data.results)
        })
    }, [])
    
    return (
        <Pagina titulo="Disney">
            
            {filmes.map(item => (
                <p>{item.title}</p>
            ))}

        </Pagina>
    )
}

