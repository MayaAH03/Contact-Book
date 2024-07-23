import React, { useState } from "react";
import { Container, Stack, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import UserBoxes from "./components/UserBoxes";

export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {
  const [users, setUsers] = useState([]);

  return (
    /* Stack means all elements in it wil be layed out vertically/on top of each other, 100vh will take up the entire screen */
    /* Container means its gonna be in the middle of the screen, my is the margin at the bottom and top of the page.  */
    <Stack minH={"100vh"}>
      <NavBar setUsers={setUsers} />

      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Contacts
          </Text>
        </Text>

        <UserBoxes users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}

export default App;
