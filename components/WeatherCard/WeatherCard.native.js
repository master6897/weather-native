import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../reducers/GlobalState.native';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons'
import WeatherDetails from '../WeatherDetails/WeatherDetails.native';

const MainContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background: transparent;
`
const GlassMorphism = styled.View`
    width:90%;
    margin-top: 20px;
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    background: rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    color: #E5E5E5;
`;

const StyledH1 = styled.Text`
    font-size: 20px;
    text-transform: uppercase;
    @media screen and (min-width: 1025px){
        font-size: 20px;
    }
`;

const StyledParagraph = styled.Text`
    font-size: 20px;
    color: #E5E5E5;
`;

const StyledDiv = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    ${props => props.descr ? 'flex-direction: column; margin-top: 10px;' : null}

`
const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 50px;
    margin-right: .5%;
    color: #E5E5E5;
`

export default function WeatherCard(){
    const {weather} = useContext(GlobalContext);
    useEffect(()=>{
       
    }, [weather?.weather]);


    return(
        <MainContainer>
            <GlassMorphism>
                <Image source={{uri:`https://openweathermap.org/img/w/${weather?.weather[0].icon}.png`,}} />
                <StyledDiv>
                    <StyledIcon icon={faTemperatureLow} size={48}/>
                    <View>
                        <StyledParagraph>{weather?.main.temp} &deg;C</StyledParagraph>
                        <StyledParagraph>Odczuwalna: {weather?.main.feels_like} &deg;C</StyledParagraph>
                    </View>
                </StyledDiv>
                <StyledDiv descr={true}>
                    <StyledParagraph className="press">Ciśnienie: {weather?.main.pressure} hPa</StyledParagraph>
                    <StyledParagraph className='descr'>{weather?.weather[0].description}</StyledParagraph>
                </StyledDiv>
            </GlassMorphism>
            <WeatherDetails />
        </MainContainer>
    )
}