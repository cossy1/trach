import './App.css';
import Home from "./modules/components";
import React, {useLayoutEffect, useState} from 'react';
import TabletBreakpoint from "./modules/responsive_utils/tablet_breakpoint";
import DesktopBreakpoint from "./modules/responsive_utils/desktop_breakpoint";


function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Home/>
        </header>
      </div>
  );
}

//
// function App() {
//   return (
//       <div className="App">
//         <header className="App-header">
//           <Home/>
//         </header>
//       </div>
//   );
// }

export default App;