import React, {Component} from "react"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Delete extends Component{
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            show: false,
            email: "",
        };
    }

    handleClose(){
        this.setState({show:false})
    }

    handleShow (){
        this.setState({show: true})
    }

    handleDelete(){
        this.delete().then(()=>this.handleClose())
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async delete(){
        const url = ('http://finalprojectapplication-env.eba-bixfaf3m.eu-west-1.elasticbeanstalk.com/api/'+this.props.id +'/' +this.state.email)
        console.log("url: " +url)
        const res = await fetch(url, {
            method: 'DELETE',
        });
        const res_1 = await res.text();
        return console.log(res_1);
    }
    //renderTestField(){<h3>Testfield: email: {this.state.email} id: {this.props.id}</h3>}

    render() {
        return (
            <div>
                <Button className="deletebutton" variant="light" size="sm" onClick={this.handleShow}>
                    Poista ilmoitus
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Poista ilmoituksesi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Poistaaksesi ilmoituksen, syötä sähköpostiosoite, jonka ilmoitit ilmoituksen jättämisen yhteydessä.</p>
                        <input name="email" placeholder="Sähköpostisi" value={this.state.email} onChange={this.handleChange}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Peruuta
                        </Button>
                        <Button type="submit" variant="primary" onClick={this.handleDelete}>
                            Poista ilmoitus
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


        );
    }

}
export default Delete