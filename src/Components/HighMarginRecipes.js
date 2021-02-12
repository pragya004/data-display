import React, {useState, useEffect, useRef} from 'react'
import NothingToDisplay from './NothingToDisplay'

import { ChartDonutUtilization } from '@patternfly/react-charts'

export default function HighMarginRecipes() {


    const [highMarginData, setHighMarginData] = useState([])
    const isMounted = useRef(false)


    async function getHighMarginRecipes(){
        try{
            const data = await fetch('https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/margin-group/?order=top')
            const json = await data.json()
            setHighMarginData(json.results)
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    useEffect(()=>{
        getHighMarginRecipes()
    },[])

    useEffect(()=>{
        if(isMounted.current){
            console.log(highMarginData)
        }
        else{
            isMounted.current = true
        }
    },[highMarginData])

    return(
        <>
            {
                (isMounted.current ? ( highMarginData.length === 0 ? <NothingToDisplay /> : highMarginData.map( (data,idx) => {

                    return(

                            <div key={idx} style={{ height: '100%'}} className="d-flex flex-column">
                                <p className="m-1" style={{fontSize:13,color:"#83888b",height:40,width:135, fontFamily: 'Roboto',fontWeight:'500'}}>{data.name}</p>
                                <ChartDonutUtilization
                                height={160}
                                ariaDesc="high margin data"
                                ariaTitle="high margin data"
                                constrainToVisibleArea={true}
                                data={{ x: 'margin', y: data.margin }}
                                labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y}%` : null}
                                title={data.margin}
                                themeColor = "green"
                                />
                            </div>
                        
                        ) 
                    })) : null)
            }
        </>
 
    )

}
