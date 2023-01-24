/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect,useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  Dimensions,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;













function Footbar({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.footer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.white : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}






const getCurrentDate=()=>{
 
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hour = new Date().getHours();
  var minutes = new Date().getMinutes();
  var seconds = new Date().getSeconds();
  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return {hour:hour,minutes:minutes,seconds:seconds};// hour + ':' + minutes + ':' + seconds;//format: d-m-y;
}

const Blink = (props: BlinkProps) => {
  const [date, setIsShowingText] = useState(getCurrentDate());

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(getCurrentDate());
    }, 100);
    //  if (date.seconds%10==0){
    //   return 0;
    //  }

    return () => clearInterval(toggle);
  });



  return <Text style={styles.time}>{date.hour}:{date.minutes}:{date.seconds}</Text>;
};









function Toolbar({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.white : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.footer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.footer,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}




type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

function TestApi():JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=sDNs8qATnAyQCkASC32NBbrJy7xMn4H4RnHRBm3O');
      const json = await response.json();

      setData(json);
      console.log(data);
      console.log('fui');
    } catch (error) {
      console.log('fui N');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

    var imageNasa = {uri:data.url};
    console.log(imageNasa);
  return (
    <View style={styles.card}>
      {isLoading ? (
        <View style={styles.screenLoading}>
        <Text>Carregando...</Text>
        </View>
      ) : (<View>
        <Image
        style={styles.stretch}
        source={imageNasa}
      />
        <Section>
        <Text style={styles.resume}><Text style={styles.highlight}> Nome: </Text>{data.title}</Text>
       {'\n'}
        <Text style={styles.resume}><Text style={styles.highlight}> Dia: </Text>{(data.date.split('-').reverse()).join('/')}</Text>
       {'\n\n'}
       <Text style={styles.resume}><Text style={styles.highlight}> Resumo: </Text>{data.explanation}</Text>
        </Section>
        </View>
      )}
    </View>
  );
};







const image = {uri:'https://raw.githubusercontent.com/reinanbr/app_image_day/main/src/img/background.jpg'};



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darkest : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}> 
      <View
          style={{flex:1,color:'red'},{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>  
          <Toolbar title="Imagem do dia - NASA"><Blink/></Toolbar>
    

   
                   
       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
         

           
          <TestApi/> 


    </ImageBackground>


  <Footbar style={styles.footer}><Text  style={styles.footer}><Text>Copyright ReinanBr@ReySfots 2021</Text></Text></Footbar>
      </View> 
      </ScrollView> 

    </SafeAreaView>
  );
}
//const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color:'#F9E875'
  },
  red:{
    color:'#F9E875'
  },
  sectionDescription: {
    marginTop: 1,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  resume:{
    fontSize:11,
  },
  image: {
  flex:1,
  paddingBottom:windowHeight-650,
    justifyContent: 'center'}
    ,

  card:{
    flex:1,
    backgroundColor: '#000000c0',


    fontSize:30,
    color:'red',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop:10,
    paddingBottom:windowHeight - 700,
    marginBottom:windowHeight - 650,
    marginTop: 0,
    fontWeight:'800' // Replace by 20
  },
  stretch: {
    width: 450,
    height: 200,
    marginBottom:10,
    resizeMode: 'stretch',
  },
  time:{
    fontSize:13,
    paddingBottom:20,
  },
  footer:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    textAlign:'left',
    fontSize:12,
    alignSelf: 'center',
    paddingTop:10,
    paddingBottom:20
  },
  screenLoading:{
    paddingBottom:10,
    marginBottom:windowHeight,
  }
});

export default App;