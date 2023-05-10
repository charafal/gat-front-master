import './SideNav.css'
import { sideNavData } from './SideNavData';
import { Row, Col } from 'react-bootstrap'

function SideNav() {
    var location = window.location.pathname;
  return (
    <div className="sidenav px-2">
        <ul className="sidenav-list">
            <p>Menu</p>
            {
                sideNavData.map((val, key) => {
                    return (
                        <li key={key} className='sidenav-row' onClick={()=> {
                            window.location.pathname = val.link}}
                        >
                            <Row className='justify-content-center align-items-center py-2' id={location === val.link? 'active' : ''}>
                                <Col style={{flex: '30%'}} className='sidenav-icon'>{val.icon}</Col>
                                <Col style={{flex: '70%'}} className='p-0'>{val.title}</Col>
                            </Row>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  );
}

export default SideNav;
