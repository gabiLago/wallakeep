import React, {Component} from 'react';
import SaleService from "../../services/SaleService";



// ESTE FICHERO NO HAY QUE TOCARLO
//* Minor adjustments on res array made to fit on my nodepop version and 'value' added to defaultProps to allow favouriteTag on the Select

const service = new SaleService();

export default class Tags extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };

        service.getTags().then((res) => {
            if (res) {
                this.setState({
                    tags: res.result
                })
            }
        });
    }

    render() {
        return (
  
            <select name={this.props.name} onChange={this.props.onTagChange} className={this.props.class} value={this.props.value}>
                <option value="">{this.props.firstOptionName}</option>
                {this.state.tags.map((tag, index) => <option key={`${tag}-${index}`} value={tag}>{tag}</option>)}
            </select>
        );
    }
}

Tags.defaultProps = {
    name: "tag",
    onTagChange: () => {
    },
    class: "form-control col-2 ml-4",
    firstOptionName: "Filter by tag",
    value: ""    
    };
