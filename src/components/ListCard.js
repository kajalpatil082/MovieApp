import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../utills/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
function ListCard(props) {
  const [favoriteList, setFavoruiteList] = useState([]);
  const [isFav, setIsFAv] = useState(false);

  const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + props.item?.poster_path;

  return (
    <TouchableOpacity
      style={styles.movieDetailItem}
      onPress={() => {
        props.History
          ? null
          : props.navigation.navigate('ItemData', {
              props,
            });
      }}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image
          source={{
            uri: IMAGE_URL,
          }}
          resizeMode="contain"
          style={{
            width: 100,
            height: 150,
            borderRadius: 0,
            paddingBottom: 10,
          }}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 22,
                paddingRight: 16,
                fontWeight: 'bold',
                color: '#64676D',
              }}>
              {props?.item?.title}
            </Text>
          </View>
          <View style={styles.movieDetailsIcons}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <MaterialIcons color={colors.blue} name="thumb-up" size={32} />
                <Text
                  style={{
                    fontSize: 18,
                    paddingLeft: 10,
                    paddingTop: 5,
                    color: '#64676D',
                  }}>
                  {props.item.vote_count}
                </Text>
              </View>
              {props?.History ? (
                <MaterialIcons
                  onPress={() => props.DeleteRow(props.item)}
                  color={colors.tintColor}
                  name="delete"
                  size={32}
                  style={{padding: 10}}
                />
              ) : null}
              <TouchableOpacity
                style={{
                  marginLeft: 14,
                  flexDirection: 'row',
                  padding: 2,
                  marginHorizontal: 16,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                }}
                onPress={() => {
                  let value = props.ifExists(props.item);

                  setIsFAv(!value);
                  isFav
                    ? props.onRemoveFavorite(props.item)
                    : props.onFavorite(props.item);
                }}>
                {props.fav || props.History ? null : (
                  <MaterialIcons
                    name={isFav ? 'favorite' : 'favorite-outline'}
                    size={32}
                    color={'red'}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
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

export default ListCard;
