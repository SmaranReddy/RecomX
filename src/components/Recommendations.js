import React, { useEffect, useState } from "react";
import { getRecommendations } from "../api/personalize";
import {
  SimpleGrid,
  Box,
  Text,
  Badge,
  Skeleton,
  Alert,
  AlertIcon,

  Heading,
} from "@chakra-ui/react";

export default function Recommendations({ userId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError("");
    setItems([]);
    getRecommendations(userId)
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setError("No recommendations found for this user ID. Please enter a valid user ID.");
        } else {
          setItems(data);
        }
      })
      .catch(() => setError("❗ Failed to fetch recommendations. Please check the user ID and try again."))
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) return null;

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height="120px" borderRadius="md" />
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {items.map((item) => (
        <Box
          key={item.itemId}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={5}
          _hover={{ boxShadow: "xl", transform: "scale(1.03)" }}
          transition="all 0.2s"
        >
          <Heading as="h3" size="md" mb={1} color="purple.700">
            {item.productName || item.name || "Unknown Product"}
          </Heading>
          <Text color="gray.600">
            Price: <b>{item.price ? `₹${item.price}` : "N/A"}</b>
          </Text>
          <Badge colorScheme="purple" mt={2} fontSize="1em">
            Score: {item.score?.toFixed(4)}
          </Badge>
        </Box>
      ))}
    </SimpleGrid>
  );
}