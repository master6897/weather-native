import React, { useEffect, useState, useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.native";
import styled from "styled-components/native";
import { GlobalContext } from "../reducers/GlobalState.native";
import WeatherForecast from "../WeatherForecats/WeatherForecast.native";
import LoadingWindow from "../LoadingPage/LoadingPage.native";
import {Constants} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { ScrollView } from "react-native";

const StyledContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40%;
  position: relative;
`;

export default function Main() {
  const {weather,setWeather} = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState('true');


  useEffect(async () => {
    const fetchData = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
      if(status !== 'granted'){
        console.log('error');
        setError('error');
        try{
          await fetch(`https://api.openweathermap.org/data/2.5/weather/?q=Warszawa&units=metric&lang=pl&APPID=44253aec1e681b16a5ba238a57d45020`)
          .then(res => res.json())
          .then(result => {
            setData(result);
            setWeather(result);
            setLoading('false');
            console.log(result);
            }).catch(err => {
              console.log(err);
            });
        }catch (error){
          setError('Query error')
        }
      }else{
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
            try{
              await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&lang=pl&APPID=44253aec1e681b16a5ba238a57d45020`)
              .then(res => res.json())
              .then(result => {
                setData(result);
                setWeather(result);
                setLoading('false');
                console.log(result);
                }).catch(err => {
                  console.log(err);
                });
            }catch (error){
              setError('Query error');
            }
            console.log('hahahahahhaha');
            console.log(weather);
      }
      }
        fetchData();
      },[]);
  
  return (
    <StyledContainer>
      <ScrollView>
        {loading === 'false'? <WeatherCard /> :<LoadingWindow />}
        {loading === 'false'? <WeatherForecast />: <LoadingWindow />}
      </ScrollView>
    </StyledContainer>
  );
}