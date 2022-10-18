import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EggIcon from '@mui/icons-material/Egg';
import LiquorIcon from '@mui/icons-material/Liquor';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const SidebarData =
    [
        {
            title: {
                text: ('homeAndFreeTime'),
            },
            icon: <HomeIcon/>,
            link: "/namai-ir-laisvalaikis",
            cName: 'nav-text'
        },
        {
            title: {
                text: ('vegetablesAndFruits'),
            },
            icon: <HomeIcon/>,
            link: "/darzoves-ir-vaisiai",
            cName: 'nav-text'
        },
        {
            title: {
                text: ('dairyProductsAndEggs'),
            },
            icon: <EggIcon/>,
            link: "/pieno-gaminiai-ir-kiausiniai",
            cName: 'nav-text'

        },
        {
            title: {
                text: ('breadProductsAndConfectionary'),
            },
            icon: <BreakfastDiningIcon/>,
            link: "/duonos-gaminiai-ir-konditerija",
            cName: 'nav-text'
        },
        {
            title: {
                text: ('drinks'),
            },
            icon: <LiquorIcon/>,
            link: "/gerimai",
            cName: 'nav-text'
        },
        {
            title: {
                text: ('frozenFood'),
            },
            icon: <HomeIcon/>,
            link: "/saldytas-maistas",
            cName: 'nav-text'
        },
        {
            title: {
                text: ('cleanlinessAndPetGoods'),
            },
            icon: <CleaningServicesIcon/>,
            link: "/svaros-ir-gyvunu-prekes",
            cName: 'nav-text'
        }
    ];