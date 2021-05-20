import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  AppBar,
  Tab,
  Tabs,
  Box,
  Button,
  IconButton,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  Input,
  TextField,
  SnackbarContent
} from "@material-ui/core";


const Index = () => {
    const [snackOpen, setSnackOpen] = React.useState(false);
    React.useEffect(() =>{
        if(!window.eth && !window.ethereum){
            setSnackOpen(true);
          }
          else{
            setSnackOpen(false);
          }
    },[window.eth, window.ethereum]);
    return ( 
    <Snackbar
        open={snackOpen}
        // autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={()=>{
                    setSnackOpen(false)
                }}
                >
    <SnackbarContent style={{
        backgroundColor:'#ff2015',
        width:748.406969696969696969696969696969696969,
        }}
        message={<span id="client-snackbar" >In order to proceed to the marketplace and profile pages, you should install Metamask extension to your browser.</span>}
    />
    </Snackbar>
    )
}
export default Index;