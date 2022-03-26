import React, { useContext } from "react";
import styled from "styled-components/native";
import { GlobalContext } from "../reducers/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWind, faCloudSun, faMoon, faCloud } from '@fortawesome/free-solid-svg-icons';
import { Text } from "react-native";

const MainContainer = styled.View`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    width: 95%;
    background: transparent;
`

const GlassMorphism = styled.View`
    min-width:40%;
    padding: 5%;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    margin: 10px;

    background-color: rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    color: #E5E5E5;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: #E5E5E5;
    margin-bottom: 10px;
`

const StyledText = styled.Text`
    color: #E5E5E5;
    font-size: 15px;
`

export default function  WeatherDetails(){
    const {weather} = useContext(GlobalContext);
    console.log(weather);
    return(
        <MainContainer>
            <GlassMorphism>
                <StyledIcon icon={faWind} size={32}/>
                <StyledText>{weather.wind.speed} m/s</StyledText>
            </GlassMorphism>
            <GlassMorphism>
                <StyledIcon icon={faCloudSun} size={32}/>
                <StyledText>{new Date(weather.sys.sunrise*1000).toLocaleTimeString()}</StyledText>
            </GlassMorphism>
            <GlassMorphism>
                <StyledIcon icon={faMoon} size={32}/>
                <StyledText>{new Date(weather.sys.sunset*1000).toLocaleTimeString()}</StyledText>
            </GlassMorphism>
            <GlassMorphism>
                <StyledIcon icon={faCloud} size={32}/>
                <StyledText>{weather.clouds.all}%</StyledText>
            </GlassMorphism>
        </MainContainer>
    )
}
