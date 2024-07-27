import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter, usePathname ,useSearchParams,useRoute,useLocalSearchParams} from 'expo-router';
const AstrologerDetails = () => {
    const router = useRouter();
  const params = useLocalSearchParams(); // Correct hook to get query parameters
    const id = params.id;
  //console.log(id)
  const [astrologer, setAstrologer] = useState(null);
    const [showFullDetails, setShowFullDetails] = useState(false);
    useEffect(() => {
        const fetchAstrologerDetails = async () => {
          // Replace with your actual API endpoint
          const response = await fetch(`http://192.168.1.5:3000/astrologer/getAstro/${id}`);
          //console.log(response)
          const data = await response.json();
          setAstrologer(data);
        };
        if (id) {
            fetchAstrologerDetails();
          }
       // fetchAstrologerDetails();
      }, [params.id]);
      if (!astrologer) {
        return (
            <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
        );
      }
    const text = `In the vast expanse of the literary world, where stories unfold and characters come to life, there exists a sentence, a sentence so grand and extensive, that it stretches beyond the usual constraints of brevity, and delves into the realms of verbosity, creating a tapestry of words, thoughts, and ideas that interweave and intertwine,echoing the complexities of human expression and the endless possibilities of language; this sentence, while seemingly interminable, serves as a testament to the boundless nature of the written word, demonstrating that within the confines of grammar and syntax, one can construct a narrative that, despite its length, remains coherent and meaningful, drawing the reader into a journey through the labyrinth of language,where each clause builds upon the previous one, creating a rhythm and flow that, while challenging to follow, offers a unique and profound experience, showcasing the beauty and intricacy of human communication, a communication that, when unrestrained, can produce a sentence that, though seemingly endless, is a marvel of linguistic craftsmanship, a testament to the power of words and the ingenuity of the human mind,a mind capable of weaving together a multitude of ideas and concepts into a single, cohesive whole, a whole that, while intricate and complex, remains accessible and engaging, inviting the reader to lose themselves in the sheer expanse of its narrative, a narrative that, while grand in scope, retains a sense of purpose and direction, guiding the reader through the vast landscape of its prose, revealing the potential for depth and richnessin the art of sentence construction, an art that, when mastered, can produce works of incredible beauty and sophistication, works that stand as monuments to the creative power of the human spirit, a spirit that, through the medium of language, can express the full range of human experience and emotion, crafting sentences that resonate with the reader, leaving a lasting impression and a deeper understanding of the world and the human condition; thus, this sentence, while a single entity, represents the culminationof countless hours of thought and effort, a labor of love that reflects the dedication and passion of its creator, a creator who understands the importance of every word, every punctuation mark, and the way they come together to form a complete and coherent thought, a thought that, while expressed in a single sentence, encompasses a world of
    meaning, offering a glimpse into the infinite possibilities of language and the enduring power of the written word, a word that, when used with skill and care, can convey the deepest truths and the most profound insights, creating a connection between writer and reader that transcends time and space, bridging the gap between minds and hearts, and reminding us of the shared humanity that unites us all, a humanity that finds its truest expression in the stories we tell and the words we use to tell them, words that, when crafted into sentences of great length and complexity, can achieve a beauty and elegance that is unmatched, showcasing the limitless potential of human creativity and the enduring power of language to inspire,enlighten, and move us, a power that is encapsulated in this single, grand, and extensive sentence, a sentence that, through its sheer length and complexity, stands as a testament to the enduring power and beauty of the written word`
    const truncatedDetails = text.length > 1000
        ? text.substring(0, 1000) + '...'
        : text;
        const maxStars = 5;
        const stars = Array.from({ length: maxStars }, (_, index) => {
            return index < astrologer.rating ? (
              <Ionicons key={index} name="star" size={16} color="gray" />
            ) : (
              <Ionicons key={index} name="star-outline" size={16} color="gray" />
            );
          });
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {/* <View style={styles.headerContainer}>
      
        <Ionicons name="share-social" size={24} color="black" />
      </View> */}
                <View style={styles.firstContainer}>
                    <View style={styles.profileContainer}>
                        <View>
                            <Image source={{ uri: `${astrologer.imageUrl}` }} style={styles.avatar} />
                            <View style={styles.ratingContainer}>
                               {stars}

                            </View>
                            <Text style={styles.orders}>{astrologer.orders} orders</Text>
                        </View>

                        <View style={styles.profileDetails}>
                            <View style={styles.nameContainer}>
                                <View style={styles.nameLeftContainer}>
                                    <Text style={styles.name}>{astrologer.name}</Text>
                                    <Ionicons name="checkmark-circle" size={16} color="green" />
                                </View>
                                <Entypo name="dots-three-vertical" size={24} color="black" />


                            </View>
                            <Text style={styles.details}>{astrologer.expertise.join(', ')}</Text>
                            <Text style={styles.details}>{astrologer.languages.join(', ')}</Text>
                            <Text style={styles.details}>Exp: {astrologer.experience} Years</Text>

                            <Text style={styles.price}>₹ {astrologer.pricePerMinute}/min</Text>
                        </View>
                    </View>
                    <View style={styles.contactContainer}>
                        <View style={styles.contactItem}>
                            <FontAwesome name="wechat" size={24} color="black" />
                            <Text style={styles.contactText}>{astrologer.totalChatTime} mins</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <Ionicons name="call" size={24} color="black" />
                            <Text style={styles.contactText}>{astrologer.totalCallTime} mins</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.fullDetails}>
                        {showFullDetails ? text : truncatedDetails}
                    </Text>
                    {text.length > 500 && (
                        <TouchableOpacity onPress={() => setShowFullDetails(!showFullDetails)}>
                            <Text style={styles.showMoreText}>{showFullDetails ? 'Show Less' : 'Show More'}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileDetails: {
        flex: 1, // Ensures this takes up remaining space
        marginLeft: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10, // Add padding inside the box
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        flexWrap: 'wrap', // Allow wrapping
    },
    nameLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
        flexShrink: 1, // Allow text to shrink and wrap
    },
    details: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
        flexWrap: 'wrap', // Allow text to wrap
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    orders: {
        marginLeft: 5,
        fontSize: 16,
        color: 'gray',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contactItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contactText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 6,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fullDetails: {
        fontSize: 14,
        color: 'black',
    },
    showMoreText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
export default AstrologerDetails