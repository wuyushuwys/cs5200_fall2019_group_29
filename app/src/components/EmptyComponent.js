import React, {Component} from "react";
import Table from 'react-bootstrap/Table';

export default class EmptyComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render() {
        return (<div className="table-wrapper">
            </div>
        )
    }
}
