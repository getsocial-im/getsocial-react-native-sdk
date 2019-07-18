/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Platform, DeviceEventEmitter, NativeEventEmitter, Modal, View, Text, FlatList, ScrollView, TextInput, Button} from 'react-native';
import {FilterNotificationsViewStyle} from './FilterNotificationsViewStyle.js';
// eslint-disable-next-line no-unused-vars
import {CheckBox} from 'react-native-elements';

type Props = {}
type State = {
  visible: boolean,
  statusFilter: Array<any>,
  typesFilter: Array<any>,
  actionsFilter: Array<any>,
  onClose: function,
}

const showFilterView = (onClose: ((filterParams: any) => void)) => {
  global.filterViewRef.current.setState({visible: true});
  global.filterViewRef.current.setState({onClose: onClose});
};

class FilterNotificationsView extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      statusFilter: [{key: 'read'}, {key: 'unread'}, {key: 'consumed'}, {key: 'ignored'}],
      typesFilter: [
        {key: 'all', title: 'All'},
        {key: 'comment', title: 'Comment'},
        {key: 'activity_like', title: 'Like activity'},
        {key: 'comment_like', title: 'Like comment'},
        {key: 'related_comment', title: 'Comment in same thread'},
        {key: 'friends_add', title: 'New friendship'},
        {key: 'invite_accept', title: 'Invite accepted'},
        {key: 'comment_mention', title: 'Mention in comment'},
        {key: 'activity_mention', title: 'Mention in activity'},
        {key: 'comment_reply', title: 'Reply to comment'},
        {key: 'targeting', title: 'Targeting'},
        {key: 'direct', title: 'Direct'},
        {key: 'custom', title: 'Sdk'},
      ],
      actionsFilter: [],
      onClose: undefined,
    };
  }

  addActionFilterRow = async () => {
    const data = this.state.actionsFilter;
    this.setState({
      actionsFilter: [...this.state.actionsFilter, {key: 'AFR_' + data.length}],
    });
  }

  updateActionFilterData = async (index: number, newActionID: string) => {
    this.setState((prevState) => {
      const copiedData = [...prevState.actionsFilter];
      copiedData[index].actionID = newActionID;
      return {actionsFilter: copiedData};
    });
  }

  updateStatusFilterCheckbox = async (index: number) => {
    this.setState((prevState) => {
      const copiedData = [...prevState.statusFilter];
      copiedData[index].checked = !copiedData[index].checked;
      return {statusFilter: copiedData};
    });
  }

  updateTypeFilterCheckbox = async (index: number) => {
    this.setState((prevState) => {
      const copiedData = [...prevState.typesFilter];
      copiedData[index].checked = !copiedData[index].checked;
      return {typesFilter: copiedData};
    });
  }

  discardChanges = async () => {
    this.setState({visible: false}, () => {
      this.state.onClose(null);
    });
  }

  updateFilter = async () => {
    const filterParams = {};
    const statusFilter = [];
    this.state.statusFilter.forEach((status) => {
      if (status.checked == true) {
        statusFilter.push(status.key);
      }
    });
    filterParams['STATUS_FILTER'] = statusFilter;

    const actionIDFilter = [];
    this.state.actionsFilter.forEach((actionID) => {
      actionIDFilter.push(actionID);
    });
    filterParams['ACTIONID_FILTER'] = actionIDFilter;

    const typesFilter = [];
    this.state.typesFilter.forEach((type) => {
      if (type.checked == true) {
        typesFilter.push(type.key);
      }
    });
    filterParams['TYPE_FILTER'] = typesFilter;

    this.setState({visible: false}, () => {
      this.state.onClose(filterParams);
    });
  }

  render() {
    return (
      <Modal animationType="slide"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {}}>
        <ScrollView style={{flex: 1, padding: 10}}>
          <View style={FilterNotificationsViewStyle.formEntryRow}>
            <Button title='Discard' onPress={ this.discardChanges }/>
            <Button title='Save' onPress={ this.updateFilter }/>
          </View>
          <View style={FilterNotificationsViewStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={FilterNotificationsViewStyle.sectionTitle} >Notification Status</Text>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.statusFilter}
            renderItem={({item, index}) => (
              <View style={FilterNotificationsViewStyle.formEntryRow}>
                <Text style={FilterNotificationsViewStyle.formEntryTitle} >{item.key}</Text>
                <CheckBox center checked={item.checked} onPress={() => this.updateStatusFilterCheckbox(index)}/>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={FilterNotificationsViewStyle.formEntryRow}>
            <View style={FilterNotificationsViewStyle.formEntryTitleContainer}>
              <Text style={FilterNotificationsViewStyle.sectionTitle} >Notification Actions</Text>
            </View>
            <View style={FilterNotificationsViewStyle.formEntryButtonContainer}>
              <Button title='Add' onPress={ this.addActionFilterRow }/>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.actionsFilter}
            extraData={this.state.actionsFilter}
            renderItem={({item, index}) => (
              <View style={FilterNotificationsViewStyle.formEntryRow}>
                <View style={FilterNotificationsViewStyle.formEntryInputContainer}>
                  <TextInput style={FilterNotificationsViewStyle.formEntryInput} onChangeText={(newActionID) => {
                    this.updateActionFilterData(index, newActionID);
                  }} value={item.actionID} placeholder='Action ID'/>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={FilterNotificationsViewStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={FilterNotificationsViewStyle.sectionTitle} >Notification Type</Text>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.typesFilter}
            renderItem={({item, index}) => (
              <View style={FilterNotificationsViewStyle.formEntryRow}>
                <Text style={FilterNotificationsViewStyle.formEntryTitle} >{item.title}</Text>
                <CheckBox center checked={item.checked} onPress={() => this.updateTypeFilterCheckbox(index)}/>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
        </ScrollView>
      </Modal>
    );
  }
}

export {FilterNotificationsView, showFilterView};
