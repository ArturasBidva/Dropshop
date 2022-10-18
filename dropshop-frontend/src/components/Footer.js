import React, {Component} from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

class Footer extends Component {

    render() {
        return (
            <div className="footer-icons">
                <div className="footer-icons-wrapper">
        <FacebookRoundedIcon fontSize="large"/>
                <InstagramIcon fontSize="large"/>
                <TwitterIcon fontSize="large"/>
                </div>
                <div className="text-footbar">
                    GetTasty Copyright 2022
                </div>
            </div>
        );
    }
}

export default Footer;