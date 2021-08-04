import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Loader } from '../Components/Loader'
import { LinksList } from '../Components/LinksList'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LinksPage = () => {
    const [links, setLinks] = useState(null)
    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext)

    const getLinks = useCallback(async () => {        
        try {
            const featched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(featched)
            console.log('featched: ', featched);
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])
    
    if (loading || !links) {
        return <Loader />
    }

    return (
        <>
            { !loading && links && <LinksList links={links} />}
        </>
    )
}
