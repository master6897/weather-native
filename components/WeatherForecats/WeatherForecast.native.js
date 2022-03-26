import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from "../reducers/GlobalState";
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';


const StyledArticle = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 1%;
    padding: 0.5%;
    color: #E5E5E5;
    margin-bottom: 100px;
`
const StyledContainer = styled.View`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    overflow: hidden;
    color: #E5E5E5;
`

const StyledDiv = styled.View`
    display: flex;
    color: #E5E5E5;
`

const StyledDayContainer = styled.View`
    padding: 20px;
    border-radius: 15px;
    margin: 1px;
    background: rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    width: 100%;
    color: #E5E5E5;
`

const StyledH1 = styled.Text`
    font-size: 30px;
    font-weight: 600;
    color: #E5E5E5;
`
const StyledText = styled.Text`
    color: #E5E5E5;
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    margin-right: 20px;
    color: #E5E5E5;
`

function WeatherForecast () {
    const {weather} = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    useEffect(()=>{
        setLat(weather?.coord.lat);
        setLon(weather?.coord.lon);
        async function fetchData() {
            if (weather?.coord.lat && weather?.coord.lon) {
                await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=44253aec1e681b16a5ba238a57d45020`)
                    .then(res => res.json())
                    .then(result => {
                        setData(result);
                        console.log(result);
                    }, (error) => {
                        if (error) {
                            console.log('fail');
                        }
                    });
            }
        }
            fetchData();
    }, [lat, lon, weather?.coord.lat, weather?.coord.lon])
        
    return(
        <StyledArticle>
            <StyledH1 className="title">Prognoza na 7 dni:</StyledH1>
            <ScrollView style={{width: '90%', flexGrow: 1}}>
            <StyledContainer>
                {data.daily?.slice(1).map((day, index) => {return(
                    <StyledDayContainer key={index}>
                        <StyledDiv>
                            <StyledH1>{(new Date(day.dt*1000)).toLocaleDateString('pl-PL', {weekday: 'long'})}</StyledH1>
                            <Image source={{uri:`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}} />
                        </StyledDiv>
                                <StyledText>{day.description}</StyledText>
                                <View>
                                    <StyledIcon icon={faTemperatureLow} size={32}/>
                                    <StyledText>{day.dayTemp} &deg;C . Odczuwalna: {day.dayFeelsLike} &deg;C</StyledText>
                                </View>
                                <View>
                                    <StyledIcon icon={faTemperatureLow} size={32}/>
                                    <StyledText>w nocy: {day.nightTemp}&deg;C  . Odczuwalna: {day.nightFeelsLike}&deg;C</StyledText>
                                </View>
                                <StyledText>Ciśnienie: {day.pressure}</StyledText>
                    </StyledDayContainer>
                )})}
            </StyledContainer>
            </ScrollView>
        </StyledArticle>
    )
}

export default WeatherForecast;