import React from 'react';
import { baseUrl, apiKey } from '../enviroment';
import Axios from 'axios';

interface Props {
    accountId: string;
    containerType: string;
}

interface State {
    accountId: string;
    jsonData: any;
}

class containerRte extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);


        this.state = {
            accountId: this.props.accountId,
            jsonData: null
        }
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}