import React, { useState, useRef, useEffect, useCallback } from "react";
import './App.css';

import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-icons/dist/AllIcons.js"

import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";

function App() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState({
    id: 0,
		name: "",
		username: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    company: "",
    work: "",
    role: ""
  });
  const [error, setError] = useState(null);
  
  const fcl = useRef();

  const col1list = useRef();
  const col2list = useRef();

  const closeMidColumn = useRef();
  const closeEndColumn = useRef();

  const fullscreenMidColumn = useRef();
  const fullscreenEndColumn = useRef();

  const handleRowClick = useCallback((event) => {
    let sId = event.detail.row.visibleCells[0].innerText;
    const contactsObj = contacts.filter((contact) => {
      return contact.id == sId;
    })[0];
    setSelected(() => ({
      id: contactsObj.id,
      name: contactsObj.name,
      username: contactsObj.username,
      email: contactsObj.email,
      address: contactsObj.address.suite + ", " + contactsObj.address.street + ", " + contactsObj.address.city + " - " + contactsObj.address.zipcode,
      phone: contactsObj.phone,
      website: contactsObj.website,
      company: contactsObj.company.name,
      work: contactsObj.company.catchPhrase,
      role: contactsObj.company.bs
    }));
    fcl.current.layout = "TwoColumnsMidExpanded";
  }, [contacts,setSelected]);

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
    if (fcl.current.layout !== "MidColumnFullScreen") {
      fcl.current.layout = "MidColumnFullScreen";
    } else {
      fcl.current.layout = "TwoColumnsMidExpanded";
    }
  }, []);

  const handleFullScreenEndCol = useCallback(() => {
    fcl.current.layout = "EndColumnFullscreen";
  }, []);

  useEffect(() => {
    // axios("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => {
    //     setContacts(response.data);
    //     setError(null);
    //   })
    //   .catch(setError);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((response) => {
        setContacts(response);
        setError(null);
      })
      .catch(setError);

  }, [setContacts]);

  useEffect(() => {
    col1list.current.addEventListener("row-click", handleRowClick);
    // col2list.current.addEventListener("item-click", handleRowClick2);
    closeMidColumn.current.addEventListener("click", handleCloseMidCol);
    closeEndColumn.current.addEventListener("click", handleCloseEndCol);
    fullscreenMidColumn.current.addEventListener("click", handleFullScreenMidCol);
    fullscreenEndColumn.current.addEventListener("click", handleFullScreenEndCol);
    return () => {
      col1list.current.removeEventListener("row-click", handleRowClick);
      // col2list.current.removeEventListener("item-click", handleRowClick2);
      closeMidColumn.current.removeEventListener("click", handleCloseMidCol);
      closeEndColumn.current.removeEventListener("click", handleCloseEndCol);
      fullscreenMidColumn.current.removeEventListener("click", handleFullScreenMidCol);
      fullscreenEndColumn.current.removeEventListener("click", handleFullScreenEndCol);
    };

  }, [handleRowClick, handleRowClick2, handleCloseMidCol, handleCloseEndCol, handleFullScreenMidCol,]);


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
          <ui5-table class="demo-table" id="table" ref={col1list}>

            <ui5-table-column slot="columns">
              <span >ID</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" >
              <span >Name</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" popin-text="Email" demand-popin class="table-header-text-alignment">
              <span >E-Mail</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" popin-text="UserName" demand-popin class="table-header-text-alignment">
              <span >User Name</span>
            </ui5-table-column>


            {contacts.map(({ id, name, email, username }) => (
              <ui5-table-row type="Active" navigated>
                <ui5-table-cell>{id}</ui5-table-cell>
                <ui5-table-cell>{name}</ui5-table-cell>
                <ui5-table-cell>{email}</ui5-table-cell>
                <ui5-table-cell>{username}</ui5-table-cell>
              </ui5-table-row>
            ))}

          </ui5-table>
          {/* <ui5-list ref={col1list} header-text="List of Products">
          {contacts.map(({ name, email, username }) => (
            <ui5-li description={email} additional-text={username}>{name}</ui5-li>
          ))}
          </ui5-list> */}
        </div>

        <div slot="midColumn">
          <div className="App">
            {/* <ui5-button design="Emphasized">Edit</ui5-button> */}
            {/* <ui5-button design="Transparent" icon="add"></ui5-button> */}
            <ui5-button ref={fullscreenMidColumn} design="Transparent" icon="full-screen"></ui5-button>
            <ui5-button ref={closeMidColumn} icon="decline" design="Transparent"></ui5-button>
          </div>

          <ui5-tabcontainer class="full-width">
            <ui5-tab icon="address-book" text="Contact">
              
              <div class="form">
                <ui5-label class="labelClass">Address: </ui5-label>
                <ui5-text>{selected.address}</ui5-text>
              </div>
              <div class="form">
              <ui5-label id="myLabelPhone" for="idTextPhone" show-colon class="labelClassPh">Phone</ui5-label>
              <ui5-text id="idTextPhone">{selected.phone}</ui5-text>
              </div>
              <div class="form">
              <ui5-label id="myLabelWebsite" for="idTextWebsite" show-colon class="labelClass">Website</ui5-label>
              <ui5-text id="idTextWebsite">{selected.website}</ui5-text>
              </div>
              
            </ui5-tab>
            
            <ui5-tab icon="building" text="Company">
              <ui5-label show-colon>Name</ui5-label>
              <ui5-text >{selected.company}</ui5-text>
              <ui5-label show-colon>Work</ui5-label>
              <ui5-text >{selected.work}</ui5-text>
              <ui5-label show-colon>Role</ui5-label>
              <ui5-text >{selected.role}</ui5-text>
            </ui5-tab>
          </ui5-tabcontainer>
          {/* <ui5-list ref={col2list} header-text="Suppliers">
            <ui5-li >Amazon</ui5-li>
            <ui5-li >Flipkart</ui5-li>
            <ui5-li >Croma</ui5-li>
          </ui5-list> */}
        </div>

        <div slot="endColumn">
          <div className="App">
            {/* <ui5-button design="Emphasized">Edit</ui5-button> */}
            {/* <ui5-button design="Transparent" icon="add"></ui5-button> */}
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
