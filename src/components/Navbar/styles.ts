import styled from 'styled-components'

export const NavbarWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    padding: .5rem;

    color: #fff;
    background: #2f3e46;
`

export const NavbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1200px;    

    nav {
        display: flex;
    }

    @media(min-width: 768px) {
        height: 90px;
        flex-direction: row;
    }
`
export const GithubUserAvatar = styled.img`
    width: 90px;
    height: 90px;
    padding: .5rem;

    border-radius: 50%;
`

export const UserInformationContainer = styled.div`
    text-align: end;
    
    button {
        padding: .5rem;

        background: #f1f1f1;
        border-radius: .5rem;
        cursor: pointer;
        transition: background-color .2s linear;
        &:hover {
            background: #d1d1d1;
        }
    }
`