import React, {useState, useEffect, useRef} from 'react'
import NothingToDisplay from './NothingToDisplay'
import { Checkbox, withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import moment from 'moment'

const useStyles = makeStyles(theme => (
    {
            headingColor : {
                backgroundColor :'#94b3f6',
            },
            tableRowHover: {
                "&:hover": {
                        backgroundColor: "#dad9df !important",
                    }
            }
    }));


const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f4f3f9',
      },
    },
  }))(TableRow);


export default function IsIncorrect() {

    const classes = useStyles()
    const [isChecked, setIsChecked] = useState()
    const [isItemSelected , setIsItemSelected] = useState(false)
    const [disabledData, setDisabledData] = useState([])
    const liRefs = []

    const [incorrectData, setIncorrectData] = useState([])
    const isMounted = useRef(false)


    async function getIncorrectRecipes(){
        try{
            const data = await fetch('https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes/?page=1&is_incorrect=true')
            const json = await data.json()
            setIncorrectData(json.results)
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    useEffect(()=>{
        getIncorrectRecipes()
    },[])

    useEffect(()=>{
        if(isMounted.current){
            console.log(incorrectData)
        }
        else{
            isMounted.current = true
        }
    },[incorrectData])


    
    const handleChange = (e) => {
        setIsItemSelected(e.target.checked);
      };

    const handleRowChange = (event) => {

        setIsItemSelected(event.target.checked);
        const check = event.target.checked

            // for(var i=0; i<liRefs.length;i++){
            //     liRefs[i].firstChild.firstChild.checked = true
            // }
    } 

    
    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')


    function descendingComparator(a,b, orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy] > a[orderBy]){
            return 1;
        }
        return 0;
    }

    function getComparator(order,orderBy){
        return order === 'desc'
        ? (a,b) => descendingComparator(a,b, orderBy)
        : (a,b) => -descendingComparator(a,b, orderBy);
    }
    
    const handleRequestSort = (event,property) => {
        const isAscending = valueToOrderBy === property && orderDirection === "asc";
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event,property);
    }

    const sortedRowInformation = (rowArray, comparator) => {
        const stabalizedRowArray = rowArray.map((el,index) => [el,index]);
        stabalizedRowArray.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return stabalizedRowArray.map((el) => el[0]);
    }


    return(
        <>
            {
                (isMounted.current ? ( incorrectData.length === 0 ? <NothingToDisplay /> :

                    <TableContainer className="rounded-0" component = {Paper}>
                        <Table aria-label = "disabled-recipes">
                            <TableHead>
                                <TableRow className = {classes.headingColor}>
                                    <TableCell className="selectCheckbox" padding="checkbox">
                                    <Checkbox
                                        onChange={handleRowChange}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    </TableCell>
                                    <TableCell key="name" align="left">
                                        <TableSortLabel 
                                            active={valueToOrderBy === "name"}
                                            direction={valueToOrderBy === "name" ? orderDirection: 'asc'}
                                            onClick = {createSortHandler("name")}
                                        >
                                            NAME
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="lastUpdated" align="left">
                                        <TableSortLabel 
                                            active={valueToOrderBy === "lastUpdated"}
                                            direction={valueToOrderBy === "lastUpdated" ? orderDirection: 'asc'}
                                            onClick = {createSortHandler("lastUpdated")}
                                        >
                                            LAST UPDATED
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="cogs" align="left">
                                        <TableSortLabel 
                                            active={valueToOrderBy === "cogs"} 
                                            direction={valueToOrderBy === "cogs" ? orderDirection: 'asc'}
                                            onClick = {createSortHandler("cogs")}
                                        >
                                            COGS
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="costPrice" align="left">
                                        <TableSortLabel 
                                            active={valueToOrderBy === "costPrice"} 
                                            direction={valueToOrderBy === "costPrice" ? orderDirection: 'asc'}
                                            onClick = {createSortHandler("costPrice")}
                                        >
                                            COST PRICE
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="salePrice" align="left">
                                        <TableSortLabel 
                                            active={valueToOrderBy === "salePrice"} 
                                            direction={valueToOrderBy === "salePrice" ? orderDirection: 'asc'}
                                            onClick = {createSortHandler("salePrice")}
                                        >
                                            SALE PRICE
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="grossMargin" align="left">
                                        <TableSortLabel 
                                            active={valueToOrderBy === "grossMargin"} 
                                            direction={valueToOrderBy === "grossMargin" ? orderDirection: 'asc'}
                                            onClick = {createSortHandler("grossMargin")}
                                        >
                                            GROSS MARGIN
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="left">TABS / ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    sortedRowInformation(incorrectData, getComparator(orderDirection,valueToOrderBy)).map( (recipe,idx) => (
                                        <StyledTableRow key={recipe.id} hover className={classes.tableRowHover} onClick={handleChange}>
                                            <TableCell className="selectCheckbox" padding="checkbox">
                                                <Checkbox
                                                    ref = {ref => (liRefs[idx] = ref)}
                                                    onClick = {handleChange}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    className = "heyCheckbox"
                                                />
                                            </TableCell>
                                            <TableCell align="left">{recipe.name}</TableCell>
                                            <TableCell align="left">{moment(recipe.last_updated.date).format("MMM Do,YYYY")}</TableCell>
                                            <TableCell align="right">{recipe.cogs}</TableCell>
                                            <TableCell align="right">{Math.round(recipe.cost_price)}</TableCell>
                                            <TableCell align="right">{Math.round(recipe.sale_price)}</TableCell>
                                            <TableCell align="right">{Math.round(recipe.gross_margin)}</TableCell>
                                            <TableCell align="left" display="flex"  flexDirection="row"><Chip label="Indian" className="mr-2"  style={{backgroundColor:"#f4f4d0"}} /><Chip label="Italian"  style={{backgroundColor:"#f8f4ab"}}/></TableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    ) : null)
                }
        </>

    )
}
