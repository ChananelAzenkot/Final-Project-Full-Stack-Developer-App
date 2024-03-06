import React from "react";
import "../styles/CreateCards.css";
import "../styles/About.css";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export default function About(theme) {
  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <Box component="div" className="containerAbout">
            <Typography component="div" variant="h3" className="tempTitle">
              <div>About</div>
            </Typography>
            <Typography variant="h1">
              Contact Book
            </Typography>
            <Box className="underlineAbout"></Box>
            <Typography component="div" variant="body1" className="containerAboutText">
              <div>
                PContact book apps allow users to store and organize contact
                information on their mobile devices. They provide features like
                adding names, phone numbers, email addresses, home addresses,
                photos, and notes for each contact. Some apps sync contacts
                across devices and back them up to the cloud. Contact books help
                keep important contact info organized and easily accessible on a
                smartphone or tablet.
              </div>
            </Typography>
            <Typography
            className="tempTitle"
              component="div"
              variant="h4"
              style={{ direction: "ltr" }}>
              So what can we do and how is works ?
            </Typography>
            <Box component="div" className="underlineAbout"></Box>
            <Typography component="div" variant="body1" className="containerAboutText">
              <div>
                Contact book apps allow users to add new contacts by entering
                their name, phone number, email address, and other info. Users
                can view and scroll through their list of contacts, search for
                specific contacts, and tap on a contact to see their details.
                Apps allow calling, messaging, or emailing contacts directly
                from their profile. Users can create different contact groups
                and organize contacts however they prefer. Some key features are
                adding, viewing, searching, communicating with, and organizing
                contacts from one central app.
              </div>
            </Typography>
            <Typography variant="h2" style={{ direction: "ltr" }}>
              <div>Who Can Use ?</div>
            </Typography>
            <Box className="underlineAbout"></Box>
            <Box
              className="whoCan"
              style={{ textAlign: "justify", direction: "ltr", margin: "2px" }}>
              <List>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="None :"
                    secondary="This access level enables users to view all the cards contact 
    and About On this page app,and you can signUp or if you have account so login,
    and This access level enables users to view on all the contact cards."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="User :"
                    secondary="This access level enables users to view, and
        favorite contacts that are stored in their personal address book
        within the app."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Business :"
                    secondary="This permission grants access to add, edit, remove, and otherwise
        manage contact entries within the shared company address book."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Admin :"
                    secondary="The admin permission provides full access to the
        app including adding/removing users, adjusting settings, managing
        all data and contacts, and overall app administration."
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </ThemeProvider>
      }
    </>
  );
}
