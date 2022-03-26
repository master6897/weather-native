import React, {useContext, useState, useEffect} from 'react';
import { GlobalContext } from '../reducers/GlobalState.native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const StyledContainer = styled.View`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
font-family: abel;
background-color: rgb(236,130,156);
`;

const StyledLinearGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`

const MainPage = props => {
  const {weather,setWeather} = useContext(GlobalContext);
  const [background,setBackground] = useState();
  const [backgroundGradient, setBackgroundGradient] = useState([]);
  let backgroundGradientColors;
    useEffect(()=>{
        if(weather?.weather[0].main === 'Clouds'){
            setBackground('rgb(198,207,200);');
            backgroundGradientColors = ['rgba(198,207,200,1)', 'rgba(4,84,126,1)'];
            setBackgroundGradient(backgroundGradientColors);
        }else if(weather?.weather[0].main === 'Clear'){
          setBackground('rgb(190,207,205);');
          backgroundGradientColors = ['rgba(190,207,205,1)', 'rgba(45,147,196,1)'];
          setBackgroundGradient(backgroundGradientColors);
          console.log(backgroundGradient);
        }else if(weather?.weather[0].main === 'ThunderStorm'){
          setBackground('rgb(236,130,156);');
          backgroundGradientColors = ['rgba(236,130,156,1)', 'rgba(4,84,126,1)'];
          setBackgroundGradient(backgroundGradientColors);
        }else if(weather?.weather[0].main === 'Rain' || 'Drizzle' || 'Snow'){
          setBackground('rgb(191,187,188);');
          backgroundGradientColors = ['rgba(191,187,188,1)', 'rgba(60,61,61,1)'];
          setBackgroundGradient(backgroundGradientColors);
        }else{
          setBackground('rgb(191,187,188);');
          backgroundGradientColors = ['rgba(191,187,188,1)', 'rgba(60,61,61,1)'];
          setBackgroundGradient(backgroundGradientColors);
        }
    }, [background]);
    return(
        <StyledContainer background={background} >
          <StyledLinearGradient colors={[backgroundGradient[0], backgroundGradient[1]]}>
            {props.children}
            </StyledLinearGradient>
        </StyledContainer>
    )
}

export default MainPage;