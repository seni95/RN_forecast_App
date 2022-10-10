import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,
ActivityIndicator
} from 'react-native';

const API_KEY = '59a2af02503a9fc4c0dd72c1048a3295';

export default function App() {

  const today={
    year:new Date().getFullYear(),
    month:new Date().getMonth()+1,
    date:new Date().getDate()
  }

  const [city,setCity] = useState("Loading...");
  const [days,setDays] = useState([]);
  const [location,setLocation] = useState(); 
  const [ok,setOk] = useState(true);
  const ask = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
  if(!granted){
    setOk(false);
  }
    const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});  
    setCity(location[0].city);
   const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`);
    const json = await response.json();
    
    console.log(json.cod);
    // const response = await fetch(url+queryParams);
    // console.log(response+"?");
    // const json = await response.json();
    // console.log(json+"??");
    // setDays(json.daily);
  }
  useEffect(()=>{
    ask();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
      pagingEnabled 
      showsHorizontalScrollIndicator={false} 
      horizontal  
      contentContainerStyle={styles.weather}>
    {days==undefined?
 ( <View style={styles.day}>
  <ActivityIndicator color="white" size="large"></ActivityIndicator>
</View>) : 
(<View></View>)  
  }
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
container:{
  flex:1, backgroundColor:"teal"
},

city:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
},

cityName:{
fontSize:68,
fontWeight:"500"
},

weather:{
}
,
day:{
  width:Dimensions.get('window').width,
  alignItems:"center",
},
temp:{
  marginTop:50, 
fontSize:178
},
desc:{
  marginTop:-30,
  fontSize:60
}
});
