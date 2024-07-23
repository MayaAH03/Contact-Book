import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditModal from "../components/EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      //This filters out the user from the list
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
        // This will show the success message when the user is deleted.
      });
    } catch (error) {
      toast({
        title: "Failed to delete user",
        description: error.message,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
        // This will show the error message when the user is not deleted.
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          {/* where the profile picture is*/}
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={user.imgUrl} />

            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>

          {/* where the edit and delete modal/symbols is*/}
          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              variant={"ghost"}
              colorScheme={"red"}
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
