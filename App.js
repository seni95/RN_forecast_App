import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,
ActivityIndicator
} from 'react-native';
import getXY from './getXY';
import returnSky from './returnSky';

const API_KEY = 'COCEejn2UXeAoSoljMOHyqJ88%2FOq7swd%2BVv6R1N1Q4X5%2FriHHsciOzELW35RPSk0n0DSsM0On5sV%2BV26c1MOYw%3D%3D';

export default function App() {
const returnsky = new returnSky();
const getXy = new getXY();
  const  now = new Date();
var month = now.getUTCMonth() + 1; //months from 1-12
var day = now.getDate();
var year = now.getFullYear();

month = month.toString();
if(day<10){
day = day.toString();
day ="0"+day;
} else{
  day = day.toString();
}
year = year.toString();

const today = year + month + day;
const hours = now.getHours()-1;

const nowTime = hours.toString()+now.getMinutes().toString();


  const [city,setCity] = useState("Loading...");
  const [days,setDays] = useState([]);
  const [location,setLocation] = useState(); 
  const [ok,setOk] = useState(true);
  const [skyResult,setSkyResult]=useState(undefined);
  const ask = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
  if(!granted){
    setOk(false);
  }
  

    const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});  
    setCity(location[0].city);
    const rs = getXy.dfs_xy_conv("toXY",latitude,longitude);
    console.log(rs);
    console.log(rs.x);
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+API_KEY; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('266'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json'); /**/
queryParams += '&' + encodeURIComponent('code') + '=' + encodeURIComponent('24'); /**/ 
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(nowTime); /**/
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(today); /**/
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

const sky = json.response.body.items.item[18].fcstValue;
const skyResult = returnsky.returnValue(sky);
setSkyResult(skyResult);
console.log(skyResult);
console.log("?");



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
(<View>
  <Text>{skyResult}</Text>
</View>)  
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
