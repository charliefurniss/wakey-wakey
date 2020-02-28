import React from 'react';

const NavBar = () => {
  return (
    <header className='mdl-layout__header mdl-layout__header--transparent'>
      <div className='mdl-layout__header-row'>
        <span className='mdl-layout-title'>Wakey wakey</span>
        <div className='mdl-layout-spacer' />
        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link' href='/'>
            Link
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
