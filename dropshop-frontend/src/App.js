import './App.css';
import Navbar from "./components/navbar/Navbar";
import Content from "./components/header/Content";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer";
import {Provider} from "react-redux";
import store from "./store/store";


function App() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="header">
                    <Content/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
