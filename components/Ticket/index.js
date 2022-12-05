import './index.scss';
import Button from 'react-bootstrap/Button';
import { NavLink} from 'react-router-dom';

const Price = () => {
    return(
        <>
        <div className="price-wrapper">
        <h1>Jegyek vásárlása</h1>
        <div className="ticket-type">
        
            <h2>Válassza ki a jegy típusát:</h2>
            <select>
            <option selected value="select">Jegy típusának kiválasztása</option>
            <option value="1" name = "24h-ticket">24 órás jegy</option>
            <option value="2" name = "48h-ticket">48 órás jegy</option>
            <option value="3" name = "ticket">Vonaljegy</option>
            </select>

            <h2>Válassza ki a bérlet típusát:</h2>
            <select>
            <option value="1" name = "monthly-pass">Havi bérlet</option>
            <option value="2" name = "half-year-pass">Féléves bérlet</option>
            <option value="3" name = "yearly-pass">Éves bérlet</option>
            <option selected value="select" >Bérlet típusának kiválasztása</option>
            </select>
            

            <h2>Válassza ki a kedvezmény típusát:</h2>
            <select>
                <option selected value="select">Kedvezmény típusának kiválasztása</option>
                <option value="student" name = "student">Diák kedvezmény-50%</option>
                <option value="pensioner" name = "pensioner">Nyugdíjas kedvezmény-75%</option>
                <option value="child" name = "child">Gyermek kedvezmény-50%</option>
                <option value="under25" name = "under25">25 év alatti kedvezmény-25%</option>
                <option value="none" name = "none">none</option>
            </select>

            <Button variant="secondary" size="sm">
            Jegy vásárlásának véglegesítése
            </Button>
            </div>

            <div className="ticket-price">
            <h2>Árlista</h2>
                <table>
        <tr>
          <th>Jegy</th>
          <th>ár</th>
        </tr>
        <tr>
          <td>Vonaljegy</td>
          <td>100.000</td>
        </tr>
        <tr>
          <td>24 órás jegy</td>
          <td>100.000</td>
        </tr>
        <tr>
          <td>48 órás jegy</td>
          <td>100.000</td>
        </tr>
        <tr>
          <td>Havi bérlet</td>
          <td>10.000.000</td>
        </tr>
        <tr>
          <td>Féléves bérlet</td>
          <td>10.000.000</td>
        </tr>
        <tr>
          <td>Éves bérlet</td>
          <td>10.000.000</td>
        </tr>
      </table>

        </div>
        </div>


        </>
    );
}

export default Price;