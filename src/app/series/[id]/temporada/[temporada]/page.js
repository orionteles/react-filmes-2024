'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page({ params }) {

    console.log(params)

    const [show, setShow] = useState(false);
    const [temporada, setTemporada] = useState({})

    useEffect(() => {
        apiMovie.get(`tv/${params.id}/season/${params.temporada}`).then(resultado => {
            setTemporada(resultado.data)
        })

    }, [])

    return (
        <Pagina titulo={temporada.name}>
            {
                temporada.id &&
                <Row className="mt-3">
                    <Col sm={4}>
                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/' + temporada.poster_path} />
                    </Col>
                    <Col sm={8}>
                        <p><b>Votos: </b>{temporada.vote_average}</p>
                        <p><b>Data de Lançamento: </b>{temporada.air_date}</p>
                        <p><b>Episódios: </b>{temporada.episodes.length}</p>
                        <p><b>Sinopse: </b>{temporada.overview}</p>
                    </Col>
                    <Col sm={12}>
                        <h1>Temporadas</h1>
                        <Row md={3}>
                            {temporada.episodes.map(item => (
                                <Col key={item.id} className="mt-3">
                                    <Card onClick={()=>setShow(true)}>
                                        <Card.Img height={150} variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.still_path} />
                                        <Card.Body>
                                            <Card.Text>{item.name}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            }
           
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Piloto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500/rNSbjHqJRad3nXZr84zoGyDR0oM.jpg'} />
                        <p>Olá Mundo rt one of the series premiere, Harrison Wilson accepts the job position as principal of West Beverly Hills High,  forcing the Wilson family to relocate from Kansas to California and adjust to new life in the city - all while keeping a close watch on their troubled grandmother Tabitha.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShow(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Pagina>
    )
}

