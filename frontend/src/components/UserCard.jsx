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
} from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditModal from "../components/EditModal";

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          {/* where the profile picture is*/}
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={"https://avatar.iran.liara.run/public"} />

            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>

          {/* where the edit and delete modal/symbols is*/}
          <Flex>
            <EditModal />
            <IconButton
              variant={"ghost"}
              colorScheme={"red"}
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
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
