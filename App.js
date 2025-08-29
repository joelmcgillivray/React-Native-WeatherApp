import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import { weatherKey } from './keys';
import axios from 'axios';

const img = require('./assets/weather.png')
export default function App() {
  const [input, setInput] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: weatherKey,
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  };

  const fetchDataHandler = useCallback(() => {
    setIsLoading(true);
    setInput("");
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metrics&appid=${api.key}`,
    })
    .then(res=> {
      console.log(res.data);
      setData(res.data);
    }).catch(e=>console.dir(e))
    .finally(()=>setIsLoading(false));
  }, [api.key, input])

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={{flex:1, justifyContent: 'center'}}>
        <ScrollView>
          <Text style={styles.weatherTitle}>Web Dev WeatherApp</Text>
          {data.length !== 0 && 
          <View style={styles.infoView}>
            <Text style={styles.tempText}>{`${Math.round(data?.main?.temp,
              )} °C`}</Text>
            <Text style={styles.MMText}>{`Min: ${Math.round(data?.main?.temp_min)} °C, Max: ${Math.round(data?.main?.temp_max)} °C`}</Text>
            <Text style={styles.tempText}>{`${data?.weather[0]?.main}`}</Text>
          </View>}

            <TextInput placeholder='Enter city or location' 
              onChangeText={text=>setInput(text)}
              value={input}
              placeholderTextColor={'#000'} 
              style={styles.textInput}
              onSubmitEditing={fetchDataHandler}></TextInput>
            
            {loading && (
              <View>
                <ActivityIndicator size={'large'} color="blue"/>
              </View>
            )}
        
            <StatusBar style="auto" />
            
            {data.length === 0 && (
            <View style={styles.welcomeView}>
              <Text style={styles.welcomeText}>Enter in a city above...</Text>
              <Text>Ps. You can scroll :)</Text> 
            </View>)}

            {data.length !== 0 && 
            <View style={styles.infoView}>
              <Text style={styles.geoText}>
                {`${data?.name}, ${data?.sys?.country}`}
              </Text>
              <Text style={styles.dateText}>
                {new Date().toLocaleString()}
              </Text>
            </View>}

            <Text style={styles.nameText}>Joel McGillivray</Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherTitle: {
    fontSize: 36, 
    color: 'black', 
    textAlign: 'center', 
    justifyContent: 'center',
    marginTop: 200,
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
    textAlign: 'center',
  },
  infoView: {
    alignItems: 'center',
  },
  geoText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'black',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10
  },
  MMText: {
    fontSize: 30,
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 30,
    marginVertical: 10,
  },
  welcomeView: {
    alignItems: 'center'
  },
  nameText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 500,
    textAlign: 'center',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  }

});
