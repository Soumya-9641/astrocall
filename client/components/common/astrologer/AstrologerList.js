import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, View ,RefreshControl} from 'react-native';
import axios from 'axios';
import CardBtn from '../cards/CardBtn';
import styles from "../cards/cardstyle"


const AstrologerList = ({ searchQuery, filter}) => {
  //console.log(filter)
    const [astrologers, setAstrologers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
  //   const [searchQ, setSearchQ] = useState(searchQuery || null);
  // const [filterQ, setFilterQ] = useState(filter || null);
    const fetchAstrologers = async (query, pageNum,newfilter) => {
      console.log(newfilter)
       // if (loading) return;
        setLoading(true);
        let url = '';
    
        if (query) {
         
          url = `http://192.168.1.5:3000/astrologer/searchAstro?query=${query}&page=${pageNum}`;
        } 
        else if (newfilter) {
       
          url = `http://192.168.1.5:3000/astrologer/astrologer/sort?sortBy=${newfilter}&page=${pageNum}`;
        } 
        else {
      
          url = `http://192.168.1.5:3000/astrologer/getPaginatedData?page=${pageNum}`;
        }
        try {
       
         const response = await axios.get(url);
        // console.log(response.data)
         const { astrologers: newAstrologers, totalPages } = response.data;
   
        //  setAstrologers(prevAstrologers => 
        //    pageNum === 1 ? newAstrologers : [...prevAstrologers, ...newAstrologers]
        //  );
        setAstrologers(prevAstrologers => {
          //if (reset) return newAstrologers;

          // Combine existing and new astrologers, ensuring no duplicates
          const combinedAstrologers = pageNum === 1 ? newAstrologers : [...prevAstrologers, ...newAstrologers];
          
          // Use a Map to filter out duplicates based on unique _id
          const astrologersMap = new Map(combinedAstrologers.map(astro => [astro._id, astro]));
  
          return Array.from(astrologersMap.values());
        });

        
         if (pageNum >= totalPages) {
           setHasMore(false);
         }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setRefreshing(false);
       
        }
      };

      useEffect(() => {
        setAstrologers([]);
    setPage(1);
    setHasMore(true);
        if (searchQuery||filter) {
          fetchAstrologers(searchQuery, 1,filter);
        } else {
          fetchAstrologers(null, 1,null);
        }
      //  fetchAstrologers();
      }, [searchQuery,filter]);

      const renderFooter = () => {
        if (!loading) return null;
        return (
          <View style={{ padding: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        );
      };
      const handleLoadMore = () => {
        if (!hasMore || loading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAstrologers(searchQuery, nextPage,filter);
      };

      const onRefresh = () => {
        setRefreshing(true);
    //     setSearchQ(null); // Reset search query
    // setFilterQ(null);// Reset filter
        setPage(1); // Reset page number
        setHasMore(true); // Reset hasMore
        fetchAstrologers(null, 1, null).then(() => setRefreshing(false)); // Fetch default list and stop refreshing
      };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <FlatList
      data={astrologers}
      renderItem={({ item }) => <CardBtn astrologer={item} />}
      keyExtractor={item => item._id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  </SafeAreaView>
  )
}

export default AstrologerList