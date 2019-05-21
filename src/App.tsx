import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar'

interface State {
  searchWord: String;
}

class App extends React.Component<{}, State>{
  constructor(props: any) {
    super(props);

    this.state = {
      searchWord: ''
    }
    
    this.onSelect = this.onSelect.bind(this);
  }
  render() {
    return(
      <div>
        <SearchBar onSelect={this.onSelect}/>
        {this.state.searchWord}
      </div>
    )
  }
  private onSelect(result: string){
      this.setState({...this.state, searchWord: result})
  }
}

export default App;
