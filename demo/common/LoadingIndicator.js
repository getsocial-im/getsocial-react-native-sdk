/* eslint-disable require-jsdoc */
// @flow

// eslint-disable-next-line no-unused-vars
import {View, ActivityIndicator, Modal} from 'react-native';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {LoadingIndicatorStyle} from './LoadingIndicatorStyle.js';

type Props = { }
type State = {
  visible: boolean
}

const showLoading = () => {
  global.loadingIndicatorRef.current.setState({visible: true});
};
const hideLoading = () => {
  global.loadingIndicatorRef.current.setState({visible: false});
};

class LoadingIndicator extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    {if (this.state.visible) {
      return <View style={LoadingIndicatorStyle.loading}>
        <ActivityIndicator animating={true} size='large'/>
      </View>;
    } else {
      return null;
    }}
  }
};

export {LoadingIndicator, showLoading, hideLoading};
