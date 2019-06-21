import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
    ActivityIndicator
} from 'react-native';
import ModalHeader from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import styles from "./style";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import TouchableScale from "react-native-touchable-scale";
import { f, auth, storage, database } from "../../config/firebaseConfig";
import { COLOR_PRIMARY, COLOR_GRAY } from '../../config/styles';
import Video from 'react-native-video';
export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            region: null,
            showNavTitle: false,
            liked: false,
            post: [],
            loaded: false,
            id: null,
            authorId: f.auth().currentUser.uid
        }
        this.video = Video;
        this.mapRef = null;
    }
    componentDidMount = async () => {
        var params = this.props.navigation.state.params;
        console.log(params)
        if (params) {

            var that = this;

            var userId = f.auth().currentUser.uid
            database.ref('posts').child(params.id).on('value', (function (snapshot) {
                const exist = (snapshot.val() != null);
                // console.log(exist)
                if (exist) {
                    var data = snapshot.val();
                    var likes = data.likes
                    var count = 0
                    for (var liker in likes) {
                        console.log(liker);
                        if (liker == userId) {
                            that.setState({
                                liked: true
                            })
                            count += 1;
                        }
                    }
                    if (count == 0) {
                        that.setState({
                            liked: false
                        })
                    }
                    console.log(data)
                    const region = {
                        latitude: data.longitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.00922 * 1.5,
                        longitudeDelta: 0.00421 * 1.5
                    }
                    that.setState({
                        region: region,
                        image: data.image,
                        description: data.description,
                        animal: data.animalType,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        loaded: true,
                        userId: data.userId,
                        id: data.id,
                        posted: data.posted,
                        type: data.type

                    })
                    //that.mapView.animateToRegion(region, 1000);
                    var postArray = that.state.post
                    database.ref('users').child(data.userId).once('value').then(function (snapshot) {
                        const exsists = (snapshot.val() != null);
                        if (exsists) {
                            var data = snapshot.val();
                            that.setState({
                                avatar: data.dp,
                                name: data.first_name + " " + data.last_name,
                                loaded: true,
                                region: region
                            })
                        }

                    })
                }

                // console.log("inside pot " + that.state.post);

            }), function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
        console.log("Author ID is " + this.state.authorId)
    }

    clickEventListener() {
        // Alert.alert("Success", "Product has beed added to cart")
        const { navigate } = this.props.navigation;
        navigate('Comment')
    }
    openMap = () => {
        var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=" + this.state.latitude + "," + this.state.longitude;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    navBar = () => {
        this.navTitleView.fadeInUp(200)
        this.setState({
            showNavTitle: true
        })
    }

    timeConvertor = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval + ' Year' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + ' Month' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + ' Day' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + ' Hour' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + ' Minute' + this.timePlural(interval);
        }

        return Math.floor(seconds) + ' Second' + this.timePlural(seconds)
    }
    timePlural = (s) => {
        if (s == 1) {
            return ' ago'
        } else {
            return 's ago'
        }
    }
    setLike = (postID) => {
        if (this.state.liked == false) {
            var userId = f.auth().currentUser.uid;
            var set = 1;
            likeObj = {
                userId: userId,
                status: 1
            }
            database.ref("posts/" + postID + '/likes/' + userId).set(likeObj);
        } else {
            var userId = f.auth().currentUser.uid;
            database.ref("posts/" + postID + '/likes/' + userId).remove();
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeaderImageScrollView
                    maxHeight={200}
                    minHeight={50}
                    // headerImage={{ uri: this.state.image }}
                    fadeOutForeground
                    style={{ marginBottom: 10 }}
                    renderHeader={() => {
                        if (this.state.type == 0) {
                            return (
                                <Image source={{ uri: this.state.image }} style={styles.image} />
                            )
                        } else {
                            return (
                                // <View style={{alignItems:'center', justifyContent:'center', width:'100%', backgroundColor:COLOR_GRAY}}>
                                    <Video source={{ uri: this.state.image }}
                                        volume={10}
                                        repeat={true}
                                        fullscreen={true}
                                        width={700}
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            width: '100%',
                                            alignSelf: 'center'
                                        }} />
                                // </View>


                            )

                        }

                    }
                    }
                    renderForeground={() => (
                        <View style={styles.titleContainer}>
                            {/* <ActivityIndicator/> */}
                        </View>
                    )}

                    renderFixedForeground={() => (
                        <Animatable.View
                            style={{ height: 'auto', width: "100%" }}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >
                            {this.state.showNavTitle == true ? (
                                <ModalHeader title="Post" onPress={() => this.props.navigation.goBack()} />
                            ) : (
                                    <TouchableOpacity>

                                    </TouchableOpacity>
                                )}

                        </Animatable.View>
                    )}
                >

                    <TriggeringView
                        onHide={() => this.navBar()}
                        onDisplay={() => this.navTitleView.fadeOut(200)}
                    >
                    </TriggeringView>

                    <View style={styles.topView}>
                        <View style={styles.informationArea}>
                            <Text style={styles.name}>{this.state.animal}</Text>
                            <Text style={styles.description}>
                                {this.state.description}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.topView}>

                        <MapView
                            style={styles.mapContainer}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.00922 * 1.5,
                                longitudeDelta: 0.00421 * 1.5,
                            }}
                            showsUserLocation={true}
                            loadingEnabled={true}
                            zoomControlEnabled={true}
                            showsMyLocationButton={true}
                            scrollEnabled={false}
                        // ref={ref => { this.mapView = ref }}
                        >

                            {this.state.latitude != null && this.state.latitude != null ? (
                                <Marker
                                    coordinate={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                        latitudeDelta: 0.00922 * 1.5,
                                        longitudeDelta: 0.00421 * 1.5,
                                    }}
                                    title={"Here is the Animal"}

                                />

                            ) : (
                                    <View></View>
                                )}

                        </MapView>



                        <TouchableScale onPress={() => this.openMap()}
                            style={{
                                position: 'absolute',//use absolute position to show button on top of the map
                                top: '70%', //for center align
                                right: 5,
                                alignSelf: 'flex-end', //for align to right                                                               
                                width: 'auto',
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                backgroundColor: '#192f6a',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <Icon name="compass" size={24} color={'#fff'} style={{ alignSelf: 'center' }} />
                            <Text style={{ color: '#fff', fontSize: 14, marginLeft: 2 }}> Get Direction</Text>
                        </TouchableScale>


                    </View>

                    <View style={styles.profile}>
                        <Image style={styles.avatar}
                            source={{ uri: this.state.avatar }} />

                        <Text style={styles.profileName}>
                            {this.state.name}
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            {this.timeConvertor(this.state.posted)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View
                            style={styles.likeCommentArea}
                        >

                            {this.state.liked == false ? (
                                <TouchableOpacity style={[styles.row, { alignItems: 'flex-end' }]} onPress={() => this.setLike(this.state.id)} >
                                    <Icon name="thumbs-up" size={24} />
                                </TouchableOpacity>
                            ) : (
                                    <TouchableOpacity style={[styles.row, { alignItems: 'flex-end' }]} onPress={() => this.setLike(this.state.id)}>
                                        <Icon name="thumbs-up" size={24} color={COLOR_PRIMARY} />
                                    </TouchableOpacity>
                                )}


                        </View>

                        <View
                            style={styles.likeCommentArea}
                        >
                            <TouchableOpacity style={[styles.row, { alignItems: 'flex-start' }]} onPress={() => navigate('Comment', { id: this.state.id })}>
                                <Icon name="comment" size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={styles.starContainer}>
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                        <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
                    </View>
                    <View style={styles.contentColors}>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#00BFFF" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#FF1493" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#00CED1" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#228B22" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#20B2AA" }]}></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: "#FF4500" }]}></TouchableOpacity>
                    </View>
                    <View style={styles.contentSize}>
                        <TouchableOpacity style={styles.btnSize}><Text>S</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSize}><Text>M</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSize}><Text>L</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSize}><Text>XL</Text></TouchableOpacity>
                    </View> */}
                    <View style={styles.separator}></View>
                    <View style={styles.addToCarContainer}>
                        {this.state.userId != this.state.authorId ? (
                            <TouchableOpacity style={styles.shareButton} onPress={() => this.clickEventListener()}>
                                <Text style={styles.shareButtonText}>I Will Handle</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity style={styles.shareButton} onPress={() => this.clickEventListener()}>
                                    <Text style={styles.shareButtonText}>Edit</Text>
                                </TouchableOpacity>
                            )}

                    </View>

                </HeaderImageScrollView>
            </View>
        );
    }
}