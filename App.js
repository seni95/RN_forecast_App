import { StatusBar } from 'expo-status-bar';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions } from 'react-native';

export default function App() {
  const [location,setLocation] = useState(); 
  const [ok,setOk] = useState(true);
  const ask = async() =>{

  }
  useEffect(()=>{
    ask();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
      pagingEnabled 
      showsHorizontalScrollIndicator={false} 
      horizontal  
      contentContainerStyle={styles.weather}>
    <View style={styles.day}>
      <Text style={styles.temp}>27</Text>
      <Text style={styles.desc}>Sunny</Text>
    </View>
    <View style={styles.day}>
      <Text style={styles.temp}>27</Text>
      <Text style={styles.desc}>Sunny</Text>
    </View>
    <View style={styles.day}>
      <Text style={styles.temp}>27</Text>
      <Text style={styles.desc}>Sunny</Text>
    </View>
    <View style={styles.day}>
      <Text style={styles.temp}>27</Text>
      <Text style={styles.desc}>Sunny</Text>
    </View> 
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
