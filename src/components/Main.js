import React, {Component} from "react";
import CardList from "./CardList"
import HelperOfferedAdds from "./HelperOfferedAdds";
import HelpWantedAdds from "./HelpWantedAdds";
import Autocomplete from "./Autocomplete";
import LocationsAutocomplete from "./LocationsAutocomplete";
import AddsByDistrict from "./AddsByDistrict";



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typedText: "",
            districtInfo: this.props.districtInfo,
            district:""

        }
    }
    helpNeed(){
    if(this.props.helpNeeded){return "apua tarvitaan"}
    else{return "apua tarjotaan"}
    }

    whatToRender(){
        return <div> <AddsByDistrict district={this.props.districtInfo} helpNeeded={this.props.helpNeeded} /></div>
    }
    renderInfo(){
        if(this.props.districtInfo===""){
            return <p className={"miniheader"}>Kaikkien alueiden "{this.helpNeed()}" -ilmoitukset:</p>
        }
        else{
            if(this.state.district ===""){return<p className={"postcodenotfound"}>Alutta ei löytynyt, tarkista postinumero!</p>}
            else{return <p className={"postcodesuccess"}>Alueen {this.state.district} ({this.props.districtInfo}) "{this.helpNeed()}" -ilmoitukset:</p>}
        }
    }
    //renderTestfield(){return <h3>Main Props: district: {this.props.districtInfo} help: {this.helpNeed()} </h3>}

    getDistrictName(){
        let url = ("http://finalprojectapplication-env.eba-bixfaf3m.eu-west-1.elasticbeanstalk.com/district/api/postnumber/" +this.props.districtInfo)
        return fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(data => this.setState({ district: data.districtName }))
            //.then(response => this.setState({district: response, loading: false}))
            .catch(error => this.setState({ error, loading: false}))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.districtInfo !== this.props.districtInfo){
            this.getDistrictName()
        }
    }

    render() {
        return <div>
            {this.renderInfo()}
            {this.whatToRender()}
        </div>


    }


}
export default Main;