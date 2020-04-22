import React from "react";
import "./Dashboard.css";
import { Table } from "react-bootstrap";


class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://api.covid19api.com/summary")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result['Countries']);
            this.setState({
              isLoaded: true,
              items: result['Countries']
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Erreur de l'API: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          return (
            <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                    <th scope="col">Pays</th>
                    <th scope="col">Nouveau cas</th>
                    <th scope="col">Cas confirmé</th>
                    <th scope="col">Nombre de décés</th>
                    <th scope="col">Nouveau décés</th>
                </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <tr>
                    
                        <td key={item.Country}>
                            {item.Country}
                        </td>
                        
                        <td key={item.NewConfirmed}>
                            {item.NewConfirmed}
                        </td>

                        <td key={item.TotalConfirmed}>
                            {item.TotalConfirmed}
                        </td>

                        <td key={item.NewDeaths}>
                            {item.NewDeaths}
                        </td>

                        <td key={item.TotalDeaths}>
                            {item.TotalDeaths}
                        </td>  
                </tr>                                                                     
            ))}
            </tbody> 

        </Table>
          );
        }
      }
  }

  export default Dashboard;