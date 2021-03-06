import React, { useCallback, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../Components/Loader'
import { LinkCard } from '../Components/LinkCard'


export const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const { request, loading } = useHttp()

    const getLink = useCallback(async () => {
        try {
            const featched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(featched)
            setLink(featched)
        } catch (e) {}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && link && <LinkCard link={link} />}
        </>
    )
}
