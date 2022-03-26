import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Keyboard } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow, faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components/native';
import { GlobalContext } from '../reducers/GlobalState.native';

const StyledHeader = styled.View`
    background: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-height: 2%;
    padding: 1.5%;
    width: 95%;
    padding-top: 50px;
`

const StyledDiv = styled.View`
    display: flex;
    justify-content: space-between;
    align-items:center;
    border-radius: 50px;
    width: 40%;
    ${props => props.location ? 'width: 30%; color: #E5E5E5; flex-direction: row;' : null}
    ${props => props.input ? 'flex-direction: row; margin-vertical: 2px; background: #ECE8E8; padding: 5px;' : null}
    ${props => props.fail === 'true' ? 'border: 2px solid red;' : null}
`

const StyledText = styled.Text`
    color: #E5E5E5;
    font-size: 15px;
`
const StyledInput = styled.TextInput`
    background: #ECE8E8;    
    margin-right: .3%;
    padding:5px;
    border: 1px solid transparent;
    border-radius: 20px;
    &:focus{
        text-decoration:none;
        outline:none;
    }
`
const Header = () => {
    const {weather, setWeather} = useContext(GlobalContext);
    const [city, setCity] = useState('');
    const [fail, setFail] = useState('');
    console.log(city);

    useEffect(()=>{
    }, [fail,setFail])
    const handleSubmit = (evt) =>{
        evt.preventDefault();
            const fetchData = async () => {
            await fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${city}&units=metric&lang=pl&APPID=44253aec1e681b16a5ba238a57d45020`)
            .then(res => {
                if(res.ok){
                    setFail('false');
                    setCity('');
                    Keyboard.dismiss();
                    return res.json()
                }else{
                    throw new Error('Błędna nazwa miasta');
                }})
            .then(result => {
            setWeather(result);
            console.log(weather);
            }).catch( (error) => {
                setFail('true');
                console.log(fail);
                console.log(error);
            })
            }
            fetchData();
    }
    return(
        <StyledHeader>
            <StyledDiv location={true}>
                <FontAwesomeIcon icon={faLocationArrow}/>
                <StyledText>{weather?.name}</StyledText>
            </StyledDiv>
            <StyledDiv input={true} fail={fail}>
                <StyledInput 
                type="text" 
                placeholder="Miejscowość..."
                value={city}
                onChangeText={text => setCity(text)}
                ></StyledInput>
                    <FontAwesomeIcon icon={faSearch} onPress={handleSubmit} size={23}/>
            </StyledDiv>
        </StyledHeader>
    )
}
export default Header;


  