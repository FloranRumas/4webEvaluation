import React, { useState }  from "react";
import "./Dashboard.css";
import { Table } from "react-bootstrap";

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        totalPage: 0,
        pagination: 5,
        currentPagination: 0,
        currentIndex: 0,
        myInputValue: ""
      };
    }

    updatePagination(prmPagination) {
      this.setState({
        currentPagination: prmPagination,
        currentIndex: this.state.pagination * (prmPagination)
      });
    }

    selectEntries(prmPagination){
      const nbRes = parseInt(prmPagination)
      this.setState({
        pagination: nbRes,
        currentIndex: 0,
        currentPagination: 0,
        totalPage: Array.from(Array(Math.round(this.state.items.length / nbRes)).keys())
      });
      this.forceUpdate();
    }

    checkConnexion(connected){
      if(connected !== 'true') {
        window.location.href = "/login";
      }
    }
  
    componentDidMount() {
      fetch("https://api.covid19api.com/summary")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result['Countries'],
              totalPage: Array.from(Array(Math.round(result['Countries'].length / this.state.pagination)).keys())
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
              totalPage: 0
            });
          }
        )
    }
  
    render() {
        const { error, isLoaded, items, totalPage, currentIndex, pagination, currentPagination} = this.state;
        const connected = sessionStorage.getItem('connected');
        this.checkConnexion(connected);
        if (error) {
          return <div>Erreur de l'API: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          return (
            <React.Fragment>
                <input className="searchInput" id="searchInput" type="text" value={this.state.myInputValue} onChange={e => this.setState({myInputValue: e.target.value})} placeholder="Recherche..."/> 
                <div className="select__tbl">
                  <select name="select_tbl" id="select_tbl" onChange={e => this.selectEntries(e.target.value)}>
                    <option value="5">5 Lignes</option>
                    <option value="10">10 Lignes</option>
                    <option value="20">20 Lignes</option>
                    <option value="50">50 Lignes</option>
                  </select> 

                </div>         
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th scope="col" className="title">Status du COVID-19 pour chaque pays</th>
                        <th scope="col" className="title">Nouveau cas</th>
                        <th scope="col" className="title">Total de cas</th>
                        <th scope="col" className="title">Nouveau décés </th>
                        <th scope="col" className="title">Total de décés</th>
                    </tr>
                </thead>
                <tbody>
                    {items.slice(currentIndex, pagination + currentIndex).filter(item => item.Country.includes(this.state.myInputValue.toLocaleLowerCase())).map((item, index) => (
                        <tr key={index}>                   
                            <td>
                                {item.Country} 
                            </td>
                            
                            <td>
                                {item.NewConfirmed}
                            </td>

                            <td>
                                {item.TotalConfirmed}
                            </td>

                            <td>
                                {item.NewDeaths}
                            </td>

                            <td>
                                {item.TotalDeaths}
                            </td>  
                        </tr>                                                                     
                    ))}
                </tbody> 
            </Table>
              {<ul className="pagination">
              <li> <button onClick={() => {this.updatePagination(0)}}>1</button></li>
              <li> <button>...</button></li>  
                {totalPage.slice(currentPagination <=3 ? 0 : currentPagination-2 , currentPagination + 3 ).map((value, index) => {
                  return <li key={index}><button onClick={() => {this.updatePagination(value)}}>{value+1}</button></li>
                })}
                <li> <button>...</button></li>   
                <li> <button onClick={() => {this.updatePagination(totalPage.length-1)}}>{totalPage.length}</button></li>                
              </ul>}
            </React.Fragment>  
          );
        }
      }
  }

  export default Dashboard;