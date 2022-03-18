import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	TouchableHighlight,
	Button,
	Text,
	Alert,
	StatusBar as RnStatusBar,
} from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';

import CarsList from './components/CarsList';

export default function App() {
	const [isBiometricSupported, setBiometricSupported] = useState(false);

	//Check if hardware supports biometrics
	useEffect(() => {
		(async () => {
			const compatible = await LocalAuthentication.hasHardwareAsync();
			setBiometricSupported(compatible);
		})();
	});

	const fallBackToDefaulAuth = () => {
		console.log('fall back to password authentication');
	};

	const alertComponet = (title, mess, btntxt, btnFunc) => {
		return Alert.alert(title, mess, [
			{
				text: btntxt,
				onPress: btnFunc,
			},
		]);
	};

	const handleBiometricAuth = async () => {
		//Check if hardware supports biometrics
		const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

		//Fallback to default authentication method (password) if Fingerprint is not available
		if (!isBiometricAvailable) {
			return alertComponet(
				'Please enter your password',
				'Biometric Authentication not supported',
				'OK',
				() => fallBackToDefaulAuth()
			);
		}

		//Check Biometrics types available (Fingerprint, Facil recognition, Iris recognition)
		let supportedBiometrics;
		if (isBiometricAvailable) {
			supportedBiometrics =
				await LocalAuthentication.supportedAuthenticationTypesAsync();
		}

		//Check Biometric are saved locally in user's device
		const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
		if (!savedBiometrics) {
			return alertComponet(
				'Biometrics record not found',
				'Please login with your password',
				'ok',
				() => fallBackToDefaulAuth()
			);
		}

		//Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

		const biometricsAuth = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Login with Biometrics',
			cancelLabel: 'Cancel',
			disableDeviceFallback: true,
		});

		//Log the user in on success
		if (biometricsAuth) console.log('success');

		console.log({ isBiometricAvailable });
		console.log({ supportedBiometrics });
		console.log({ savedBiometrics });
		console.log({ biometricsAuth });
	};

	return (
		////App to Tesla
		// <View style={styles.container}>
		// 	<CarsList />
		// 	<StatusBar style="auto" />
		// </View>

		<SafeAreaView>
			<View style={styles.container}>
				<Text>
					{isBiometricSupported
						? 'Your device is compatible with Biometrics'
						: 'Face or Fingerprint scanner is available on this device'}
				</Text>

				<TouchableHighlight
					style={{
						height: 60,
					}}
				>
					<Button
						title="Login with Biometrics"
						color="#fe7005"
						onPress={handleBiometricAuth}
					/>
				</TouchableHighlight>

				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	backgroundColor: '#fff',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
	container: {
		paddingTop: RnStatusBar.currentHeight,
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
});
