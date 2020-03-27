import React, {Component, useState} from "react"
import {Modal, Button, Form, Col, Row} from "react-bootstrap"

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange =this.handleChange.bind(this);
        this.handleCheck =this.handleCheck.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);

        this.state = {
            show: false,
            name: "",
            email: "",
            postcode: "",
            district: "",
            description: "",
            groceries: "false",
            childCare: "false",
            dogOut: "false",
            outdoorCompany: "false",
            takingOutTrash: "false",
            other: "false",
        };
    }
    handleClose(){
        this.setState({show:false})
    }

    handleShow (){
        this.setState({show: true})
    }
    handleSubmit(){
        this.addDistrictName().then(() => this.addNewAd()).then(() => this.handleClose());
    }
    addDistrictName(){
        let url = ("http://finalprojectapplication-env.eba-bixfaf3m.eu-west-1.elasticbeanstalk.com/district/api/postnumber/" +this.state.postcode)
        return fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(response => this.setState({district: response, loading: false}))
            .catch(error => this.setState({ error, loading: false}))

    }

    addNewAd(){
        const url = "http://finalprojectapplication-env.eba-bixfaf3m.eu-west-1.elasticbeanstalk.com/api/add"
        let adAsJson = JSON.stringify({
            name: this.state.name,
            postcode: this.state.postcode,
            district: this.state.district,
            email: this.state.email,
            headline: this.state.headline,
            description: this.state.description,
            groceries: this.state.groceries,
            childCare: this.state.childCare,
            dogOut: this.state.childCare,
            outdoorCompany: this.state.outdoorCompany,
            takingOutTrash: this.state.takingOutTrash,
            other: this.state.other
            })
        console.log("Add data as json: " +adAsJson)
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: adAsJson
        })
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleCheck(event){
        const target = event.target;
        const value = "true"
        //"true" target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    render() {
        return (
            <>
                <Button className={"button"} variant="warning" onClick={this.handleShow}>
                    Jätä ilmoitus
                </Button>

                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Jätä ilmoitus</Modal.Title>
                    </Modal.Header>
                    <Form className={"form"}>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    Valitse
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Tarvitsen apua"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios7"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Tarjoan apua"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios8"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} controlId="formHorizontaHeadline">
                            <Form.Label column sm={2}>
                                Otsikko
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="headline" placeholder="Otsikko" name="headline" value={this.state.headline} onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalName">
                            <Form.Label column sm={2}>
                                Nimi
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="name" placeholder="Nimi" name="name" value={this.state.name} onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Sähköposti
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Sähköposti"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalLocation">
                            <Form.Label column sm={2}>
                                Postinumerosi
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="location" name="postcode" value={this.state.postcode} onChange={this.handleChange} placeholder="postinumero"/>
                            </Col>
                        </Form.Group>

                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    Mitä apua tarvitsen tai tarjoan?
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        onChange={this.handleCheck}
                                        label="Ruokakaupassa käynti"
                                        name="groceries"
                                        id="formHorizontalRadios1"
                                    />
                                    <Form.Check
                                        onChange={this.handleCheck}
                                        label="Lastenhoito"
                                        name="childCare"
                                        id="formHorizontalRadios2"
                                    />
                                    <Form.Check
                                        onChange={this.handleCheck}
                                        label="Koiran ulkoilutus"
                                        name="dogOut"
                                        id="formHorizontalRadios3"
                                    />
                                    <Form.Check
                                        onChange={this.handleCheck}
                                        label="Ulkoiluseuraa"
                                        name="outdoorCompany"
                                        id="formHorizontalRadios4"
                                    />
                                    <Form.Check
                                        onChange={this.handleCheck}
                                        label="Roskien vienti"
                                        name="takingOutTrash"
                                        id="formHorizontalRadios5"
                                    />
                                    <Form.Check
                                        onChange={this.handleCheck}
                                        label="Muu"
                                        name="other"
                                        id="formHorizontalRadios6"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} controlId="formHorizontalMessage">
                            <Form.Label column sm={2}>
                                Viesti
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as="textarea"
                                    type="message"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    placeholder="Kuvaus"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalCheck">
                            <Col sm={{span: 10, offset: 2}}>
                                <Form.Check label="Hyväksyn ehdot*"/>
                            </Col>
                        </Form.Group>
                        <div><p>Testfield: Name: {this.state.name} Email: {this.state.email} Groceries: {this.state.groceries}</p>
                        <p>Koiran ulkoilutus: {this.state.dogOut} Postinumero: {this.state.postcode}</p>
                        <p>Kuvaus: {this.state.description}</p></div>
                    </Form>

                    <Modal.Body>* Ilmoituksen jättämisen ehdot: hyväksyn, että
                        nimi-kentässä ilmoittamani nimi julkaistaan sivulla. Sähköposti
                        ei tule näkymään sivuilla julkisesti, mutta sivujen kautta tehdyt yhteydenotot lähetetään
                        tähän osoitteeseen. Yhteystietoja ei julkaista kolmansille osapuolille.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Peruuta
                        </Button>
                        <Button  onClick={this.handleSubmit}>
                            Lähetä
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default Post

