import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Segment, Menu } from 'semantic-ui-react';

import Browse from './Browse'; 
import Saved from './Saved';
import About from './About';

const activeItemStyle = {
    fontWeight: 'bold',
    fontSize: '17px'
}

const MainMenu = () => 
    <div>
        <Segment inverted style={{ backgroundColor: '#222', padding: 0, borderRadius: 0, marginBottom: '25px' }}>
            <Menu inverted pointing secondary widths={3} style={{ width: '80%', display: 'inline-flex', marginBottom: '10px', fontSize: '16px'}}>
            
                <Menu.Item>
                    <NavLink exact to="/" activeStyle={activeItemStyle}>Browse</NavLink>
                </Menu.Item>

                <Menu.Item>
                    <NavLink to="/saved" activeStyle={activeItemStyle}>Saved</NavLink>
                </Menu.Item>

                <Menu.Item>
                    <NavLink to="/about" activeStyle={activeItemStyle}>About</NavLink>
                </Menu.Item>
            </Menu>
        </Segment>

        <Switch>
            
            <Route path="/saved" component={Saved} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Browse} />
        </Switch>

    </div>


export default MainMenu;