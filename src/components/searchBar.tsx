import React, { ChangeEvent, KeyboardEvent } from 'react';

interface Props {
    onSelect: (result: string) => void;
}

interface State {
    result: string;
}

class SearchBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onChangeEnter = this.onChangeEnter.bind(this);

        this.state = {
            result: ''
        }
    }
    render() {
        return (
            <div>
                <input type="text" onKeyPress={this.onChangeEnter} onBlur={this.onChange} defaultValue="Beschwörernamen eingeben" />
            </div>
        )
    }
    private onChange(e: ChangeEvent<HTMLInputElement>) {
        this.props.onSelect(e.target.value);
    }
    private onChangeEnter(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            this.props.onSelect(e.currentTarget.value);
        }
    }
}
export default SearchBar;