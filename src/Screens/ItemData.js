import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import {getSem} from './redux/actions/counter_actions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../utills/colors';
const ItemData = ({route, navigation}) => {
  const {itemId, item} = route.params.props;
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/w185' + item.poster_path,
        }}
        resizeMode="contain"
        style={{width: 300, height: 250, borderRadius: 10}}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
          {' '}
          {item.title}{' '}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <MaterialIcons color={colors.blue} name="thumb-up" size={32} />
        <Text
          style={{
            fontSize: 18,
            paddingLeft: 10,
            color: '#64676D',
          }}>
          {item.vote_count}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: colors.lightGray,
          }}>
          {item.overview}
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
          marginTop: 10,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'left',
            color: colors.lightGray,
          }}>
          Release Date
        </Text>
        <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'black'}}>
          {item.release_date}
        </Text>
      </View>

      {/* <Button
       title='SEM'
       onPress={()=>dispatch(getSem())} /> */}
    </View>
  );
};

export default ItemData;

const styles = StyleSheet.create({});
