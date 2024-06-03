import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

const BaseView: React.FC<SafeAreaViewProps> = ({children, style, ...props}) => {
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right', 'top']}
      style={[
        {
          backgroundColor: "#fff",
          flex: 1,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export default BaseView;