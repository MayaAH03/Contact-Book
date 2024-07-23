import {
  Container,
  Flex,
  Text,
  Box,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
{
  /* these are icons from a react library for the light and dark mode buttons */
}
import React from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";

const NavBar = ({ setUsers }) => {
  {
    /*this just allows us to switch from light to dark mode */
  }
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
          {/*Left side of navbar content, title. Display attribute makes it responsive, on small screens and above you wil see the navbar, but anything smaller you will not see the navbar content hence "base: none" */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <Text fontSize={"30px"}> Maya's Contact Book </Text>
          </Flex>

          {/*Right side of navbar content, night mode switch*/}
          <Flex gap={3} alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};
export default NavBar;
