import styled from 'styled-components'
export const StudyHeader = styled.div`
    height: 100px;
    background-color: #E6E6E6;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .left{
        border-left: solid 5px #A4A4A4 ;
        padding-left: 10px;
    }
    .middle{
        line-height: 80px;
    }
    .right{
        line-height: 80px;
        font-size: 20px;
        color: #00CC7E;
        border-right: solid 5px #A4A4A4 ;
        padding-right: 10px;
        span{
            padding: 25px;
        }
        
    }
`
export const StudyContent = styled.div`
    display: flex;
    width: 1000px;
   
    margin: 50px auto;
    .left-content{
        margin-right: 20px;

    }
    .right-content{
        background-color: antiquewhite;
        width: 800px;
        height: 600px;
        padding: 10px;
        overflow: auto;
    }
    li{
        margin: 10px 20px;
    }
    ul li:first-child h4{
        /* color: #00CC7E; */
        font-size: 18px;
        margin-left: -10px;
    }
`