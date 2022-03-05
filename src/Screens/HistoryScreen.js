import React, {useEffect, useState} from 'react';
import {View, Text, AsyncStorage, FlatList} from 'react-native';
import ListCard from '../components/ListCard';

function HistoryScreen({navigation}) {
  const [History, setHistory] = useState([]);
  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    let data = await AsyncStorage.getItem('History');
    let ParseData = JSON.parse(data);
    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()];
    }

    const arr1 = getUniqueListBy(ParseData, 'id');

    setHistory(arr1);
  };
  const DeleteRow = item => {
    let newValue = removeByAttr(History, 'id', item.id);
    setHistory(newValue);
    AsyncStorage.setItem('History', JSON.stringify(newValue));
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
    <View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={History}
        ListEmptyComponent={EmptyListMessage}
        renderItem={({item}) => {
          return (
            <ListCard
              DeleteRow={item => DeleteRow(item)}
              item={item}
              fav={true}
              History={true}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
}

export default HistoryScreen;
