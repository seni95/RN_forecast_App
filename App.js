import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,
ActivityIndicator,Image
} from 'react-native';



const API_KEY = '03fb0586ba74a916cb5ec0524b8235e8';

export default function App() {

  const today={
    year:new Date().getFullYear(),
    month:new Date().getMonth()+1,
    date:new Date().getDate()
  }
  const [weather,setWeather] = useState({
    Clear : "날씨 맑음",
    Atmosphere:"대기가 좋지 않음",
    Clouds:"흐림",
    Snow : "눈이 와요",
    Rain:"비가 와요",
    Drizzle:"서리가 내려요",
    ThunderStrom:"천둥 번개"

  }); 

    const [mainImg, setMainImg]=useState({
      Clear: <Image 
      style={styles.mainImg}
      source={require('./img/Clear.jpg')}></Image>,
      Clouds: <Image 
      style={styles.mainImg}
      source={require('./img/Clouds.jpg')}></Image>,
      Atmosphere: <Image 
      style={styles.mainImg}
      source={require('./img/Atmosphere.jpg')}></Image>,
      Snow: <Image 
      style={styles.mainImg}
      source={require('./img/Snow.jpg')}></Image>,
      Rain: <Image 
      style={styles.mainImg}
      source={require('./img/Rain.jpg')}></Image>,
      Drizzle: <Image 
      style={styles.mainImg}
      source={require('./img/Drizzle.jpg')}></Image>,
      ThunderStrom: <Image 
      style={styles.mainImg}
      source={require('./img/ThunderStrom.jpg')}></Image>,
       

    });
  const [city,setCity] = useState("Loading...");
  const [current,setCurrent] = useState([]);
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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units="metric"&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const json = await response.json();
    
    // const response = await fetch(url+queryParams);
    // console.log(response+"?");
    // const json = await response.json();
    // console.log(json+"??");

    setCurrent(json);
  
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
    {current.weather==null?
 ( <View style={styles.day}>
  <ActivityIndicator color="white" size="large"></ActivityIndicator>
</View>) : 
<>
  <View style={styles.day}>
    {/* <View>{mainImg[current.weather[0].main]}</View> */}
    <Text>{"현재 "+weather[current.weather[0].main]+"!"}</Text>
    <Text>???</Text>
  </View>
  <View style={styles.day}>
    {/* <View>{mainImg[current.weather[0].main]}</View> */}
    <Text>{"현재 "+weather[current.weather[0].main]+"!"}</Text>
    <Text>???</Text>
  </View>
  </>
  
  }
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:"teal"
},

city:{
  justifyContent:"center",
  alignItems:"center"
},

cityName:{
fontSize:50,
fontWeight:"500"
},

weather:{
  flex:3
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
},
mainImg:{
  width:Dimensions.get('window').width-10,

  height:Dimensions.get('window').width/2
}
});
