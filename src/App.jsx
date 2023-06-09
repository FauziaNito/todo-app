import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  UnorderedList,
  list,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function App() {
  const todos = ["Wash Dishes", "Read Speaking JavaScript", "Take a Break"];
  // const [newTodo, setNewTodo] = useState("");

  
    const { register,handleSubmit, formState:{errors}, reset} = useForm();


  // const handleTodoChange = (e) => {
  //   setNewTodo(e.target.value);
  // };

  const submitNewTodo = (data) => {
    // e.preventDefault();
    console.log(data.dailyTodo);

    // setNewTodo("");
    reset();
  };

  return (
    <Flex bg="gray.200" minH="100vh" py={14}>
      <Container maxWidth="3xl">
        <Heading color="white" bg="gray.400" p={4}>
          TASK ATTACK
        </Heading>
        <form onSubmit={handleSubmit(submitNewTodo)}>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter your Todo here"
              bg="white"
              border={0}
              borderRadius={0}
              py={6}
              {...register("dailyTodo", {required: true})}
            />
            {errors.dailyTodo && (
              <Text bg='red.400' color='white'>Sorry this you can not leave this empty</Text>
            )}
          </FormControl>
          <Button
            type="submit"
            w="full"
            bg="yellow.400"
            borderRadius={0}
            p="6"
            _hover={{ bg: "yellow.400" }}
          >
            +
          </Button>
        </form>
        <List fontSize={20}>
          {todos.map((todo) => (
            <ListItem bg="white" py={2} px={5} key={todo}>
              <Flex gap={4}>
                <Checkbox borderColor="gray.300" size="lg" />
                <Text>{todo}</Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Container>
    </Flex>
  );
}

export default App;
