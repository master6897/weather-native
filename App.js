
import { StatusBar } from 'expo-status-bar';
import Header from './components/Navigation/Navigation.native';
import Main from './components/Main/Main.native';
import { GlobalProvider } from './components/reducers/GlobalState.native';
import Footer from './components/Footer/Footer.native';
import MainPage from './components/Pages/MainPage.native';

export default function App() {
  
  return (
    <GlobalProvider>
      <MainPage>
        <Header />
        <Main />
        <StatusBar style="auto" />
      </MainPage>
    </GlobalProvider>
  );
}
