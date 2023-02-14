import { StatusBar } from 'expo-status-bar';
import  RegistrationScreen  from "./screens/auth/RegistrationScreen";
// import LoginScreen from "./screens/auth/LoginScreen";

export default function App() {

  return (  
    <>
      <RegistrationScreen />
      {/* <LoginScreen/> */}
      <StatusBar style="auto" />
    </>
  );
}

