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
        
        //!  3. Comprobar que el usuario se ha registrado        
        if (!signedIn()) {
            props.history.push("/sign-in")
        }
        
        //! 3. Si el usuario especificó un tag en el registro, se debe añadir por defecto a la búsqueda
        
        this.state = {
            search: {},
        };

        //* this.search(); It´s redundant once componentDidMount already does it
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        
        //? Retrieve the tags needed to filter sales       
        //! Este servicio como el <select> que hay en el render se pueden sustituir por el componente <Tags>
    }

    componentDidMount() {
        //* Retrieve the favourite tag from SigIn and send a Search
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
        this.setState({ [name]: event.target.value });
        this.handleSearch(name, value)
    }
  
    handleSearch(name, value) {
        //* Added prevState to avoid overwriting the state only with data from one field. Now it filters from both Inputs and the Select
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
        //! 2. Llamar al servicio service.getSales(this.state.search), gestionar su petición y añadir al estado su resultado
        service.getSales(this.state.search).then((data) => this.setState({sales: data.result}))      
    }

    render() {
        return (
            <div className={`sale-search container`}>
                <form className="row mb-3">
                    <input name="name" onChange={this.handleChange} className={`form-control col-2 ml-4`} placeholder={`Filter by name`}/>
                    <input name="price" type="number" onChange={this.handleChange} className={`form-control col-1 ml-4`} placeholder={`Price`}/>
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
