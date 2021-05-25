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
import team_bidis from'./team_bidis.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, green 30%, #FF8E53 90%)'
        : 'linear-gradient(20deg, green 30%, darkcyan 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
  root2: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, green 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, darkgreen 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

const Index = () => {
  const classes = useStyles();
    const [snackOpen, setSnackOpen] = React.useState(false);

    React.useEffect(() =>{
        if(!window.eth && !window.ethereum){
            setSnackOpen(true);
          }
          else{
            setSnackOpen(false);
          }
    },[window.eth, window.ethereum]);

    function MyButton(props) {
      const { color, ...other } = props;
      const classes = useStyles(props);
      return <Button className={classes.root} {...other} />;
    }

    return ( 
<Container maxWidth="md">
    <Snackbar
        open={snackOpen}
        // autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // onClose={()=>{
        //             setSnackOpen(false)
        //         }}
    >
      <SnackbarContent style={{
          backgroundColor:'#ff2015',
          color:"#f2f2f2",
          width:748.406969696969696969696969696969696969,
          fontSize: 14, 
          }}
          message={<span id="client-snackbar" >In order to proceed to the marketplace and profile pages, you should install Metamask extension to your browser.</span>}
      />
    </Snackbar>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <Grid>
        <Typography variant="h1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"5vw", fontSize: 150, color:"#00D54B"}}>
            CyrptoBidis
        </Typography>
      </Grid>
      <div>
      <Grid>
        <img style={{marginLeft:"10vw", marginRight:"10vw"}} src={team_bidis}  alt="fireSpot"/>
      </Grid>
      </div>
      <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="flex-start"
              style={{paddingTop:"1vw", paddingBottom:"1vw"}}
            >
              <Grid style={{paddingLeft:"12vw"}}>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#00D54B"}}>
                  Cavit Cakir
              </Typography>

              <IconButton
                style={{marginLeft: -8}}
                color="primary"
                onClick={() => {
                  window.location.href = 'https://github.com/cavitcakir'; 
                }}
              >
                <GitHubIcon style={{ color: "#00D54B" }}/>
              </IconButton>

              <IconButton
                color="primary"
                onClick={() => {
                  window.location.href = 'https://www.linkedin.com/in/cavitcakir/'; 
                }}
              >
                <LinkedInIcon style={{ color: "#00D54B" }}/>
              </IconButton>
              </Grid>
              

              <Grid>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#00D54B"}}>
                Kaya Kapagan
              </Typography>

              <IconButton
                style={{marginLeft: 5}}
                color="primary"
                onClick={() => {
                  window.location.href = 'https://github.com/kayakapagan'; 
                }}
              >
                <GitHubIcon style={{ color: "#00D54B" }}/>
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  window.location.href = 'https://www.linkedin.com/in/kaya-k-41381b130/'; 
                }}
              >
                <LinkedInIcon style={{ color: "#00D54B" }}/>
                
              </IconButton>
              </Grid>
              
              <Grid>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#00D54B"}}>
                  Gorkem Kose
              </Typography>
              <IconButton
                style={{marginLeft: 3}}
                color="primary"
                onClick={() => {
                  window.location.href = 'https://github.com/gorkemkose'; 
                }}
              >
                <GitHubIcon style={{ color: "#00D54B" }}/>
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  window.location.href = 'https://www.linkedin.com/in/ggorkemkose'; 
                }}
              >
                <LinkedInIcon style={{ color: "#00D54B" }}/>
              </IconButton>
              </Grid>
              
              <Grid style={{paddingRight:"11vw"}}>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#00D54B"}}>
                  Gokberk Yar
              </Typography>
              <IconButton
                color="primary"
                onClick={() => {
                  window.location.href = 'https://github.com/gokberkyar'; 
                }}
              >
                <GitHubIcon style={{ color: "#00D54B" }}/>
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  window.location.href = 'https://www.linkedin.com/in/gokberkyar/'; 
                }}
              >
                <LinkedInIcon style={{ color: "#00D54B" }}/>
              </IconButton>
              </Grid>
              
            </Grid>

      <Paper elevation={3} variant="outlined" className={classes.root2} style={{
        width:"100%",
        height:"100%",
        backgroundColor:'black'}}>
      <Grid 
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline" 
      >
        
          
        <Grid>
          <React.Fragment>
          {!snackOpen?
            <MyButton style={{marginTop: "2vw"}} onClick={() => {
                      window.location.href = "/marketplace";
                    }} color="black">Go To MarketPlace!</MyButton>
                    :<MyButton style={{marginTop: "2vw"}} disabled onClick={() => {
                      window.location.href = "/marketplace";
                    }} color="black">Go To MarketPlace!</MyButton>}
          </React.Fragment>
        </Grid>

        <Grid>  
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
            Info about bidis Info about bidis
        </Typography>
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
            Info about bidis Info about bidis
        </Typography>
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
            Info about bidis Info about bidis
        </Typography>
        </Grid>
        <Grid>  
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
            Info about bidis Info about bidis
        </Typography>
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
            Info about bidis Info about bidis
        </Typography>
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
            Info about bidis Info about bidis
        </Typography>
        </Grid>
        
      </Grid>
      </Paper>
        <Grid>
            <Typography variant="h2" component="h1"    gutterbottom="true" align ='start' style={{paddingTop:"2vw", color:"#00D54B"}}>
              <Box fontWeight="fontWeightBold">
                What is CryptoBidis?
            </Box>
            </Typography>
            <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{ paddingBottom:"1vw", color:"#f1ffe3", margin:20}}>
            We will develop a decentralized marketplace application inspired by the syn- thesis of the Cryptopunks idea and famous dress up games in the late 90s and early 2000s. 50 heads, top and bottom wears will be generated by pixelation of the selected images first, then these images will be tokenized using Non-fungible Token (NFT) and stored with proof of ownership on the Ethereum Blockchain. The ownership of a certain portion of these triple of head, top and bottom wears will be passed to the very first customers of the marketplace randomly, in return for an insignificant amount of Wei’s or for free. Then, the rest of the triples will be placed in the marketplace as well as the other heads, top and bottom wears which are owned by the sellers who would like to sell their posses- sions. Using a single head, top and bottom wear; users create their own avatar and the rest of the possessions of a user will be stored inside the wardrobe. A user may put an item on sale in return for an amount of Ethereum which will be determined by the seller herself/himself. The items on sale will be displayed on the marketplace as well as their prices, so that the users who would like to purchase these items can attempt. The seller may also decide to create an auction for an item, thus the other users can bid on the item and the winner will be announced by the seller.   There may be copies of some items, which will be technically distinguishable from each other stemming from the idea of NFT; so that a user might purchase all the “copies”, or let’s say similar items to increase the demand for that partic- ular item and play a huge role in determining the desirability of an item which increases the interactions therefore the transactions in the application.
            </Typography>
      
        </Grid>
      </Grid>
    </Container>
    )
}
export default Index;