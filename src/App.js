import React, { useState, useRef, useEffect, useCallback } from "react";
import './App.css';

import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-icons/dist/AllIcons.js"

function App() {
  const fcl = useRef();

  const col1list = useRef();
  const col2list = useRef();
  
  const closeMidColumn = useRef();
  const closeEndColumn = useRef();

  const fullscreenMidColumn = useRef();
  const fullscreenEndColumn = useRef();

  const handleRowClick = useCallback(() => {
    fcl.current.layout = "TwoColumnsMidExpanded";
  }, []);

  const handleRowClick2 = useCallback(() => {
    fcl.current.layout = "ThreeColumnsEndExpanded";
  }, []);

  const handleCloseMidCol = useCallback(() => {
    fcl.current.layout = "OneColumn";
  }, []);

  const handleCloseEndCol = useCallback(() => {
    fcl.current.layout = "TwoColumnsMidExpanded";
  }, []);

  const handleFullScreenMidCol = useCallback(() => {
    fcl.current.layout = "MidColumnFullScreen";
  }, []);

  const handleFullScreenEndCol = useCallback(() => {
    fcl.current.layout = "EndColumnFullscreen";
  }, []);

  useEffect(() => {
    col1list.current.addEventListener("item-click", handleRowClick);
    col2list.current.addEventListener("item-click", handleRowClick2);
    closeMidColumn.current.addEventListener("click", handleCloseMidCol);
    closeEndColumn.current.addEventListener("click", handleCloseEndCol);
    fullscreenMidColumn.current.addEventListener("click", handleFullScreenMidCol);
    fullscreenEndColumn.current.addEventListener("click", handleFullScreenEndCol);
    return () => {
      col1list.current.removeEventListener("item-click", handleRowClick);
      col2list.current.removeEventListener("item-click", handleRowClick2);
    	closeMidColumn.current.removeEventListener("click", handleCloseMidCol);
      closeEndColumn.current.removeEventListener("click", handleCloseEndCol);
      fullscreenMidColumn.current.removeEventListener("click", handleFullScreenMidCol);
      fullscreenEndColumn.current.removeEventListener("click", handleFullScreenEndCol);
    };
    
  }, [handleRowClick,handleRowClick2,handleCloseMidCol,handleCloseEndCol,handleFullScreenMidCol,]);


  // fullscreenEndColumn.addEventListener("click", function(e) {
  // 	fcl.layout = "EndColumnFullscreen";
  // });

  return (
    <div>
      <ui5-flexible-column-layout ref={fcl}>

        <div slot="startColumn">
          <ui5-shellbar
            primary-title="React App"
            
          >
            <ui5-avatar slot="profile" icon="customer"></ui5-avatar>
          </ui5-shellbar>

          <ui5-list ref={col1list} header-text="List of Products">
            <ui5-li description="HT-2000" additional-text="449.00 EUR" >HP Laptop</ui5-li>
            <ui5-li description="HT-2001" additional-text="499.00 EUR" >Apple iPhone</ui5-li>
            <ui5-li description="HT-2002" additional-text="159.00 EUR" >Samsung TV</ui5-li>
            <ui5-li description="HT-2003" additional-text="229.00 EUR" >LG Dishwasher</ui5-li>
          </ui5-list>
        </div>

        <div slot="midColumn">
          <div className="App">
            <ui5-button design="Emphasized">Edit</ui5-button>
            <ui5-button design="Transparent" icon="add"></ui5-button>
            <ui5-button ref={fullscreenMidColumn} design="Transparent" icon="full-screen"></ui5-button>
            <ui5-button ref={closeMidColumn} icon="decline" design="Transparent"></ui5-button>
          </div>

          <ui5-list ref={col2list} header-text="Suppliers">
            <ui5-li >Amazon</ui5-li>
            <ui5-li >Flipkart</ui5-li>
            <ui5-li >Croma</ui5-li>
          </ui5-list>
        </div>

        <div slot="endColumn">
          <div className="App">
            <ui5-button design="Emphasized">Edit</ui5-button>
            <ui5-button design="Transparent" icon="add"></ui5-button>
            <ui5-button ref={fullscreenEndColumn} design="Transparent" icon="full-screen"></ui5-button>
            <ui5-button ref={closeEndColumn} icon="decline" design="Transparent"></ui5-button>
          </div>

          <p>
            "This is Supplier details..."
          </p>
        </div>
      </ui5-flexible-column-layout>

    </div>
  );
}

export default App;
