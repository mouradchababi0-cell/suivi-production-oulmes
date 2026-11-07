import React, { useEffect, useRef } from 'react';
import { SafeAreaView, BackHandler, Platform, ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
      <WebView
        ref={webViewRef}
        source={require('./assets/index.html')}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowingReadAccessToURL="file://"
        originWhitelist={['*']}
        mixedContentMode="always"
        setSupportMultipleWindows={false}
        startInLoadingState
        renderLoading={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
