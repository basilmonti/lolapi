import React, { ChangeEvent, KeyboardEvent } from 'react';
import * as Axios from 'axios';
import { baseUrl, apiKey } from '../enviroment';

interface Props {
    onSelect: (result: any) => void;
}

interface State {
    result: string;
}

class SearchBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onChangeEnter = this.onChangeEnter.bind(this);
        this.getSummonerId = this.getSummonerId.bind(this);

        this.state = {
            result: ''
        }
    }
    render() {
        return (
            <div>
                <input type="text" onKeyPress={this.onChangeEnter} onBlur={this.onChange} />
            </div>
        )
    }
    private onChange(e: ChangeEvent<HTMLInputElement>) {
        this.getSummonerId(e.currentTarget.value);
    }
    private onChangeEnter(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            this.getSummonerId(e.currentTarget.value);
        }
    }
    private getSummonerId(summonerName: string)
    {
        const encodedName = encodeURIComponent(summonerName);

        let result: any;

        Axios.default.get(`${baseUrl}/summoner/v4/summoners/by-name/${encodedName}?api_key=${apiKey}`)
        .then(response => {
            this.props.onSelect(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        return result;
    }
}
export default SearchBar;