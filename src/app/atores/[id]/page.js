'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page({ params }) {

    const [ator, setAtor] = useState({})
    const [filmes, setFilmes] = useState([])
    const [series, setSeries] = useState([])

    useEffect(() => {
        apiMovie.get(`person/${params.id}`).then(resultado => {
            setAtor(resultado.data)
        })

        apiMovie.get(`person/${params.id}/movie_credits`).then(resultado => {
            setFilmes(resultado.data.cast)
        })        

        apiMovie.get(`person/${params.id}/tv_credits`).then(resultado => {
            setSeries(resultado.data.cast)
        })        
    }, [])

    return (
        <Pagina titulo={ator.name}>
            {
                ator.id &&
                <Row className="mt-3">
                    <Col sm={4}>
                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} />
                    </Col>
                    <Col sm={8}>
                        <p><b>Data de Nascimento: </b>{ator.birthday}</p>
                        <p><b>Local de Nascimento: </b>{ator.place_of_birth}</p>
                        <p><b>Popularidade: </b>{ator.popularity}</p>
                        <p><b>Biografia: </b>{ator.biography}</p>
                    </Col>
                    <Col sm={12}>
                        <h1>Filmes</h1>
                        <Row>
                            {filmes.map(item => (
                                <Col
                                    key={item.id}
                                    title={item.title}
                                    className="mb-3"
                                    sm={2}
                                >
                                    <Link href={`/filmes/${item.id}`}>
                                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col sm={12}>
                        <h1>Séries</h1>
                        <Row>
                            {series.map(item => (
                                <Col
                                    key={item.id}
                                    title={item.name}
                                    className="mb-3"
                                    sm={2}
                                >
                                    <Link href={`/series/${item.id}`}>
                                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            }

        </Pagina>
    )
}

