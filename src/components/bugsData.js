

import React ,{useState,useEffect} from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
// import $ from 'jquery';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';


const BugsData=(ids)=>{
    
    const history = useHistory();
    const [bugsData,setBugsData]=useState([]);
    const [count,setCount]=useState(0);
    const [pageCount,setPageCount]=useState(0);
    const [severity,setSeverity]=useState('None');
    const[filters,setFilters]=useState({1:true,2:true,3:true,4:true,5:true})
    const [urlExt,setUrlExt]=useState('');
    const [fltrApply,setFltrApply]=useState(false);
    const [activePage,setActivePage]=useState(0);
    const [fromScore,setFromScore]=useState(0);
    const [toScore,setToScore]=useState(100);
    const [fromBeforeValue,setBeforeValue]=useState(false);
    const [currentPage,setCurrentPage]=useState(1)
    // const values=[0,5,10,15,20,25,30,35,40];
    
    
    const arrGen=()=>{
        let arrValues=[];
        for(let i=0;i<=100;i=i+5){
            arrValues.push(i);
        }
        return arrValues;
    }
    const values=arrGen();

    
    // const locationHashChanged=()=>{
    //     alert('use effect');
    // }
    // window.addEventListener('hashchange', locationHashChanged, false);


    const listener = (href) => {
        alert('use effect');
    history.pushState({}, '', href);
    window.dispatchEvent(new Event('popstate'));
    };
    window.addEventListener('popstate', listener);


	const filterData=()=>{
        let url=`http://13.127.169.244:8006/v1/organizations/344cb126-5742-4558-861a-ded3c8bcfbbf/bugs/?page=${currentPage}`;
                let strApp='&filter_by[]=severity';
                let newFilter={...filters};
                for (var property in newFilter) {
                    if (newFilter.hasOwnProperty(property)) {
                        // console.log('newFilter[property]',newFilter[property]);
                        if(newFilter[property]){
                        strApp=strApp.concat(`&severity[]=${property}`);
        
                        }
                    //  console.log(property,'property');
                    }
                  }
                // console.log('mainUrl',mainUrl);
                Axios.get(url.concat(strApp),{
                    headers:{Authorization:`JWT ${localStorage.getItem('login-token')}`}
                }).then(res=>{
        
                    // let newData=[...bugsData];
                    let newData=[...res.data.results];
                    console.log('non fltrData',newData.forEach(el=>console.log(el.prioritization_score)));
            
                    let fltrData=newData.filter(el=>((el.prioritization_score>=fromScore)&&(el.prioritization_score<=toScore)));
                    setBugsData(fltrData);
                    console.log('fltrData',fltrData.forEach(el=>console.log(el.prioritization_score)));
                }
        
                )
    }

    useEffect(() => {
        if(localStorage.getItem('login-token')!=null){
            Axios.get('http://13.127.169.244:8006/v1/organizations/344cb126-5742-4558-861a-ded3c8bcfbbf/bugs/?page=1',
            {
                headers:{'Authorization':`JWT ${localStorage.getItem('login-token')}`}
            }).then((response)=>{
                console.log('response',response);
                setBugsData(response.data.results);
                setCount(response.data.count);
                setPageCount(Math.round(response.data.count/9));
            });

        }
        else{
            // alert('You Are Not Authorized');
            history.push("/")
        }
    
     },[history]);

    const handlePageClick=(data)=>{
        Axios.get(`http://13.127.169.244:8006/v1/organizations/344cb126-5742-4558-861a-ded3c8bcfbbf/bugs/?page=${data.selected+1}${fltrApply?urlExt:''}`,
        {
            headers:{Authorization:`JWT ${localStorage.getItem('login-token')}`}
        }).then((response)=>{
            console.log('response',response);
            setBugsData(response.data.results);
            setCount(response.data.count);
            setPageCount(Math.round(response.data.count/9));
            setCurrentPage(data.selected+1);
        })

     }

     const onTick=(e)=>{
        // let tickedInpts=inputs.map(inp=>{if(document.getElementById(`${inp.name}`).checked==true) return true});
        // console.log('tickedInputs',tickedInpts);
        let newFilter={...filters};
        newFilter[`${e.target.value}`]=e.target.checked;
        setFilters(newFilter);
        // document.getElementById(`all`).checked=false;
        // let inputs = document.querySelectorAll('.priority'); 
        let url='http://13.127.169.244:8006/v1/organizations/344cb126-5742-4558-861a-ded3c8bcfbbf/bugs/?page=1';
        let strApp='&filter_by[]=severity';
        // let arr=[];
        // setSeverity(e.target.name);
        // for (var i = 0; i < inputs.length; i++) { 
        //     // inputs[i].checked = true; 
        //     console.log('inputs[i].checked',inputs[i].checked);
        //     // arr={name:inputs[i].name,value:inputs[i].checked}
        //     if(document.getElementById(`${inputs[i].name}`).checked){
        //         strApp=strApp.concat(`&severity[]=${inputs[i].value}`);
        //         // console.log('strApp',strApp);
        //     }

        // }
      
        for (var property in newFilter) {
            if (newFilter.hasOwnProperty(property)) {
                // console.log('newFilter[property]',newFilter[property]);
                if(newFilter[property]){
                strApp=strApp.concat(`&severity[]=${property}`);

                }
            //  console.log(property,'property');
            }
          }
        // console.log('full url is',url.concat(strApp));
            Axios.get(url.concat(strApp),{
                headers:{Authorization:`JWT ${localStorage.getItem('login-token')}`}
            }).then(res=>{
                console.log('respose',res);
                let newCount=Math.round(res.data.count/9);
                setCount(res.data.count);
                setPageCount(newCount);
                setBugsData(res.data.results);
                setUrlExt(strApp)
                setFltrApply(true);
                setActivePage(1);
            })
        
     }

    const logOut=()=>{
        localStorage.removeItem('login-token');
        history.push("/")
     }

    //  window.addEventListener('locationchange', function(){
    //     console.log('location changed!');
    // })

    
    const setScore=(e)=>{
        e.preventDefault();
        let value=Number(e.target.value);
        let name=e.target.name;
        console.log('name',name,'value',value);
        if(name==='from'){
            console.log('from score',fromScore,'toScore',value,'t/f',fromScore<value);
            if((toScore<value)&&(fromBeforeValue==true)){
                alert('From Score Should be Lesser Than To Score');
            }else{
                setFromScore(value);
                filterData();
            }

        }
        else{
            console.log('from score',fromScore,'toScore',value,'t/f',fromScore<value,typeof(value));
            if(fromScore<value){
                setToScore(value);
                setBeforeValue(true);
                filterData();
            }
            else{
                alert('To Score Should Be More Than From Score');
            }
        }
    }

    // const getData=()=>{
    //     let url=`http://13.127.169.244:8006/v1/organizations/344cb126-5742-4558-861a-ded3c8bcfbbf/bugs/?page=${currentPage}`;
    //     let strApp='&filter_by[]=severity';
    //     // let mainUrl=urlExt!=''?url.concat(strApp):url;
    //     let newFilter={...filters};
    //     for (var property in newFilter) {
    //         if (newFilter.hasOwnProperty(property)) {
    //             // console.log('newFilter[property]',newFilter[property]);
    //             if(newFilter[property]){
    //             strApp=strApp.concat(`&severity[]=${property}`);

    //             }
    //         //  console.log(property,'property');
    //         }
    //       }
    //     // console.log('mainUrl',mainUrl);
    //     Axios.get(url.concat(strApp),{
    //         headers:{Authorization:`JWT ${localStorage.getItem('login-token')}`}
    //     }).then(res=>{

    //         // let newData=[...bugsData];
    //         let newData=[...res.data.results];
    //         console.log('non fltrData',newData.forEach(el=>console.log(el.prioritization_score)));
    
    //         let fltrData=newData.filter(el=>((el.prioritization_score>=fromScore)&&(el.prioritization_score<=toScore)));
    //         setBugsData(fltrData);
    //         console.log('fltrData',fltrData.forEach(el=>console.log(el.prioritization_score)));
    //     }

    //     )
    // }

  return <div className='container-fluid'>
      <div className="row">
            <div className="col-xs-6 col-md-3  ">
                {/* <label className="checkbox"><input type="checkbox" className="allBugs" id="all"  value="0" onClick='' name="info" disabled checked={true}/>All</label> */}
            </div>
            <div className="col-xs-6 col-md-6 " style={{display: 'flex',justifyContent: 'space-evenly'}} >
                <label className="checkbox"><input type="checkbox" checked={filters[1]} className="priority" id="info"  value="1" onClick={onTick} name="info"/>Info</label>
                <label className="checkbox"><input type="checkbox" checked={filters[2]} className="priority" id="low"  value="2" onClick={onTick} name="low"/>Low</label>
                <label className="checkbox"><input type="checkbox" checked={filters[3]} className="priority" id="medium"  value="3" onClick={onTick} name="medium"/>Medium</label>
                <label className="checkbox"><input type="checkbox" checked={filters[4]} className="priority" id="high"  value="4" onClick={onTick} name="high"/>High</label>
                <label className="checkbox"><input type="checkbox" checked={filters[5]} className="priority" id="critical"  value="5" onClick={onTick} name="critical"/>Critical</label>
            </div>
            <div className="col-xs-6 col-md-3 ">
            <button type="button" class="btn btn-info" onClick={logOut}>Log Out</button>
            </div>
      </div>
      <div className="row">
            <div className="col-xs-6 col-md-2  " style={{display:'flex'}}>
            </div>
            <div className="col-xs-6 col-md-1  " style={{display:'flex'}}>
                <label style={{fontWeight: 'bolder',display:'flex',float:'left'}}>Prioritization Score</label>
            </div>
            <div className="col-xs-6 col-md-2 ">
                <label style={{paddingRight:'5px'}}>From :</label>

                <select id="" name="from" className='dropDownScore' value={fromScore} defaultValue={0} onChange={setScore}>
                    <option value='' disabled>From</option>
                    {
                        values.map(el=><option value={el}>{el}</option>)
                    }
                </select>
            </div>
            <div className="col-xs-6 col-md-2" name="to">
                <label style={{paddingRight:'5px'}}>To :</label>

                <select id="" className='dropDownScore' value={toScore} defaultValue={100} onChange={setScore}>
                    <option value='' disabled>To</option>
                    {
                        values.map(el=><option value={el}>{el}</option>)
                    }
                </select>
                {/* <label className="" style={{fontWeight: 'bolder'}}>Severity :</label> */}
            </div>
            <div className="col-xs-6 col-md-4 " >
                {/* <label className="" style={{fontWeight: 'bolder'}}>{severity.toUpperCase}</label> */}
                {/* <button type="button" class="btn btn-info" onClick={getData}>Get Data</button> */}
            </div>
      </div>
      
            {
              bugsData.map((el,i)=>
                <div key={i} style={{padding:'5px 0px'}}>
                     <div className='row'>
                        <div className="col-xs-6 col-md-1  ">
                            {/* <label className="">{i+1}</label> */}
                        </div>
                        <div className="col-xs-6 col-md-1  " style={{backgroundColor: 'antiquewhite'}}>
                            <label className="" style={{fontWeight: 'bolder'}}>Title :</label>
                        </div>
                        <div className="col-xs-6 col-md-8  " style={{backgroundColor: 'antiquewhite'}}>
                            <label className="">{el.content_object.title}</label>
                        </div>
                    </div>
                    <div className='row'>
                            <div className="col-xs-6 col-md-1  ">
                            </div>
                            <div className="col-xs-6 col-md-1  " style={{backgroundColor: 'antiquewhite'}}>
                                <label className="" style={{fontWeight: 'bolder'}}>Description : </label>
                            </div>
                            <div className="col-xs-6 col-md-8  " style={{backgroundColor: 'antiquewhite'}}>
                                <label className="">{el.content_object.description}</label>
                            </div>
                    </div>
                 </div>

                )
          }
        <div className='row'>
                <div className="col-xs-6 col-md-1  ">
                </div>
                <div className="col-xs-6 col-md-1  ">
                </div>
                <div className="col-xs-6 col-md-8  ">
                    {
                        bugsData.length>0?
                        <ReactPaginate
                        // forcePage ={activePage}
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination page_number'}
                        subContainerClassName={'pages pagination '}
                        activeClassName={'active active_number'}
                        />:<h4>No Bugs Found</h4>
                    }
                </div>
        </div>
           
           
  </div>

}

export default BugsData;