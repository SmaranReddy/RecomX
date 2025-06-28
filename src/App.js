import React, { useState } from "react";
import { ChakraProvider, Box, Heading, Input, Button, Flex } from "@chakra-ui/react";
import Recommendations from "./components/Recommendations";
import Paywall from "./components/Paywall";

function App() {
  const [userIdInput, setUserIdInput] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    setSearchKey(userIdInput.trim());
  };

  return (
    <ChakraProvider>
      <Box maxW="800px" mx="auto" mt={10} p={6}>
        <Heading mb={6} color="purple.700">
          Personalized{" "}
          <span
            style={{
              borderLeft: "2px solid #6b46c1",
              paddingLeft: "0.5rem",
            }}
          >
            Product Recommendations
          </span>
        </Heading>
        <Flex mb={8}>
          <Input
            placeholder="Enter user ID..."
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            size="lg"
            mr={2}
            bg="white"
            borderColor="purple.300"
            focusBorderColor="purple.600"
          />
          <Button colorScheme="purple" onClick={handleSearch} size="lg" px={8}>
            Search
          </Button>
        </Flex>

        {searchKey && (
          <Paywall userId={searchKey}>
            <Recommendations />
          </Paywall>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
