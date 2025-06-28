import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Input,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { getRecommendations } from "./recommender";

export default function HomePage() {
  const [userId, setUserId] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFetch = async () => {
    setLoading(true);
    setRecommendations([]);
    try {
      const recs = await getRecommendations(userId);
      setRecommendations(recs.slice(0, 5));
    } catch (err) {
      toast({
        title: "Error fetching recommendations",
        description: err.message || "Unknown error",
        status: "error",
        duration: 4000,
        isClosable: true
      });
    }
    setLoading(false);
  };

  return (
    <Box>
      <Flex justify="center" align="center" py={10} bg="brand.100">
        <Box textAlign="center">
          <Heading size="lg" color="brand.500">
            Product Recommendations
          </Heading>
          <Text mt={2} color="brand.600">
            Enter a customer ID to see their top 5 recommended products!
          </Text>
        </Box>
      </Flex>
      <Flex justify="center" mt={8} mb={4} gap={3}>
        <Input
          w="300px"
          placeholder="Customer ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && userId && !loading) handleFetch();
          }}
        />
        <Button
          colorScheme="orange"
          onClick={handleFetch}
          isLoading={loading}
          isDisabled={!userId || loading}
        >
          Get Recommendations
        </Button>
      </Flex>
      <Flex wrap="wrap" justify="center" p={6} gap={8}>
        {recommendations.map((product, idx) => (
          <Box
            key={product.id || idx}
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="md"
            w="250px"
            _hover={{ boxShadow: "lg", transform: "scale(1.03)" }}
            transition="all 0.2s"
          >
            <Image
              src={product.image}
              alt={product.title}
              borderRadius="md"
              h="180px"
              w="full"
              objectFit="contain"
              bg="#f6f6f6"
              mb={3}
            />
            <Heading size="sm" mt={2} minH="48px">
              {product.title}
            </Heading>
            <Text color="brand.600" fontWeight="bold" fontSize="lg" mt={2}>
              {product.price}
            </Text>
            <Text color="gray.500" fontSize="sm">
              Score: <b>{product.score}</b>
            </Text>
          </Box>
        ))}
      </Flex>
      {loading && (
        <Flex justify="center">
          <Spinner size="lg" color="orange.400" />
        </Flex>
      )}
    </Box>
  );
}