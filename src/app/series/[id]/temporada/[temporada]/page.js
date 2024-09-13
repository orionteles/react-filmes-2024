'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page({ params }) {

    console.log(params)

    const [show, setShow] = useState(false);
    const [episodio, setEpisodio] = useState({});
    const [temporada, setTemporada] = useState({})

    useEffect(() => {
        apiMovie.get(`tv/${params.id}/season/${params.temporada}`).then(resultado => {
            setTemporada(resultado.data)
        })

    }, [])

    function exibirModal(item){
        setEpisodio(item)
        setShow(true)
    }

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
                        <h1>Episódios</h1>
                        <Row md={3}>
                            {temporada.episodes.map(item => (
                                <Col key={item.id} className="mt-3">
                                    <Card onClick={()=>exibirModal(item)}>
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
                    <Modal.Title>{episodio.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img className="img-fluid mb-3" src={'https://image.tmdb.org/t/p/w500/' + episodio.still_path} />
                        <p><b>Episódio: </b>{episodio.episode_number}</p>
                        <p><b>Duração: </b>{episodio.runtime} min.</p>
                        <p><b>Voto: </b>{episodio.vote_average}</p>
                        <p>{episodio.overview}</p>
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

