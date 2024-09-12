'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page({ params }) {

    const [serie, setSerie] = useState({})
    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovie.get(`tv/${params.id}`).then(resultado => {
            setSerie(resultado.data)
        })

        apiMovie.get(`tv/${params.id}/credits`).then(resultado => {
            setAtores(resultado.data.cast)
        })
    }, [])

    return (
        <Pagina titulo={serie.name}>
            {
                serie.id &&
                <Row className="mt-3">
                    <Col sm={4}>
                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} />
                    </Col>
                    <Col sm={8}>
                        <p><b>Título original: </b>{serie.original_name}</p>
                        <p><b>Popularidade: </b>{serie.popularity}</p>
                        <p><b>Data de Lançamento: </b>{serie.first_air_date}</p>
                        <p><b>Temporadas: </b>{serie.seasons.length}</p>
                        <p><b>Gêneros: </b>
                            {serie.genres.map(item => item.name).join(', ')}
                        </p>
                        <p><b>Sinopse: </b>{serie.overview}</p>
                    </Col>
                    <Col sm={12}>
                        <h1>Temporadas</h1>
                        <Row>
                            {serie.seasons.map(item => (
                                <Col
                                    key={item.id}
                                    title={item.name}
                                    className="mb-3"
                                    sm={2}
                                >
                                    <Link href={`/series/${serie.id}/temporada/${item.season_number}`}>
                                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col sm={12}>
                        <h1>Atores</h1>
                        <Row>
                            {atores.map(item => (
                                <Col
                                    key={item.id}
                                    title={item.name}
                                    className="mb-3"
                                    sm={2}
                                >
                                    <Link href={`/atores/${item.id}`}>
                                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + item.profile_path} />
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

