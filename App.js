import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,
ActivityIndicator,Image
} from 'react-native';

import { Fontisto } from "@expo/vector-icons";

const API_KEY = '03fb0586ba74a916cb5ec0524b8235e8';

export default function App() {


  const [weather,setWeather] = useState({
    Clear : "날씨 맑음",
    Atmosphere:"대기가 좋지 않음",
    Clouds:"흐림",
    Snow : "눈이 와요",
    Rain:"비가 와요",
    Drizzle:"서리가 내려요",
    ThunderStrom:"천둥 번개",
    Mist:"안개가 꼈어요~"

  }); 

  const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
    Mist:"day-haze"
  };


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
      Mist:<Image 
      style={styles.mainImg}
      source={require('./img/Mist.jpg')}></Image>,
    });


  
  const [city,setCity] = useState("Loading...");
  const [current,setCurrent] = useState([]);
  const [hourlyData,setHourlyData] = useState([]);
  const [dayForecast,setDayForecast] = useState([]);
  const [location,setLocation] = useState(); 
  const [ok,setOk] = useState(true);
  
  const getDay = new Date();

  var year = getDay.getFullYear();
  var month = ('0' + (getDay.getMonth() + 1)).slice(-2);
  var day = ('0' + getDay.getDate()).slice(-2);

  
  const today = year + '-' + month  + '-' + day;
  const secondDay = month +'월' + (day+1)+'일';
  const thirdDay = month +'월' + (day+1)+'일';
  const fourthDay = month +'월' + (day+1)+'일';
  const fifthDay = month +'월' + (day+1)+'일';


  const setData = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
  if(!granted){
    setOk(false);
  }
    const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});  
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const json = await response.json();
    setCurrent(json);
   

  }

  const setDetailData = async()=>{
  
      const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({accuracy:5});
      const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});  
      setCity(location[0].city);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      const json = await response.json();
      setHourlyData(json);

    console.log(hourlyData);
    console.log("??");
         hourlyData.list.map((data)=>{
     
        if(data.dt_txt.substr(11,20)==="12:00:00" &&
        data.dt_txt.substr(0,10)!=today){
          console.log(data.dt_txt);
          setDayForecast(dayForecast.concat(data));
        }
      })

      
     
  }

  const settingDetailInfo = async()=>{

    console.log(dayForecast);
  
  }

  useEffect(()=>{
    setData();
    setDetailData();
    settingDetailInfo();
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
    // ||dayForecast[0]==null?
 ( <View style={styles.day}>
  <ActivityIndicator color="white" size="large"></ActivityIndicator>
</View>) : 
<>
  <View style={styles.day}>
    <View>{mainImg[current.weather[0].main]}</View>
    <Text>{"현재 "+weather[current.weather[0].main]}</Text>
    <View>
    <Fontisto name={icons[current.weather[0].main]} size={24} color="black" />
    <Text>최고기온:{Math.floor(current.main.temp_max)}도, 최저기온:{Math.floor(current.main.temp_min)}도</Text>
    </View>
  </View>


  {/* {console.log(dayForecast)} */}
  {/* <View style={styles.day}>
  <View>{mainImg[dayForecast[1].weather[0].main]}</View>
      <Text>{`${dayForecast[1].dt_txt} "${weather[dayForecast[1].weather[0].main]}"`}</Text>
    <View>
    <Fontisto name={icons[dayForecast[1].weather[0].main]} size={24} color="black" />
    <Text>최고기온:{Math.floor(dayForecast[1].main.temp_max)}도, 최저기온:{Math.floor(dayForecast[1].main.temp_min)}도</Text>
    </View>
  </View> */}


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
  flex:.3,
  justifyContent:"center",
  alignItems:"center"
},

cityName:{
fontSize:50,
fontWeight:"500"
},

weather:{
  width:Dimensions.get('window').width*5,
justifyContent:"space-between"
}
,
day:{
  width:327,
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
  width:"100%",
  height:Dimensions.get('window').width/2
}
});
