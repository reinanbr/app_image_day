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

  return (
    <View style={styles.card}>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <Text>{data.date}</Text>
        // <FlatList
        //   data={data}
        //   keyExtractor={({id}) => id}
        //   renderItem={({item}) => (
        //     <Text>
        //       {item.date}, {item}
        //     </Text>
        //   )}
        // />
      )}
    </View>
  );
};


// function TestApi() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);

//   // Note: the empty deps array [] means
//   // this useEffect will run once
//   // similar to componentDidMount()
//   useEffect(() => {
//     fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       )
//   }, [])

//   if (error) {
//     return <Text>Error: {error.message}</Text>;
//   } else if (!isLoaded) {
//     return <Text>Loading...</Text>;
//   } else {
//     return (
//     <Text>foi</Text>
//     );
//   }
// }






const image = {uri:'src/img/background.jpg'};



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
       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
         
          <Toolbar title="Imagem do dia - NASA">

           
     
        
          </Toolbar>
           
          <TestApi/> 

          {/* <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section tite="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next: */}

    </ImageBackground>
         </View> 
      </ScrollView> 
    </SafeAreaView>
  );
}
//const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
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
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    flex: 1,
    justifyContent: 'center'}
    ,

  card:{
    backgroundColor: '#000000c0',
    flex: 1,

    fontSize:30,
    color:'red',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop:100,
    marginTop: 20,
    fontWeight:'800' // Replace by 20
  }
});

export default App;
