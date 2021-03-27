import React, { useState } from 'react';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {SidebarData} from './SidebarData'
import SubMenu from './SubMenu';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Container } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 200ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const Sidebar = ({match}) => {
 const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    

    try {
      await logout()
      history.push("/login")
    } catch {
      
    }
  }
    return (
        <>
        <div style={{display: "flex", width: "100%"}}>
           <Nav style={{width: "50%"}}>
               <NavIcon to="#">
                <MenuIcon style={{color: "white"}} onClick={showSidebar}/>
               </NavIcon>
               <img style={{marginLeft: "20px"}} src="http://arizonsystems.com/img/arizon.webp"/>
           </Nav>
                <Nav style={{width: "50%", display: "flex", justifyContent: "flex-end"}}>
                  <Button startIcon={<BuildIcon/>} style={{marginLeft: "40px", borderRadius: "15px", width: "150px" }} href="/machine-data"variant="contained" color="primary">Machines</Button>
                <Button startIcon={<HomeIcon/>} style={{marginLeft: "40px", borderRadius: "15px", width: "130px"}} href="/"variant="contained" color="primary">Home</Button>
                 <Button startIcon={<PowerSettingsNewIcon/>} onClick={handleLogout} variant="contained" style={{borderRadius: "15px", marginLeft:"40px",width:"130px", color: "white" , backgroundColor: "#fa1e0e"}}>Logout</Button>    
                </Nav>
        </div>    
           <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <CloseIcon style={{color: "white"}}  onClick={showSidebar} />
              <img style={{marginLeft: "20px"}} src="http://arizonsystems.com/img/arizon.webp"/> 
           </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu match={match} item={item} key={index} />;
            })}
            
          </SidebarWrap>
        </SidebarNav>
        </>
    )
}

export default Sidebar
