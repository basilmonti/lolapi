import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar'
import ContainerHst from './components/containerHst';
import {Button} from '@material-ui/core';

interface State {
  accountId: string;

}

class App extends React.Component<{}, State>{
  constructor(props: any) {
    super(props);

    this.state = {
      accountId: ''
    }
    
    this.onSelect = this.onSelect.bind(this);
  }
  render() {
    return(
      <div>
        <SearchBar onSelect={this.onSelect}/>
        <ContainerHst accountId={this.state.accountId} containerType="sdf"/>
        <Button>TEst</Button>
      </div>
    )
  }
  private onSelect(result: any){
      this.setState({...this.state, accountId: result.accountId})
  }
}

export default App;
