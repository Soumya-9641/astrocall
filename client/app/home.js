import { View,Text,SafeAreaView, ScrollView  ,StyleSheet,TouchableOpacity,Image,TextInput} from "react-native";
import { useState } from "react";

import { Stack, useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import AstrologerList from "../components/common/astrologer/AstrologerList";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  
  ScreenHeaderBtn,
 FilterModal
} from "../components";
import { CardBtn } from "../components";
const CustomHeaderLeft = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
      <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>Chat With Astrologer</Text>
    </View>
  );

  const HeaderRightComponent = ({ onSearch,onFilter }) => (
    <View style={styles.headerRightContainer}>
      <View style={styles.moneyBox}>
        <Text style={styles.moneyText}>₹ 500</Text>
      </View>
      <TouchableOpacity onPress={onSearch}>
      <Feather name="search" size={24} color="black" style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onFilter}>
      <Feather name="filter" size={24} color="black" style={styles.icon} />
    </TouchableOpacity>
    </View>
  );
  
const Home= ()=>{
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setSearchVisible(false);
  };
  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleApplyFilter = (filter) => {

    setSelectedFilter(filter);
   //console.log(selectedFilter)
    setIsFilterVisible(!isFilterVisible);
  };
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#FFEA00' },
            headerShadowVisible: false,
            headerLeft: () => <CustomHeaderLeft />,
          
            headerRight: () => <HeaderRightComponent  onSearch={handleSearchToggle} onFilter={handleFilterToggle}/>,
            headerTitle: "",
          }}
        />
        
        {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or expertise or languages"
            onSubmitEditing={(e) => handleSearchSubmit(e.nativeEvent.text)}
          />
        </View>
      )}
        <AstrologerList searchQuery={query} filter={selectedFilter}/>
        <FilterModal
        visible={isFilterVisible}
        onClose={handleFilterToggle}
        onApplyFilter={handleApplyFilter}
      />
       
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headerRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    moneyBox: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    moneyText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    icon: {
      marginHorizontal: 5,
    },
    searchContainer: {
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    searchInput: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
  });

export default Home;