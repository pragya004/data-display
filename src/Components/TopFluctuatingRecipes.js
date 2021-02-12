import React, {useState, useEffect, useRef} from 'react'
import NothingToDisplay from './NothingToDisplay'


export default function TopFluctuatingRecipes() {


    const [topFluctuatingData, setTopFluctuatingData] = useState([])
    const isMounted = useRef(false)


    async function getTopFluctuatingRecipes(){
        try{
            const data = await fetch('https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/fluctuation-group/?order=top')
            const json = await data.json()
            console.log(json)
            setTopFluctuatingData(json.results)
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    useEffect(()=>{
        getTopFluctuatingRecipes()
    },[])

    useEffect(()=>{
        if(isMounted.current){
            console.log(topFluctuatingData)
        }
        else{
            isMounted.current = true
        }
    },[topFluctuatingData])

    return(
        <>
            {
                (isMounted.current ? ( topFluctuatingData.length === 0 ? <NothingToDisplay /> : topFluctuatingData.map( (data,idx) => {
                    return(
                            <div key={idx} style={{ height: '100%'}} className="d-flex flex-column">
                                    <p className="m-1" style={{fontSize:13,color:"#83888b",height:40,width:135,fontFamily: 'Roboto',fontWeight:'500'}}>{data.name}</p>
                                    <hr style={{
                                        marginTop:"40px",
                                        border:"1px solid #cfcfcf",
                                        width:60,
                                    }}/>
                                    {(data.fluctuation < 30 ? 
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="d-flex">
                                                
                                                <div className="pr-1" style={{fontSize:14,height:14,color:"red",fontFamily: 'Roboto',fontWeight:'bold'}}>{data.fluctuation}</div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                                </svg>
                                            </div>
                                        </div> :
                                        <div className="d-flex  justify-content-center align-item-center">
                                            <div className="d-flex">
                                                
                                                <div  className="pr-1" style={{fontSize:14,height:14,color:"green",fontFamily: 'Roboto',fontWeight:'bold'}}>{data.fluctuation}%</div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                                </svg>
                                            </div>
                                        </div>)}
                                    
                            </div>
                        
                        ) 
                    })) : null)
            }
        </>

    )

}

