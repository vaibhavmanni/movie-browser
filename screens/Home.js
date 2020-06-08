import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { fetchMovies } from "../api/api";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            movies: [],
        };
    }
    // display movie list
    searchMovies = async () => {
        this.getSearch(this.state.text)
    } 

      //get search results from fetchMovies
    getSearch = async text => {
        const results = await fetchMovies(text)
        this.setState({ movies: results });
    };
    
    //loading more movies
    handleLoadMore = async () => {
        try {
            const page = Math.trunc(this.state.movies.length / 10) + 1;
            const res = await fetchMovies(this.state.text, page);
            this.setState(prevState => ({
                movies: prevState.movies.concat(res),
            })) 
        }catch(err){
            console.log(err.message);
        }
    }

      //movie title and poster to render in the flatlist
    movieCard = ({ item }) => {
        return (
        <TouchableHighlight
            style={styles.movieCard}
            underlayColor="white"
            onPress={() => {
            this.props.navigation.navigate("Details", {
                    title: item.title,
                    id: item.imdbID
                });
            }}
        >
            
            <View style={{flexDirection:"row"}}>
                <View style={{width:"20%", justifyContent:"center"}}>
                    <Image
                        source={{ uri: item.Poster}}
                        style={{width: 60, height:60, borderRadius: 10}}
                    />
                </View>
                <View style={{width:"80%", justifyContent:"center"}}>
                    <Text style={styles.movieTitle}>{item.Title} ({item.Year})</Text>
                </View>
            </View>
        </TouchableHighlight>
        );
    };
    


render() {
    return(
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="search" size={22} color="#333" onPress={this.searchMovies}/>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoFocus maxLength={45}
                    placeholder='Enter a movie name..'
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={this.searchMovies}
                />
            </View>
            <FlatList
                style={styles.movieList}
                data={this.state.movies}
                renderItem={({item}) => this.movieCard({item})}
                keyExtractor={item => item.Title + item.imdbID}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
            />           
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#DDD',
        alignItems: 'center',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        maxHeight: 50,
        borderRadius:10
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        fontSize: 17
    },
    movieList: {
        flex: 1, 
        marginHorizontal: 15,
        marginTop: 20,
    },
    movieCard: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: "#fff"

    },
    movieTitle: {
        textAlign: "center",
        fontSize: 20,
        color: '#333'    
    }
});