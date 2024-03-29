import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Header from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import NotificationBanner from '../../components/NotificationBanner/notificationBanner';
import styles from './style';
import Swipeout from 'react-native-swipeout';
import Ionicons from "react-native-vector-icons/FontAwesome";
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
export default class NotificationScreen extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        data: [
                                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", text: "Lorem ipsum dolor sit amet. ", posted: "2 hours Ago", read: 1 },
                                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 0 },
                                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 1 },
                                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 0 },
                                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 1 },
                                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 1 },
                                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", text: "Lorem ipsum dolor sit amet.", posted: "2 hours Ago", read: 0 },
                        ],
                        comment: '',
                        rowIndex: null,
                        alterView: false


                }
        }
        onSwipeOpen(rowIndex) {
                this.setState({
                        rowIndex: rowIndex
                })
        }
        onSwipeClose(rowIndex) {
                if (rowIndex === this.state.rowIndex) {
                        this.setState({ rowIndex: null });
                }
        }

        render() {

                return (
                        <View style={{ flex: 1, flexDirection: 'column', }}>
                                <Header title={"Notifications"} height={50} drawer={() => this.props.navigation.openDrawer()}/>
                                {/* <TouchableOpacity onPress={() => this.setState({ alterView: true })} style={{ justifyContent: 'flex-end', marginVertical: 10, flexDirection: 'row', marginRight: 10 }}>
                                        <Text style={{ color: "#007bff" }}>Mark All As Read</Text>
                                        <Ionicons name={"check-double"} size={12} color={"#007bff"} />
                                        <Ionicons name={"check"} size={12} color={"#007bff"} />
                                </TouchableOpacity> */}
                                <View style={styles.container}>
                                        <FlatList
                                                style={styles.scrollView}
                                                data={this.state.data}
                                                extraData={this.state.rowIndex}
                                                ItemSeparatorComponent={() => {
                                                        return (
                                                                <View style={styles.separator} />
                                                        )
                                                }}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item, index }) => {
                                                        const Notification = item.item;
                                                        var unRead = [
                                                                {
                                                                        component: <Ionicons name={"trash"} size={20} color={"#b00020"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#fff',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { alert(item.name) }
                                                                },
                                                                {
                                                                        text: 'Mark As Read',
                                                                        component: <Ionicons name={"check"} size={20} color={"#0D47A1"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#fff',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { alert(item.name) }
                                                                }

                                                        ];

                                                        var read = [
                                                                {
                                                                        component: <Ionicons name={"trash"} size={20} color={"#b00020"} style={{ alignSelf: 'center', marginTop: '50%' }} />,
                                                                        backgroundColor: '#fff',
                                                                        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                                                                        onPress: () => { alert(item.name) }
                                                                }
                                                        ];

                                                        if (item.read == 1) {
                                                                return (
                                                                        <Swipeout
                                                                                rowIndex={index}
                                                                                sectionId={0}
                                                                                onOpen={() => this.onSwipeOpen(index)}
                                                                                close={this.state.rowIndex !== index}
                                                                                onClose={() => this.onSwipeClose(index)}
                                                                                sensitivity={50}
                                                                                autoClose={true}
                                                                                style={{ width: '100%', backgroundColor: 'transparent' }}
                                                                                right={read}>
                                                                                <NotificationBanner
                                                                                        read={item.read}
                                                                                        image={{ uri: item.image }}
                                                                                        name={item.name}
                                                                                        posted={item.posted}
                                                                                        text={item.text}
                                                                                />
                                                                        </Swipeout>
                                                                );
                                                        } else {
                                                                return (
                                                                        <Swipeout
                                                                                rowIndex={index}
                                                                                sectionId={0}
                                                                                onOpen={() => this.onSwipeOpen(index)}
                                                                                close={this.state.rowIndex !== index}
                                                                                onClose={() => this.onSwipeClose(index)}
                                                                                sensitivity={50}
                                                                                autoClose={true}
                                                                                style={{ width: '100%', backgroundColor: 'transparent' }}
                                                                                right={unRead}>
                                                                                <NotificationBanner
                                                                                        read={item.read}
                                                                                        image={{ uri: item.image }}
                                                                                        name={item.name}
                                                                                        posted={item.posted}
                                                                                        text={item.text}
                                                                                />
                                                                        </Swipeout>
                                                                );
                                                        }

                                                }} />
                                </View>

                        </View>
                );
        }
}
