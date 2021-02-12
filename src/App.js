import React, {useState, lazy, Suspense} from "react"
import './App.css';
import HighMarginRecipes from "./Components/HighMarginRecipes";
import LowMarginRecipes from "./Components/LowMarginRecipes";
import TopFluctuatingRecipes from "./Components/TopFluctuatingRecipes";
import {Tabs, Tab, Card,Container,Row,Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from "./Components/Loading"


const AllRecipes = lazy(() => import("./Components/AllRecipes"))
const IsDisabled = lazy(() => import("./Components/IsDisabled"))
const IsIncorrect = lazy(() => import("./Components/IsIncorrect"))
const IsUntagged = lazy(() => import("./Components/IsUntagged"))


function App() {

    const [key, setKey] = useState('incorrect');

    return (
        <>
            <Container className="mt-3" style={{maxWidth:"100%",height:240}}>
            
                <Row style={{height:"100%"}}>
                    <Col style={{height:"100%"}}>
                        <Card style={{height:"100%"}} className="border rounded text-center">
                            <Card.Header style={{backgroundColor:"#f5f3f9", color:"#687580"}}>High Margin Recipes</Card.Header>
                            <Card.Body className="d-flex pb-0">
                                <HighMarginRecipes />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{height:"100%"}}>
                        <Card  style={{height:"100%"}} className="text-center border rounded">
                            <Card.Header style={{backgroundColor:"#f5f3f9", color:"#687580"}}>Low Margin Recipes</Card.Header>
                            <Card.Body className="d-flex  pb-0">
                                <LowMarginRecipes />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{height:"100%"}}>
                        <Card  style={{height:"100%"}} className="text-center border rounded">
                            <Card.Header style={{backgroundColor:"#f5f3f9", color:"#687580"}}>Top Fluctuating Recipes</Card.Header>
                            <Card.Body className="d-flex pb-0">
                                <TopFluctuatingRecipes />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
           

            
            <Tabs className="myTabs mt-3 ml-3 mr-3  border border-0" id="controlled-tab-example" defaultActiveKey="allrecipes">
                
                <Tab style={{backgroundColor:"white"}} className = "ml-3 mr-3 border border-0" eventKey="allrecipes" title="ALL RECIPE(S)">
                    <Container className="pt-4" style={{maxWidth:"100%"}}>
                        <Suspense fallback={<Loading   />}>
                            <AllRecipes />
                        </Suspense> 
                    </Container>
                </Tab>
                
                <Tab style={{backgroundColor:"white"}} className = "ml-3 mr-3 border border-0" eventKey="incorrect" title="INCORRECT">
                    <Container className="pt-4" style={{maxWidth:"100%"}}>
                        <Suspense fallback={<Loading   />}>
                            <IsIncorrect />
                        </Suspense>
                    </Container>  
                </Tab>
                <Tab style={{backgroundColor:"white"}} className = "ml-3 mr-3 border border-0" eventKey="untagged" title="UNTAGGED">
                    <Container className="pt-4" style={{maxWidth:"100%"}}>
                        <Suspense fallback={<Loading   />}>
                            <IsUntagged />
                        </Suspense>
                    </Container>
                </Tab>
                <Tab style={{backgroundColor:"white"}} className = "ml-3 mr-3 border border-0" eventKey="disabled" title="DISABLED">
                    <Container className="pt-4" style={{maxWidth:"100%"}}>
                        <Suspense fallback={<Loading   />}>
                            <IsDisabled />
                        </Suspense>
                    </Container>
                </Tab>
            </Tabs>
            
        </>
    );
}

export default App;
