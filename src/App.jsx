import React, { useEffect, useState } from "react";
import {
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import todoApi from "./todoApi/todoApi";


// Defining the schema for the todo object
const todoSchema  = z.object({
  dailyTodo: z.string().min(4).nonempty("Todo name is required"),
})

function App() {
  const [todos, setTodo] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({resolver: zodResolver(todoSchema)});

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoApi.get("/todos");
      const data = response.data;
      setTodo(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const createTodo = async (data) => {
    try {
      // Validating input data against the todoSchema
      // const validateData = todoSchema.parse(data);

      // API request to create the todo
      const response = await todoApi.post("/todos",data);

      const newTodo = response.data;
      setTodo((prevTodos) => [...prevTodos, newTodo]);
      reset();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Flex bg="gray.200" minH="100vh" py={14}>
      <Container maxWidth="3xl">
        <Heading color="white" bg="gray.400" p={4}>
          TASK ATTACK
        </Heading>
        <form onSubmit={handleSubmit(createTodo)}>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter your Todo here"
              bg="white"
              border={0}
              borderRadius={0}
              py={6}
              {...register("dailyTodo", { required: true })}
            />
            {errors.dailyTodo && (
              <Text bg="red.400" color="white">
                {errors.dailyTodo.message}
              </Text>
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
            <ListItem bg="white" py={2} px={5} key={todo.id}>
              <Flex gap={4}>
                <Checkbox borderColor="gray.300" size="lg" />
                <Text>{todo.dailyTodo}</Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Container>
    </Flex>
  );
}

export default App;
