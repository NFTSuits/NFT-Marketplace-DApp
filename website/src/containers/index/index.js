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
import StoreMallDirectorySharpIcon from '@material-ui/icons/StoreMallDirectorySharp';
import DirectionsRunSharpIcon from '@material-ui/icons/DirectionsRunSharp';
import FormatListNumberedSharpIcon from '@material-ui/icons/FormatListNumberedSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ShareSharpIcon from '@material-ui/icons/ShareSharp';
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
  boxes:{
    border: "1.5px solid #121212",
    borderRadius: 3,
    height: 150,
    width: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
    padding:10,
    "&:hover": {
      backgroundColor: "#121212",
      borderColor: "#00D54B",
      boxShadow:
        "0 1px 3px rgba(255,255,255,0.12), 0 1px 3px rgba(255,255,255,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
    }
  },
  boxText:{
    margin:5, 
    textAlign:"center",
    marginTop: 20
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
    <Typography variant="h2" align="center" component="h1" gutterbottom="true" style={{paddingTop:"2vw", color:"#00D54B", fontSize: 100}}>
              NFT Suits
            </Typography>  
        <div style = {{ 
              display: "flex", 
              flexDirection: "row",
              marginTop: 30, 
              marginRight:"2vw", 
              marginLeft:"2vw"
            }}
            >
              <div  className={classes.boxes}
                    onClick={() => {
                    window.location.href = "/marketplace";
                  }}>
                <StoreMallDirectorySharpIcon style={{ color: "#8f84d8ff", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Buy and sell items with our community
                </Typography>
              </div>
              <div className={classes.boxes}
                  onClick={() => {
                        window.location.href = "/marketplace";
                  }}
                  >
                <DirectionsRunSharpIcon style={{ color: "#e333a5ff", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Chase and bid on the rarest items
                </Typography>
              </div>
              <div className={classes.boxes}
                  onClick={() => {
                        window.location.href = "/marketplace";
                  }}
              >
                <FormatListNumberedSharpIcon style={{ color: "#fa7658ff", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Make almost unlimited combinations
                </Typography>
              </div>
              <div className={classes.boxes}
                    onClick={() => {
                        window.location.href = "/avatars";
                  }}
              >
                <ShareSharpIcon style={{ color: "#f7c11fff", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Create and share your avatars
                </Typography>
              </div>
            </div>

        <Grid style={{marginRight: "3vw", marginLeft: "3vw", marginTop:20}}>
            <Typography variant="h4" component="h1" gutterbottom="true" align ='start' style={{paddingTop:"2vw", color:"#00D54B"}}>
              What is NFT Suits?
            </Typography>
            <div style={{display:"flex", flexDirection: "row" , marginBottom:-20}}>
              <FiberManualRecordIcon style={{fontSize:20,marginTop:21, color:"#00D54B"}}/>
              <Typography variant="body1" component="h1" gutterbottom="true" align ='start' style={{ color:"#f1ffe3", margin:20}}>
                NFT Suits is a game centered around collectible items that can be worn to the head, top, and bottom.
              </Typography>
            </div>
            <div style={{display:"flex", flexDirection: "row", marginBottom:-20}}>
              <FiberManualRecordIcon style={{fontSize:20,marginTop:21, color:"#00D54B"}}/>
              <Typography variant="body1" component="h1"  gutterbottom="true" align ='start' style={{ color:"#f1ffe3", margin:20}}>
                Each item is <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>one-of-a-kind</Typography> and <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>100% owned by you</Typography>; it cannot be replicated, taken away, or destroyed. Your proof of ownership is stored <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>Ethereum blockchain</Typography>.
              </Typography>
            </div>
            <div style={{display:"flex", flexDirection: "row", marginBottom:-20}}>
              <FiberManualRecordIcon style={{fontSize:20,marginTop:21, color:"#00D54B"}}/>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#f1ffe3", margin:20}}>
                Each item is either a head, top or bottom wear which you can <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>buy, bid on, and offer for auction and sale</Typography> via the marketplace.
              </Typography>
            </div>
            <div style={{display:"flex", flexDirection: "row", marginBottom:-20}}>
              <FiberManualRecordIcon style={{fontSize:20,marginTop:21, color:"#00D54B"}}/>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#f1ffe3", margin:20}}>
                You can create your <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>own avatar</Typography> by combining a head, a top and a bottom item, which is a <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>unique combination</Typography> within the whole community.
              </Typography>
            </div>
            <div style={{display:"flex", flexDirection: "row", marginBottom:-20}}>
              <FiberManualRecordIcon style={{fontSize:20,marginTop:21, color:"#00D54B"}}/>
              <Typography variant="body1" component="h1"    gutterbottom="true" align ='start' style={{color:"#f1ffe3", margin:20}}>
                <Typography style={{color:"#00D54B", fontWeight:"bold", display: "inline"}}>Display your avatar</Typography> and brag about it, while others do so!
              </Typography>
            </div>
        </Grid>
        
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <Grid >
        <Typography variant="h3" gutterbottom="true"  style={{paddingTop:"5vw",color:"#00D54B"}}>
          Team
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
                  Cavit Çakır
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
                Kaya Kapağan
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
                  Görkem Köse
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
                  Gökberk Yar
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

            
{/*       <Paper elevation={3} variant="outlined" className={classes.root2} style={{
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
          Buy & sell Bidis with our community.
        </Typography>
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
          Make almost unlimited combinations.
        </Typography>
        </Grid>
        <Grid>  
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
          Chase different rarity of Bidis.
        </Typography>
        <Typography variant="body1" component="h1"    gutterbottom="true" align ='center' style={{paddingTop:"1vw", paddingBottom:"1vw", color:"#000"}}>
          Create & Share your Avatars.
        </Typography>
        </Grid>
      </Grid> 
      </Paper>*/}
      </Grid>
    </Container>
    )
}
export default Index;