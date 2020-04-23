import React from "react";
import "./Dashboard.css";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        totalPage: 0,
        pagination: 10,
        currentPagination: 0,
        currentIndex: 0
      };
    }

    updatePagination(prmPagination) {
      this.setState({
        currentPagination: prmPagination,
        currentIndex: this.state.pagination * (prmPagination)
      });
      console.log(this.state.currentIndex);
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
        const { error, isLoaded, items, totalPage, currentIndex, pagination } = this.state;
        const connected = sessionStorage.getItem('connected');
        if(connected !== 'true') {
          // const history = useHistory();
          // history.push('/login');
          alert('tutu');
        }
        if (error) {
          return <div>Erreur de l'API: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          return (
            <React.Fragment>
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
                    {items.slice(currentIndex, pagination + currentIndex).map((item, index) => (
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
              {<ul class="pagination">
                {totalPage.map((value, index) => {
                  return <li key={index}><button onClick={() => {this.updatePagination(value)}}>{value+1}</button></li>
                })}                
              </ul>}
            </React.Fragment>  
          );
        }
      }
  }

  export default Dashboard;