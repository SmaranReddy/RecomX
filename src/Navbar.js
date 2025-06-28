import React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      bg="brand.800"
      color="white"
      p={4}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Heading size="md" color="brand.600">
        <Box as="span" color="white">
          <b>Amazon UI Demo</b>
        </Box>
      </Heading>
    </Flex>
  );
}