import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,
ActivityIndicator,Image
} from 'react-native';
import getXY from './getXY';
import skyStatus from './returnSky';


const API_KEY = 'COCEejn2UXeAoSoljMOHyqJ88%2FOq7swd%2BVv6R1N1Q4X5%2FriHHsciOzELW35RPSk0n0DSsM0On5sV%2BV26c1MOYw%3D%3D';

export default function App() {
const sky_status = new skyStatus();
const getXy = new getXY();
  const  now = new Date();
var month = now.getUTCMonth() + 1; //months from 1-12
var day = now.getDate();
var year = now.getFullYear();

month = month.toString();

const hours = now.getHours()-1;
const nowTime = hours.toString()+now.getMinutes().toString();

if(hours<5){
day = day-1;
}

console.log(day);

if(day<10){
day = day.toString();
day ="0"+day;
} else{
  day = day.toString();
}
year = year.toString();

const today = year + month + day;



  const [city,setCity] = useState("Loading...");
  const [days,setDays] = useState([]);
  const [location,setLocation] = useState(); 
  const [ok,setOk] = useState(true);
  const [skyResult,setSkyResult]=useState([]);
  const ask = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
  if(!granted){
    setOk(false);
  }
  

    const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});  
    setCity(location[0].city);
    const rs = getXy.dfs_xy_conv("toXY",latitude,longitude);
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+API_KEY; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('266'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json'); /**/
queryParams += '&' + encodeURIComponent('code') + '=' + encodeURIComponent('24'); /**/ 
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(nowTime); /**/
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20221010'); /**/
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(rs.x); /**/
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(rs.y); /**/



const response = await fetch(url + queryParams);

// xhr.onreadystatechange = function () {
//     if (this.readyState == 4) {
//       console.log()
//         // console.log('Status: '+this.status+'nHeaders: '+JSON);
//     }
// };
const json = await response.json();
const forecastArray = json.response.body.items.item;
const sky = []
let i=0;
forecastArray.map(item=>
  { 
    if(item.category=="SKY"){
      sky[i] = item;
      i++;
    }
  });
// const skyResult = returnsky.returnValue(sky);
// setSkyResult(skyResult);
  const statusValue = sky.map(i=>i.fcstValue);
  // console.log(test);
  // console.log("??");

  const skyResult = [];

  i=0;
  statusValue.map(item=>{
  skyResult[i] = sky_status.returnValue(item);  
  i++;
  })


  console.log(skyResult);

  setSkyResult(skyResult);

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
    {skyResult==undefined?
 ( <View style={styles.day}>
  <ActivityIndicator color="white" size="large"></ActivityIndicator>
</View>) : 
(

  // <View>
  //   <Text>{skyResult}</Text>
  // </View>
  skyResult.map(item=>{

return   (<View style={styles.day}>
  {/* <View>
    <Image
    style={styles.img}
    source={require('./weather_img/status_1.jpg')}
    ></Image>
  </View> */}
  <Text>{item[1]}</Text>
</View>)

})
)  
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
},
img:{
  width:100,
  height:100
}
});
