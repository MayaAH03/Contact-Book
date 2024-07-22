import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

const CreateUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        {/* BiAddToQueue is just the name of icon that opens the modal.*/}
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add A New Contact </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex alignItems={"center"} gap={4}>
              {/*Left side of modal (window) */}
              <FormControl>
                <FormLabel> Full Name </FormLabel>
                <Input placeholder={"John Doe"} />
              </FormControl>

              {/* Right side of modal (window), mt = margin top*/}
              <FormControl>
                <FormLabel> Role/Position </FormLabel>
                <Input placeholder={"Software Engineer"} />
              </FormControl>
            </Flex>

            <FormControl mt={4}>
              <FormLabel> Description </FormLabel>
              <Textarea
                resize={"none"}
                overflowY={"hidden"}
                placeholder={
                  "He is a Software Engineer at Google, we met at FutureTech Summit 2024."
                }
              />
            </FormControl>

            <RadioGroup mt={4}>
              <Flex gap={5}>
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
                <Radio value={"non-binary"}>Non-Binary</Radio>
              </Flex>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"blue"} mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserModal;
