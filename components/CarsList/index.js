import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import CarItem from '../CarItem';
import styles from './styles';
import cars from './cars';

const CarsList = (props) => {
	console.log(cars);
	return (
		<View style={styles.container}>
			<FlatList
				data={cars}
				renderItem={({ item }) => <CarItem car={item} />}
				keyExtractor={(item, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				snapToAlignment={'start'}
				decelerationRate={'fast'}
				snapToInterval={Dimensions.get('window').height}
			/>
		</View>
	);
};

export default CarsList;

// https://github.com/Savinvadim1312/TeslaClone/blob/main/App.js
