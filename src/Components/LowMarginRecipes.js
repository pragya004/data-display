import React, {useState, useEffect, useRef} from 'react'
import NothingToDisplay from './NothingToDisplay'
import { ChartDonutUtilization,ChartThemeColor } from '@patternfly/react-charts'
import "./lowmargin.css"

export default function LowMarginRecipes() {


    const [lowMarginData, setLowMarginData] = useState([])
    const isMounted = useRef(false)


    async function getLowMarginRecipes(){
        try{
            const data = await fetch('https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/margin-group/?order=bottom')
            const json = await data.json()
            setLowMarginData(json.results)
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    useEffect(()=>{
        getLowMarginRecipes()
    },[])

    useEffect(()=>{
        if(isMounted.current){
            console.log(lowMarginData)
        }
        else{
            isMounted.current = true
        }
    },[lowMarginData])

    return(
        <>
            {
                (isMounted.current ? ( lowMarginData.length === 0 ? <NothingToDisplay /> : lowMarginData.map( (data,idx) => {
                    return(
                        <div key={idx} style={{ height: '100%'}} className="d-flex flex-column" id="lowmargin">
                            <p className="m-1" style={{fontSize:13,color:"#83888b",height:40,width:135,fontFamily: 'Roboto',fontWeight:'500'}}>{data.name}</p>
                            <ChartDonutUtilization
                            height={160}
                            ariaDesc="low margin data"
                            ariaTitle="low margin data"
                            constrainToVisibleArea={true}
                            data={{ x: 'margin', y: data.margin }}
                            labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y}%` : null}
                            title={data.margin}
                            />
                        </div>
                        ) 
                    })) : null)
            }
        </>

    )

}
