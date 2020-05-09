import React from 'react';
import {WebView} from 'react-native-webview';

function WebComponent({uri}: {uri: string}) {
  return <WebView source={{uri}} />;
}

export default WebComponent;
