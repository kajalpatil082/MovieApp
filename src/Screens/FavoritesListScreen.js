import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListCard from '../components/ListCard';
export const Favorites = ({navigation}) => {
  console.log('NAvi', navigation);
  const route = useRoute();
  const {favoriteList} = route.params;
  const [favoriteListData, setFavoruiteListData] = useState([]);
  useEffect(async () => {
    fetchData();
  }, []);
  async function fetchData() {
    // You can await here

    let data = await AsyncStorage.getItem('FavoriteList');

    let ParseData = JSON.parse(data);

    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()];
    }

    const arr1 = getUniqueListBy(ParseData, 'id');

    console.log('Unique by title');
    console.log(JSON.stringify(arr1));
    setFavoruiteListData(arr1);
    // ...
  }
  const DeleteRow = item => {
    let newValue = removeByAttr(favoriteListData, 'id', item.id);
    setFavoruiteListData(newValue);
    AsyncStorage.setItem('FavoriteList', JSON.stringify(newValue));
    console.log('row delete by me', newValue);
  };
  const removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text style={{padding: 10, fontSize: 18, textAlign: 'center'}}>
        No Data Found
      </Text>
    );
  };
  return (
    <View style={{marginTop: 20}}>
      <FlatList
        ListEmptyComponent={EmptyListMessage}
        keyExtractor={item => item.id.toString()}
        data={favoriteListData}
        renderItem={({item}) => {
          return (
            <ListCard
              navigation={navigation}
              // DeleteRow={item => DeleteRow(item)}
              item={item}
              fav={true}
              // History={true}
            />
          );
        }}
      />
    </View>
  );
};
