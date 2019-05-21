import React from 'react';

interface Props {
    searchParam: string;   
}

interface State {
    searchParam: string;
    jsonString: string;
}

class container extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            searchParam: this.props.searchParam,
            jsonString: ''
        }
    }
    render(){
        return(
            <div>

            </div>
        )
    }
    private
}
export default container;