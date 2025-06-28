import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function CartPage() {
  return (
    <Box maxW="600px" mx="auto" p={10}>
      <Heading size="lg" color="brand.500">
        Your Cart
      </Heading>
      <Text mt={4}>Your cart is empty. Add products to your cart!</Text>
    </Box>
  );
}