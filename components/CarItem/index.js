import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import styles from './styles';

const CarItem = (props) => {
	return (
		<View style={styles.carContainer}>
			<ImageBackground
				source={require('../../assets/images/ModelX.jpeg')}
				style={styles.image}
			></ImageBackground>
			<View style={styles.titles}>
				<Text style={styles.title}>Model S</Text>
				<Text style={styles.subtitles}>Starting at $691420</Text>
			</View>
		</View>
	);
};

export default CarItem;
