import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import LoginButton from './LoginButton';
import AuthenticatedNav from './AuthenticatedNav';

function Navigation(props) {
    return(
        <div>
            <Nav className='navbar-expand navbar-dark bg-dark'>
                <NavItem>
                    <NavLink className='navbar-brand'>
                        Skup podataka
                    </NavLink>
                </NavItem>
                <div className='navbar-nav justify-content-end ms-auto'>
                    <Button className='btn-danger me-1' onClick={() => {props.setView("HOME")}}>Home</Button>
                    <Button className='btn-danger me-1' onClick={() => {props.setView("DATATABLE")}}>Datatable</Button>
                    <LoginButton></LoginButton>
                    <AuthenticatedNav setView={props.setView}></AuthenticatedNav>    
                </div>
            </Nav>
        </div>
    )

}

export default Navigation;