import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });
  {
    /* User inputs validation, a green bar that will show up when form is completed. Look up on chakra.ui if confused */
  }
  const toast = useToast();

  const handleCreateUser = async (e) => {
    e.preventDefault(); // prevent page refresh when submitting form
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      toast({
        position: "top",
        status: "success",
        title: "Success.",
        description: "User created successfully.",
        duration: 2000,
      });

      //Will close the modal window
      onClose();
      //allows the new user to be added to the list without needing to refresh to see it.
      setUsers((prevUsers) => [...prevUsers, data]);

      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      }); //clear inputs after grabbing data
    } catch (error) {
      toast({
        position: "top",
        status: "error",
        title: "An error occurred.",
        description: error.message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        {/* BiAddToQueue is just the name of icon that opens the modal.*/}
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateUser}>
          <ModalContent>
            <ModalHeader> Add A New Contact </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex alignItems={"center"} gap={4}>
                {/*Left side of modal (window) */}
                <FormControl>
                  <FormLabel> Full Name </FormLabel>
                  <Input
                    placeholder={"John Doe"}
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>

                {/* Right side of modal (window), mt = margin top*/}
                <FormControl>
                  <FormLabel> Role/Position </FormLabel>
                  <Input
                    placeholder={"Software Engineer"}
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
                    }
                  />
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
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
              </FormControl>

              <RadioGroup
                mt={4}
                value={inputs.gender}
                onChange={(value) => setInputs({ ...inputs, gender: value })}
              >
                <Flex gap={5}>
                  <Radio value={"male"}>Male</Radio>

                  <Radio value={"female"}>Female</Radio>

                  <Radio value={"non-binary"}>Non-Binary</Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme={"blue"}
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
