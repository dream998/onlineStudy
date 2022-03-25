import styled from 'styled-components'

export const CoursesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 2px;
    .ant-card-meta-description{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
`

