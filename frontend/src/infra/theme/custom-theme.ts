import {extendTheme} from '@chakra-ui/react'

export const customtheme = extendTheme({
    body: {
        bg: "red",
    },
    components:{
        Heading:{
            variants:{
                h1: {color:'#326FEE'},
                h3: {color:'#2B9DF4'}
            }
        },
        Text:{
            variants:{
                sub: {color:'#2B9DF4'}
            }
        },
        Input: {
            baseStyle: {
              field: {
                bg: '#EEF2F5',
                // borderColor: '#4b4b4f',
                // borderWidth: 3,
                // ':focus': {
                //   borderColor: '#a970ff',
                //   bg: '#000'
                // }
              }
            },
        }
    }
})