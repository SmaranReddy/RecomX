import React from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "$29.99",
    image:
      "https://m.media-amazon.com/images/I/61Iz2yy2CKL._AC_SY879_.jpg",
    description:
      "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
  },
  {
    id: 2,
    title: "Smartphone Stand",
    price: "$14.99",
    image:
      "https://m.media-amazon.com/images/I/71tH9dp6s1L._AC_SX679_.jpg",
    description:
      "Adjustable stand for smartphones and tablets, perfect for desk and travel.",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: "$39.99",
    image:
      "https://m.media-amazon.com/images/I/71f1bV8n4vL._AC_SX679_.jpg",
    description:
      "Portable Bluetooth speaker with deep bass, waterproof design, and 12-hour playtime.",
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <Box p={10}>
        <Heading size="md">Product not found.</Heading>
        <Link to="/">
          <Button mt={4} colorScheme="orange">
            Back to Home
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box maxW="600px" mx="auto" p={10}>
      <Image
        src={product.image}
        alt={product.title}
        borderRadius="md"
        h="300px"
        w="full"
        objectFit="contain"
        bg="#f6f6f6"
        mb={6}
      />
      <Heading size="lg" color="brand.500">
        {product.title}
      </Heading>
      <Text fontSize="xl" color="brand.600" fontWeight="bold" mt={2}>
        {product.price}
      </Text>
      <Text mt={4}>{product.description}</Text>
      <Button colorScheme="orange" mt={6}>
        Add to Cart
      </Button>
      <Link to="/">
        <Button mt={6} ml={4} variant="outline" colorScheme="orange">
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}