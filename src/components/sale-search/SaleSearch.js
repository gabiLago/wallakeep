import React from "react";
import './SaleSearch.css'
import SaleService from "../../services/SaleService";
import SaleItem from "../sale-item/SaleItem";
import {signedIn, currentUser} from "../../services/Util";
import Tags from "../tags/Tags";


const service = new SaleService();

export default class SaleSearch extends React.Component {

    constructor(props) {
        super(props);   
        
        //*  3. Comprobar que el usuario se ha registrado        
        if (!signedIn()) {
            props.history.push("/sign-in")
        }
        
        //* 3. Si el usuario especificó un tag en el registro, se debe añadir por defecto a la búsqueda
        
        this.state = {
            search: {}
        };
            
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
       
    }


    componentDidMount() {
        //? Retrieve the favourite tag from SigIn and send a Search
        if(currentUser().tag){
            let favTag = currentUser().tag;
            this.setState({ tag : favTag });
            this.handleSearch("tag", favTag)
        } else {
            this.search()
        }       
    }

    handleChange(event) {
        const {name, value} = event.target;

        if(name === 'priceSearchMode'){
            if(this.state.priceSearchMode === "2"){
                console.log('ARRRRJ Rango')
                this.setState.inputType = 'text'
            } else {
                console.log('NO Rango')
                this.setState.inputType = 'date'
            }    
        } 

        this.setState({ [name]: event.target.value });
        this.handleSearch(name, value)
        
    }

  
    handleSearch(name, value) {
        //? Added prevState to avoid overwriting the state only with data from one field. Now it filters from both Inputs and the Select
        this.setState(prevState => ({
            search: {
                ...prevState.search,
                [name]: value.trim().length ? value.trim() : ""
            }
        }), () => {
            this.search();
        });
    }   
    
    search() {
        //* 2. Llamar al servicio service.getSales(this.state.search), gestionar su petición y añadir al estado su resultado
        service.getSales(this.state.search).then((data) => this.setState({sales: data.result}))      
    }

    render() {
        return (
            
            <div className={`sale-search container`}>
                <form className="row mb-3" id="searchForm">
                    <input name="name" onChange={this.handleChange} className={`form-control col-3 ml-4`} placeholder={`Filter by name`}/>
                    
                    <select name="priceSearchMode" onChange={this.handleChange} className={`form-control`}>
                        <option key="priceSearchMode0" value="0">Higher than</option>
                        <option key="priceSearchMode1" value="1">Lower than</option>
                        <option key="priceSearchMode2" value="2">Range (50-100)</option>
                    </select>

                    <input name="price" onChange={this.handleChange} className={`form-control col-1`} placeholder={`Price`}/>
                    <div className="input-group-append">
                        <span className="input-group-text">&euro;</span>
                    </div>
                    
                    
                    <Tags name="tag" onTagChange={this.handleChange} value={this.state.tag}/>
  
                </form>
                       
                {
                    ((this.state.sales && !this.state.sales.length) || !this.state.sales)
                    &&
                    <div className="text-center">
                        <h2>No se han encontrado elementos</h2>
                    </div>
                }
                
                {
                    this.state.sales
                    &&
                    (
                        <div className="row">
                            {
                                this.state.sales.map((sale, index) => {
                                    return (
                                        <div key={sale._id} className="col-4" onClick={() => this.props.history.push(`sale/${sale._id}`)}>
                                            <SaleItem item={sale}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }        
            </div>
        );
    }
}
