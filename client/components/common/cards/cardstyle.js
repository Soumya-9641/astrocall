import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";


const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      margin: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 25,
      marginRight: 10,
    },
    headerContent: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    details: {
      fontSize: 12,
      color: 'gray',
    },
    cardBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orders: {
      marginLeft: 5,
      fontSize: 12,
      color: 'gray',
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: 10,
    },
    chatButton: {
      backgroundColor: '#00FF00',
      borderRadius: 5,
      padding: 5,
    },
    chatButtonText: {
      color: 'white',
      fontSize: 14,
    },
  });

  export default styles;