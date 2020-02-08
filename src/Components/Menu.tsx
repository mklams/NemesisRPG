import React, { useEffect } from 'react';
import styled from 'styled-components';

export function ToolbarMenu() {

    const [showMenu, setShowMenu] = React.useState(false);

    useEffect(() => {
        document.addEventListener('click', closeMenu, true);

        return () => {
            document.removeEventListener('click', closeMenu, true);
        }
      }, [showMenu]);

    function clickShowMenu(event: any) {
        event.preventDefault();
        
        setShowMenu(true);
    }

    function closeMenu(){
        setShowMenu(false);
    }

    const Menu = styled.div`
        background-color: #B2B2B2;
    `;

    // TODO: Don't hardcode the height in px
    const HomeButton = styled.button`
        width: 100%;
        height:30px; 
    `;

    function renderSubMenu(shouldRenderMenu: boolean){
        var submenu = null;
        if(shouldRenderMenu){
            submenu = (
            <Menu>
                <button> Statictics </button>
                <button> Skills </button>
                <button> Dice Roll </button>
            </Menu>
            );
        }

        return submenu;
    }

    return (
        <div>
            <HomeButton onClick={clickShowMenu}>
                NemesisOS
            </HomeButton>
            {renderSubMenu(showMenu)}
        </div>
    );
}