import React from "react";
import './SaleSearch.css'
import SaleService from "../../services/SaleService";
import SaleItem from "../sale-item/SaleItem";
import {signedIn} from "../../services/Util";


const service = new SaleService();

export default class SaleSearch extends React.Component {
    constructor(props) {
        super(props);
        
        //!  3. Comprobar que el usuario se ha registrado        
        if (!signedIn()) {
            props.history.push("/sign-in")
        }
        
        // TODO 3. Si el usuario especificó un tag en el registro, se debe añadir por defecto a la búsqueda
        
        this.state = {
            search: {}
        };

        this.search();

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        
        // TODO Retrieve the tags needed to filter sales
        
        // TODO 1. Este servicio como el <select> que hay en el render se pueden sustituir por el componente <Tags>
        
        // TODO 1. Para más información de como se usa ver el componente SignIn
        
        service.getTags().then((res) => {
            
            if (res) {
                this.setState({
                    tags: res.result
                })
            }
        });
    }



    search() {
        // TODO 2. Llamar al servicio service.getSales(this.state.search), gestionar su petición y añadir al estado su resultado
        console.log(JSON.stringify(this.state.search))
        service.getSales(this.state.search).then((data) => this.setState({sales: data.result}))      
    }

    handleChange(event) {
        const field = event.target.name;
        this.setState({ [field]: event.target.value });
    }
  
    handleSearch(event) {
        const {name, value} = event.target;
        
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
    

    render() {
        

        return (
            <div className={`sale-search container`}>
                <form className="row mb-3">
                    <input name="name" onChange={this.handleSearch} className={`form-control col-2 ml-4`} placeholder={`Filter by name`}/>
                    <input name="price" type="number" onChange={this.handleSearch} className={`form-control col-1 ml-4`} placeholder={`Price`}/>
                    
                    {
                        this.state.tags
                        &&
                        <select name="tag" value={this.state.search.tag} onChange={this.handleSearch} className={`form-control col-2 ml-4`}>
                            <option value="undefined">Filter by tag</option>
                            {this.state.tags.map((tag, index) => <option key={`${tag}-${index}`} value={tag}>{tag}</option>)}
                        </select>
                    }
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
                                        <div key={sale._id} className="col-4" onClick={() => this.props.history.push(`/sale/${sale._id}`)}>
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
