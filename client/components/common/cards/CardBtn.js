import React from 'react'
import { View,Text,SafeAreaView, ScrollView  ,StyleSheet,TouchableOpacity,Image} from "react-native";
import { useState } from "react";
import { useRouter } from 'expo-router';
import styles from './cardstyle';
import { Ionicons } from '@expo/vector-icons'; 

const CardBtn = ({ astrologer }) => {
    const router = useRouter();
    const maxStars = 5;

  // Generate star icons based on the astrologer's rating
  const stars = Array.from({ length: maxStars }, (_, index) => {
    return index < astrologer.rating ? (
      <Ionicons key={index} name="star" size={16} color="gray" />
    ) : (
      <Ionicons key={index} name="star-outline" size={16} color="gray" />
    );
  });
  return (
    <TouchableOpacity
  
    onPress={() => router.push({
      pathname: `astrologerDetails`,
      params: { id: astrologer._id }
    })}
    >

    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: `${astrologer.imageUrl}` }} style={styles.avatar} />
        <View style={styles.headerContent}>
          <Text style={styles.name}>{astrologer.name}</Text>
          {/* <Text style={styles.name}>{astrologer._id}</Text> */}
          <Text style={styles.details}>{astrologer.expertise.join(', ')}</Text>
          <Text style={styles.details}>{astrologer.languages.join(', ')}</Text>
          <Text style={styles.details}>Exp: {astrologer.experience} Years</Text>
        </View>
        <Ionicons name="checkmark-circle" size={24} color="green" />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.ratingContainer}>
          {stars}
          <Text style={styles.orders}>{astrologer.orders} orders</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹ {astrologer.pricePerMinute}/min</Text>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default CardBtn