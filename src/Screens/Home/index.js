import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ImageBackgroundBase,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {SearchBar} from 'react-native-screens';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {getMovies} from '../../redux/actions/actions';
import colors from '../../utills/colors';
import {API_POSTER_SIZES} from '../../utills/constants';
import ListCard from '../../components/ListCard';
const Index = ({navigation}) => {
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  const [favoriteList, setFavoruiteList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(movies);
  const [serach, setSearch] = useState(false);
  const [data1, setData1] = useState([]);
  const [connection, setconnection] = useState(null);
  const list = [];
  useEffect(() => {
    serach ? null : setData(movies);
  });
  useEffect(() => {
    fetchMovies();
    fetchData();
  }, []);

  async function fetchData() {
    let data = await AsyncStorage.getItem('FavoriteList');
    let history = await AsyncStorage.getItem('History');
    if (data) {
      let ParseData = JSON.parse(data);
      console.log('DATA in home:::', ParseData);
      setFavoruiteList(ParseData);
    }
    if (history) {
      let ParseData1 = JSON.parse(history);
      console.log('DATA in history:::', ParseData1);
      setHistoryList(ParseData1);
    } else {
      setHistoryList(historyList);
    }
  }

  return (
    <>
      <InternetConnectionAlert
        onChange={connectionState => {
          console.log('Connection State: ', connectionState.isConnected);
          setconnection(connectionState.isConnected);
        }}>
        {connection ? (
          <View style={{flex: 1, marginTop: 10, paddingHorizontal: 20}}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {
                  navigation.navigate('FavoritesListScreen', {
                    favoriteList,
                  });
                }}>
                <Text style={styles.buttonText}> Show Favorites </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {
                  navigation.navigate('History');
                }}>
                <Text style={styles.buttonText}> History </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 10}}>
              <TextInput
                placeholder="Search Here..."
                lightTheme
                round
                style={{
                  borderColor: '#505050',
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                }}
                onChangeText={async text => {
                  setSearch(true);
                  const newData = movies.filter(item => {
                    const itemData = `${item.title.toUpperCase()}   
  ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                  });

                  // this.setState({ data: newData });
                  console.log('new data--->>>', newData);
                  if (newData.length === 1) {
                    newData.map(data => {
                      console.log('map data', data);
                      historyList.push(data);
                    });
                    console.log('history push', historyList);
                    AsyncStorage.setItem(
                      'History',
                      JSON.stringify(historyList),
                    );
                  }
                  setData(newData);
                  // data = movies
                }}
                autoCorrect={false}
              />
            </View>

            <View style={{flex: 1, marginTop: 12}}>
              <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                  return (
                    <ListCard
                      navigation={navigation}
                      item={item}
                      onFavorite={movieSelect => {
                        let stringfyData = JSON.stringify([
                          ...favoriteList,
                          movieSelect,
                        ]);
                        AsyncStorage.setItem('FavoriteList', stringfyData);

                        setFavoruiteList([...favoriteList, movieSelect]);
                      }}
                      ifExists={movieSelect => {
                        if (
                          favoriteList.filter(
                            item => item.id === movieSelect.id,
                          ).length > 0
                        ) {
                          return true;
                        }
                        return false;
                      }}
                      onRemoveFavorite={movieSelect => {
                        const filteredList = favoriteList.filter(
                          item => item.id !== movieSelect.id,
                        );
                        AsyncStorage.setItem(
                          'FavoriteList',
                          JSON.stringify(filteredList),
                        );
                        setFavoruiteList(filteredList);
                      }}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text> Please Check Internet</Text>
          </View>
        )}
      </InternetConnectionAlert>
    </>
  );
};
const styles = StyleSheet.create({
  movieDetailItem: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Buttons: {
    borderRadius: 20,
    backgroundColor: colors.lightPink,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  movieDetailsMetaContainer: {
    flex: 0.88,
  },
  movieDetailsIcons: {
    flexDirection: 'row',
    marginLeft: -3,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  buttonHeaderClose: {
    marginRight: 12,
    padding: 4,
  },
  releaseDateHeader: {
    fontSize: 17,
  },
  overviewContainer: {
    marginTop: 18,
  },
  overviewParagraph: {
    fontSize: 18,
    fontFamily: 'nunito-light',
  },
});
export default Index;
