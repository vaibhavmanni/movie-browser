import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { fetchById } from "../api/api";

export default class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieInfo: null
    };
  }

  //get id params from movieTitle item navigation
  componentDidMount() {
    this.getMoviesById(this.props.route.params.id);
  }
  //getting id results from fetchById
  getMoviesById = async id => {
    const results = await fetchById(id);
    this.setState({ movieInfo: results });
  };

  render() {
    return(
      <View style={styles.container}>
        {this.state.movieInfo && this.state.movieInfo.Poster ? (
          <Image
            resizeMode='cover'
            source={{ uri: this.state.movieInfo.Poster }}
            style={styles.movieImage}
          />
        ) : null}
        {this.state.movieInfo && (
          <ScrollView style={styles.detailsContainer}>
            <Text style={styles.movieTitle}>{this.state.movieInfo.Title}</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Year: </Text>{this.state.movieInfo.Released}</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Genre: </Text>{this.state.movieInfo.Genre}</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Rating: </Text>{this.state.movieInfo.imdbRating}</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Rated: </Text>{this.state.movieInfo.Rated}</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 17}}>Director: </Text>{this.state.movieInfo.Director}</Text>
            <Text style={styles.movieActors}><Text style={{fontWeight: 'bold', fontSize: 17}}>Actors: </Text>{this.state.movieInfo.Actors}</Text>
            <Text style={styles.moviePlot}><Text style={{fontWeight: 'bold', fontSize: 17}}>Plot: </Text>{this.state.movieInfo.Plot}</Text>
          </ScrollView>
        )}
        
      </View>
  )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    movieImage: {
      width: '100%',
      height: 400,
    },
    detailsContainer: {
      marginHorizontal: 10,
    },
    movieTitle: {
      fontSize: 25,
      marginVertical: 15,
      fontWeight: 'bold',
    },
    movieActors: {
      marginVertical: 10
    },
    movielPlot: {
      marginVertical: 10
    }
});