import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsers } from "../utilities/APIRoutes";
import { useCookies } from "react-cookie";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";


function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [getCookie, removeCookie] = useCookies([]);
  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {

    if (!getCookie.jwt) {
      navigate("/login");
    }

    else {
      setCurrentUser(JSON.parse(localStorage.getItem("loggedInUser")))
    }
  }

    , []);

  useEffect(() => {
    async function fetchAllContacts() {
      console.log("WE ARE IN USEEFFFECT");
      if (currentUser) {

        const data = await axios.get(`${allUsers}/${currentUser._id}`);
        console.log("this is currentUser Id: ", currentUser._id);
        setContacts(data.data);
        console.log("This is data.data: ", data.data);
        console.log("this is data", data);



      }
    }
    fetchAllContacts();
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (<Container>
    <div className="container">
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChatChange}
      ></Contacts>
      <Welcome currentUser={currentUser}>

      </Welcome>
    </div>
  </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat